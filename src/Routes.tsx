import { ReactNode } from 'react';
import { CrewsListPage } from './pages/CrewsList';
import { CrewDetailsPage } from './pages/CrewDetails';
import { TransactionListPage } from './pages/TransactionList';
import { RejectedCardListPage } from './pages/RejectedCardList';
import { GreyListPage } from './pages/GreyList';

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
    },
    {
      path: '/rejected-card-list/',
      component: <RejectedCardListPage />
    },
    {
      path: '/grey-card-list/',
      component: <GreyListPage />
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
