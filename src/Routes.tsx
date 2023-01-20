import { FC, ReactNode, useMemo } from 'react';
import { Navigate, Route, Routes as RouterRoutes } from 'react-router-dom';
import Home from './pages/Home';
import { Next } from './pages/Next';
import { joinPaths } from './utils';

const Routes: FC = () => {
  const routes = useMemo(() => {
    const r: Array<Required<Omit<IRoute, 'children'>>> = [];
    parseRoutes(ROUTES, null, r);

    return r;
  }, []);

  return (
    <RouterRoutes>
      {routes.map(({ path, component }) => {
        return <Route key={path} path={path} element={component}></Route>;
      })}
      <Route path="*" element={<Navigate to="/" />} />
    </RouterRoutes>
  );
};

const ROUTES: IRoute = {
  path: '/',
  component: <Home />,
  children: [
    {
      path: '/next',
      component: <Next />
    }
  ]
};

const parseRoutes = (
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
      component: route.component
    });
  }
};

export type IRoute = {
  path: string;
  component?: ReactNode;
  children?: IRoute[];
};

export default Routes;
