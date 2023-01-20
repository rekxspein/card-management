import { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';

const Page: FC = () => {
  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default Page;
