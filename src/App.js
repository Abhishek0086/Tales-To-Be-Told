import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UniverseLanding from './UniverseLanding';
import CosmicHome from './CosmicHome';
import StoryDisplayPage from "./StoryDisplayPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UniverseLanding />} />
        <Route path="/home" element={<CosmicHome />} />
          <Route path="/stories" element={<StoryDisplayPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;