type SyncOperation = {
  id: string;
  entity: 'report' | 'sample' | 'evidence';
  version: number;
  payload: unknown;
};

type SyncBatch = {
  batchId: string;
  operatorId: string;
  operations: SyncOperation[];
};

type CommitResult =
  | { state: 'accepted'; confirmed: string[] }
  | { state: 'pending'; retryAfterMs: number }
  | { state: 'rejected'; reason: string };

interface LocalOutbox {
  lockNextBatch(): Promise<SyncBatch | null>;
  confirm(batchId: string, operationIds: string[]): Promise<void>;
  release(batchId: string, retryAfterMs: number): Promise<void>;
  reject(batchId: string, reason: string): Promise<void>;
}

interface SessionPolicy {
  assertCanSync(operatorId: string): Promise<void>;
}

interface SyncApi {
  commit(batch: SyncBatch, idempotencyKey: string): Promise<CommitResult>;
  status(batchId: string): Promise<CommitResult | null>;
}

export class HybridSyncOrchestrator {
  constructor(
    private readonly outbox: LocalOutbox,
    private readonly sessionPolicy: SessionPolicy,
    private readonly api: SyncApi,
  ) {}

  async drain(): Promise<'idle' | 'synced' | 'paused'> {
    const batch = await this.outbox.lockNextBatch();
    if (!batch) return 'idle';

    await this.sessionPolicy.assertCanSync(batch.operatorId);

    const previous = await this.api.status(batch.batchId);
    const result =
      previous ??
      (await this.api.commit(batch, this.createIdempotencyKey(batch)));

    if (result.state === 'accepted') {
      await this.outbox.confirm(batch.batchId, result.confirmed);
      return 'synced';
    }

    if (result.state === 'pending') {
      await this.outbox.release(batch.batchId, result.retryAfterMs);
      return 'paused';
    }

    await this.outbox.reject(batch.batchId, result.reason);
    return 'paused';
  }

  private createIdempotencyKey(batch: SyncBatch): string {
    const operationFingerprint = batch.operations
      .map(
        (operation) =>
          `${operation.entity}:${operation.id}:${operation.version}`,
      )
      .join('|');

    return `${batch.operatorId}:${batch.batchId}:${operationFingerprint}`;
  }
}
