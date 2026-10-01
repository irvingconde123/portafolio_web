type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type Platform = 'web' | 'android' | 'desktop';

type RouteDefinition = {
  key: string;
  incoming: {
    path: string;
    methods: HttpMethod[];
  };
  auth: {
    token: 'public' | 'session' | 'service';
    platforms: Platform[];
    scopes: string[];
  };
  upstream: {
    service: string;
    pathTemplate: string;
    timeoutMs: number;
  };
};

type ResolvedRoute = {
  route: RouteDefinition;
  params: Record<string, string>;
};

interface RouteRegistry {
  all(): Promise<RouteDefinition[]>;
}

interface AccessToken {
  platform: Platform;
  scopes: string[];
}

export class HostlycGatewayRouting {
  constructor(private readonly registry: RouteRegistry) {}

  async resolve(
    method: HttpMethod,
    path: string,
    token: AccessToken,
  ): Promise<ResolvedRoute | null> {
    const routes = await this.registry.all();

    for (const route of routes) {
      if (!route.incoming.methods.includes(method)) continue;

      const params = this.match(route.incoming.path, path);
      if (!params) continue;

      this.assertPolicy(route, token);
      return { route, params };
    }

    return null;
  }

  buildUpstreamPath(
    route: RouteDefinition,
    params: Record<string, string>,
  ): string {
    return Object.entries(params).reduce(
      (template, [key, value]) =>
        template.replace(`:${key}`, encodeURIComponent(value)),
      route.upstream.pathTemplate,
    );
  }

  private assertPolicy(route: RouteDefinition, token: AccessToken): void {
    const platformAllowed = route.auth.platforms.includes(token.platform);
    const scopesAllowed = route.auth.scopes.every((scope) =>
      token.scopes.includes(scope),
    );

    if (!platformAllowed || !scopesAllowed) {
      throw new Error(`Route ${route.key} is not allowed for this caller`);
    }
  }

  private match(template: string, path: string): Record<string, string> | null {
    const templateParts = template.split('/').filter(Boolean);
    const pathParts = path.split('/').filter(Boolean);

    if (templateParts.length !== pathParts.length) return null;

    return templateParts.reduce<Record<string, string> | null>(
      (params, part, index) => {
        if (!params) return null;
        if (part.startsWith(':'))
          return { ...params, [part.slice(1)]: pathParts[index] };
        return part === pathParts[index] ? params : null;
      },
      {},
    );
  }
}
