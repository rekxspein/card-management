import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { FC, ReactNode } from 'react';
import { QueryClientProvider } from 'react-query';
import Page from './Page';
import { queryClient } from './queryClient';

const App: FC = () => {
  return (
    <ProviderWrapper>
      <CssBaseline />
      <Page />
    </ProviderWrapper>
  );
};

const ProviderWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        {children}
      </LocalizationProvider>
    </QueryClientProvider>
  );
};

export default App;
