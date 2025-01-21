import { Provider } from '@/components/ui/provider';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { WorkspaceProvider } from './context/workspace-context.tsx';
import './index.css';
import './output.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WorkspaceProvider>
      <Provider>
        <App />
      </Provider>
    </WorkspaceProvider>
  </StrictMode>
);
