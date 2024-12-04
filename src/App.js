import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UniverseLanding from './UniverseLanding';
import CosmicHome from './CosmicHome';
/* import StoryGenerationPage from './StoryGenerationPage'; */
import StoryDisplayPage from './StoryDisplayPage';
import StoryDisplay from './StoryDisplay';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UniverseLanding />} />
        <Route path="/home" element={<CosmicHome />} />
          {/* <Route path="/stories" element={<StoryGenerationPage />} /> */}
          <Route path="/stories" element={<StoryDisplayPage />} />
          <Route path="/story" element={<StoryDisplay />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;