import '@aws-amplify/ui-react/styles.css';

import { Amplify } from 'aws-amplify';
import { ThemeProvider } from '@aws-amplify/ui-react';

import amplifyconfig from './amplifyconfiguration.json';
import studioTheme from './ui-components/studioTheme';
Amplify.configure(amplifyconfig);

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

<ThemeProvider theme={studioTheme}>
  <App />
</ThemeProvider>

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
