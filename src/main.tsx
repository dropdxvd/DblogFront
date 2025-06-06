import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { TonConnectUIProvider } from '@tonconnect/ui-react'

import { Buffer } from 'buffer';
(window as any).Buffer = Buffer;


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl="https://dropdxvd.github.io/dblog-manifest/tonconnect-manifest.json">
      <App />
    </TonConnectUIProvider>
  </React.StrictMode>
)

