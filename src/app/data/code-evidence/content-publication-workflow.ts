type TenantId = string;
type DraftId = string;

type ContentBlock = {
  id: string;
  type: 'hero' | 'cards' | 'media' | 'contact';
  data: Record<string, unknown>;
};

type PublicationDraft = {
  id: DraftId;
  tenantId: TenantId;
  version: number;
  blocks: ContentBlock[];
};

type PublicationResult = {
  version: number;
  activeBlocks: number;
  warnings: string[];
};

interface PermissionPolicy {
  assertCanPublish(userId: string, tenantId: TenantId): Promise<void>;
}

interface BlockSchema {
  validate(block: ContentBlock): string[];
}

interface DraftRepository {
  findDraft(
    tenantId: TenantId,
    draftId: DraftId,
  ): Promise<PublicationDraft | null>;
  publish(draft: PublicationDraft): Promise<PublicationResult>;
}

export class ContentPublicationWorkflow {
  constructor(
    private readonly permissions: PermissionPolicy,
    private readonly schema: BlockSchema,
    private readonly drafts: DraftRepository,
  ) {}

  async publish(
    tenantId: TenantId,
    draftId: DraftId,
    userId: string,
  ): Promise<PublicationResult> {
    await this.permissions.assertCanPublish(userId, tenantId);

    const draft = await this.drafts.findDraft(tenantId, draftId);
    if (!draft) throw new Error('Draft not found for tenant');

    const validation = draft.blocks.flatMap((block) =>
      this.schema.validate(block).map((issue) => `${block.id}: ${issue}`),
    );

    if (validation.length > 0) {
      throw new Error(`Publication rejected: ${validation.join('; ')}`);
    }

    return this.drafts.publish({
      ...draft,
      blocks: draft.blocks.map((block) => ({
        ...block,
        data: this.stripUnsafeFields(block.data),
      })),
    });
  }

  private stripUnsafeFields(
    data: Record<string, unknown>,
  ): Record<string, unknown> {
    const { script, style, onClick, ...safeData } = data;
    void script;
    void style;
    void onClick;
    return safeData;
  }
}
