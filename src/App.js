import './App.css';
import PreferDiagram from './Components/PreferDiagram';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Tiermaker } from './Components/TierMaker';
import { Main } from './Components/Main';
import { LeagueTemplate } from './Components/LeagueTemplate';
import { TrainerCard } from './Components/TrainerCard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="prefer" element={<PreferDiagram />}></Route>
            <Route path="tier" element={<Tiermaker />}></Route>
            <Route path="league" element={<LeagueTemplate />}></Route>
            <Route path="card" element={<TrainerCard />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
