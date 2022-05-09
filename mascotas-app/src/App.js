import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom";
import Home from './views/pages/Home';
import About from './views/pages/About';
import NoFound from './views/pages/NoFound';
import Add from './views/crud/Add';
import NavBar from './views/partials/NavBar';
import Footer from './views/partials/Footer';

function App() {
  return (
    <div className="App">
      <NavBar />
        <div className='container'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="add" element={<Add />} />
            <Route path="*" element={<NoFound />} />
          </Routes>
        </div>
      <Footer />
    </div>
  );
}

export default App;
