import React from 'react'
import GlobalStyles from './styles/global';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Routes from './routes';

function App() {
  return (
    <>
    <BrowserRouter>
      <GlobalStyles />
      <Routes />
    </BrowserRouter>

    </>
  );
}

export default App;
