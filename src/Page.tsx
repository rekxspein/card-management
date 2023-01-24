import { Box } from '@mui/material';
import { FC, ReactNode, useMemo } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes as RouterRoutes
} from 'react-router-dom';
import { TopBar } from './component/AppBar';
import { SideDrawer } from './component/SideDrawer';
import { Error404Page } from './pages/Error404';
import { IRoute, ROUTES } from './Routes';
import { parseRoutes } from './utils';

const Page: FC = () => {
  return (
    <Router>
      <Routes />
    </Router>
  );
};

const Routes: FC = () => {
  const routes = useMemo(() => {
    const r: Array<Required<Omit<IRoute, 'children'>>> = [];
    parseRoutes(ROUTES, null, r);

    return r;
  }, []);

  return (
    <RouterRoutes>
      {routes.map(({ path, component, withLayout }) => {
        const ele = (
          <WithLayout withLayout={withLayout}>{component}</WithLayout>
        );
        return <Route key={path} path={path} element={ele} />;
      })}

      <Route
        path="*"
        element={
          <WithLayout>
            <Error404Page />
          </WithLayout>
        }
      />
    </RouterRoutes>
  );
};

export const WithLayout: FC<{ children: ReactNode; withLayout?: boolean }> = ({
  children,
  withLayout = true
}) => {
  if (!withLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <TopBar />
      <Box display="flex" flex={1}>
        <SideDrawer />
        {children}
      </Box>
    </>
  );
};

export default Page;
