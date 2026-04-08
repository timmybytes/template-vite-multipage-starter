import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import GlobalStyles from './styles/GlobalStyles';
import { BrowserRouter, Route, Routes } from 'react-router';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { Layout } from './components/wrappers/Layout';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyles />
      {/* NOTE: For variable layouts in different routes see: https://reactrouter.com/start/declarative/routing#layout-routes */}
      <Layout>
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="about" element={<AboutPage />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>,
);
