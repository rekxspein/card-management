import { ReactNode } from 'react';
import Home from './pages/Home';
import { Crew } from './pages/Crew';

export const ROUTES: IRoute = {
  path: '/',
  component: <Home />,
  children: [
    {
      path: '/crews',
      component: <Crew />
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
