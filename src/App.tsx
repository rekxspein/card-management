import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { FC, ReactNode } from 'react';
import { QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import Page from './Page';
import { queryClient } from './queryClient';
import 'react-toastify/dist/ReactToastify.css';

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
        <ThemeProvider theme={theme}>
          {children}
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </ThemeProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
};

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#C70039' }
  }
});

export default App;
