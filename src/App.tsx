import { Route, Routes } from 'react-router';
import './App.sass';
import Navbar from './layout/Navbar';
import HomePage from './pages/Home';
import NotFound from './components/NotFound';

function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/for-you" element={<HomePage isPersonalized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
