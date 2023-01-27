import { ReactNode } from 'react';
import Home from './pages/Home';
import { Crews } from './pages/Crews';
import { CrewDetails } from './pages/CrewDetails';

export const ROUTES: IRoute = {
  path: '/',
  component: <Home />,
  children: [
    {
      path: '/crews',
      component: <Crews />,
      children: [
        {
          path: '/:id/details/',
          component: <CrewDetails />
        }
      ]
    }
  ]
};

export type IRoute = {
  path: string;
  component?: ReactNode;
  auth?: 'required' | 'optional' | 'none';
  withLayout?: boolean;
  children?: IRoute[];
};
