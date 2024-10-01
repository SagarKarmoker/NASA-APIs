import EPICImageGallery from './components/EPICImageGallery';
import SpaceWeatherData from './components/DONKIApi';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';

export default function App() {
  return (
    <>
      <Router>
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path='/epic' element={<EPICImageGallery />} />
          <Route path='/donki' element={<SpaceWeatherData />} />
        </Routes>
      </Router>
    </>
  );
}
