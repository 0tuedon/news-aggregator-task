import { Route, Routes } from 'react-router';
import './App.sass';
import Navbar from './layout/Navbar';
import HomePage from './pages/Home';

function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/for-you" element={<HomePage isPersonalized />} />
      </Routes>
    </div>
  );
}

export default App;
