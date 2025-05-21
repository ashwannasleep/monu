import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter} from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Amplify } from 'aws-amplify';
import * as AuthMod from '@aws-amplify/auth';
import awsExports  from './aws-exports';






Amplify.configure(awsExports)
export const { default: Auth } = AuthMod
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="632636220479-21mknsckuattniq6u5e8qvt1ktl0ptb4.apps.googleusercontent.com">
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
