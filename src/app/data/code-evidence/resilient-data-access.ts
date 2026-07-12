type DataContext = 'core' | 'tenant' | 'analytics';
type DataResource = 'users' | 'reports' | 'routes' | 'metrics';

type ResourceDefinition<T> = {
  resource: DataResource;
  context: DataContext;
  entity: EntityConstructor<T>;
};

type EntityConstructor<T> = new (...args: never[]) => T;

interface Repository<T> {
  findOne(criteria: Partial<T>): Promise<T | null>;
  save(entity: Partial<T>): Promise<T>;
}

interface DataSource {
  isHealthy(): boolean;
  getRepository<T>(entity: EntityConstructor<T>): Repository<T>;
  destroy(): Promise<void>;
}

interface DataSourceFactory {
  open(context: DataContext): Promise<DataSource>;
}

interface ResourceRegistry {
  resolve<T>(resource: DataResource): ResourceDefinition<T> | null;
}

export class ResilientDataAccess {
  private readonly sources = new Map<DataContext, DataSource>();
  private readonly unavailableUntil = new Map<DataContext, number>();

  constructor(
    private readonly registry: ResourceRegistry,
    private readonly factory: DataSourceFactory,
    private readonly cooldownMs = 30_000,
  ) {}

  async repositoryFor<T>(
    resource: DataResource,
  ): Promise<Repository<T> | null> {
    const definition = this.registry.resolve<T>(resource);
    if (!definition || this.isCoolingDown(definition.context)) return null;

    try {
      const source = await this.getSource(definition.context);
      return source.getRepository(definition.entity);
    } catch (error) {
      await this.markUnavailable(definition.context, error);
      return null;
    }
  }

  private async getSource(context: DataContext): Promise<DataSource> {
    const existing = this.sources.get(context);
    if (existing?.isHealthy()) return existing;

    const source = await this.factory.open(context);
    this.sources.set(context, source);
    this.unavailableUntil.delete(context);
    return source;
  }

  private isCoolingDown(context: DataContext): boolean {
    return (this.unavailableUntil.get(context) ?? 0) > Date.now();
  }

  private async markUnavailable(
    context: DataContext,
    error: unknown,
  ): Promise<void> {
    this.unavailableUntil.set(context, Date.now() + this.cooldownMs);

    const source = this.sources.get(context);
    this.sources.delete(context);

    if (source) await source.destroy();
    console.error('Data context unavailable', { context, error });
  }
}
