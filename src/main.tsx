import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { captureAttribution } from './lib/attribution'
import { trackPageView } from './lib/meta-tracking'
import './index.css'

captureAttribution();

createRoot(document.getElementById("root")!).render(<App />);

trackPageView();
