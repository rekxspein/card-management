import { Box, Button } from '@mui/material';
import { FC } from 'react';
import reactLogo from '../assets/react.svg';
import { RouterLink } from '../component/RouterLink';

const Home: FC = () => {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '2rem',
          '& > a > img': {
            height: '7rem'
          }
        }}
      >
        <a href="https://lamzing.com" target="_blank" rel="noreferrer">
          <img src="/lamzing.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </Box>

      <h1>React + Typescript</h1>

      <Button
        href="https://github.com/lamzingtech/react-template"
        target="_blank"
        rel="noreferrer"
        variant="contained"
        sx={{ mb: 1 }}
      >
        Github
      </Button>

      <Button href="/next" variant="outlined" LinkComponent={RouterLink}>
        Next Page &gt;
      </Button>
    </Box>
  );
};

export default Home;
