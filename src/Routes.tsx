import { ReactNode } from 'react';
import { CrewsListPage } from './pages/CrewsList';
import { CrewDetailsPage } from './pages/CrewDetails';
import { TransactionListPage } from './pages/TransactionList';

export const ROUTES: IRoute = {
  path: '/',
  component: <TransactionListPage />,
  children: [
    {
      path: '/crews',
      component: <CrewsListPage />,
      children: [
        {
          path: '/:id/details/',
          component: <CrewDetailsPage />
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
