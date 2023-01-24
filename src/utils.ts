import { IRoute } from './Routes';

export const joinPaths = (...paths: string[]): string => {
  return paths.join('/').replaceAll(/\/+/g, '/');
};

export const parseRoutes = (
  route: IRoute,
  prevRoute: string | null = null,
  parsedRoutes: Array<Required<Omit<IRoute, 'children'>>> = []
) => {
  const path = prevRoute ? joinPaths(prevRoute, route.path) : route.path;

  if (route.children) {
    route.children.forEach(child => {
      parseRoutes(child, path, parsedRoutes);
    });
  }

  if (route.component) {
    parsedRoutes.push({
      path,
      component: route.component,
      auth: route.auth ?? 'required',
      withLayout: route.withLayout ?? true
    });
  }
};
