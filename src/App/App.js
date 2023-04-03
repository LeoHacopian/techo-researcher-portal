import './App.css';
import NavBar from '../NavBar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import FormCreation from '../FormCreation/FormCreation';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Form" element={<FormCreation />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
