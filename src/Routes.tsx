import { ReactNode } from 'react';
import { Crews } from './pages/CrewsList';
import { CrewDetails } from './pages/CrewDetails';
import { TransactionList } from './pages/TransactionList';

export const ROUTES: IRoute = {
  path: '/',
  component: <TransactionList />,
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
