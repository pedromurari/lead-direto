import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Obrigado from "./pages/Obrigado";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index variant="default" />} />
      <Route path="/condicao-especial" element={<Index variant="condicao-especial" />} />
      <Route path="/pague-em-30-dias" element={<Index variant="pague-em-30-dias" />} />
      <Route path="/obrigado" element={<Obrigado />} />
      <Route path="*" element={<Index variant="default" />} />
    </Routes>
  </BrowserRouter>
);

export default App;
