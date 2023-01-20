export const joinPaths = (...paths: string[]): string => {
  return paths.join('/').replaceAll(/\/+/g, '/');
};
