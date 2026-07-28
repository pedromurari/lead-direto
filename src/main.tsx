import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { captureAttribution } from './lib/attribution'
import './index.css'

captureAttribution();

createRoot(document.getElementById("root")!).render(<App />);
