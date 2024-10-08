import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import {GoogleOAuthProvider} from "@react-oauth/google";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {store, persistor} from "./redux/store";

const CLIENT_ID = '174781855654-kqj54pb38ncgvc1c465537nrv4pcegv8.apps.googleusercontent.com';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
          <Provider store={store}>
              <PersistGate persistor={persistor}>
                <App />
              </PersistGate>
          </Provider>
      </GoogleOAuthProvider>
  </React.StrictMode>
);