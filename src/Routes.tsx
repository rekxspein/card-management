import { ReactNode } from 'react';
import { CrewsListPage } from './pages/CrewsList';
import { CrewDetailsPage } from './pages/CrewDetails';
import { TransactionListPage } from './pages/TransactionList';
import { DeclinedCardListPage } from './pages/DeclinedCardList';
import { GreyListPage } from './pages/GreyList';
import UploadCSV from './pages/UploadCSV';

export const ROUTES: IRoute = {
  path: '/',
  component: <TransactionListPage />,
  children: [
    {
      path: '/crew-transactions',
      component: <CrewsListPage />,
      children: [
        {
          path: '/:id/:airline/details/',
          component: <CrewDetailsPage />
        }
      ]
    },
    {
      path: '/declined-cards/',
      component: <DeclinedCardListPage />
    },
    {
      path: '/grey-cards/',
      component: <GreyListPage />
    },
    {
      path: '/csv-upload/',
      component: <UploadCSV />
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
