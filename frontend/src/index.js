import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';

import { configureChains, mainnet, WagmiConfig, createClient } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { polygonMumbai } from '@wagmi/chains';

const { provider, webSocketProvider } = configureChains(
  [mainnet, polygonMumbai],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <WagmiConfig client={client}>
        <App />
      </WagmiConfig>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
