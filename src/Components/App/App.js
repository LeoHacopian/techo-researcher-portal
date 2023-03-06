import './App.css';
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';
import Questionnaire from '../Questionnaire/Questionnaire';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/Questionnaire' element={<Questionnaire />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
