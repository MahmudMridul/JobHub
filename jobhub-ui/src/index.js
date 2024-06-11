import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import { Provider } from 'react-redux';
import { store } from './store';

const router = createBrowserRouter([
   {
      path: "/",
      element: <App />
   },
   {
      path: "/home",
      element: <Home />
   }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
      <Provider store={store}>
         <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
         </ThemeProvider>
      </Provider>
   </React.StrictMode>
);
