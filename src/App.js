import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UniverseLanding from './UniverseLanding';
import CosmicHome from './CosmicHome';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UniverseLanding />} />
        <Route path="/home" element={<CosmicHome />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;