import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'App';
import './index.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter basename="/goit-react-hw-08-phonebook/">
               <App />
               <ToastContainer
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
               />
            </BrowserRouter>
         </PersistGate>
      </Provider>
   </React.StrictMode>
);
