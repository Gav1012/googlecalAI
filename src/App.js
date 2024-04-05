import Home from "./pages/Home/Home";
import About from './pages/About/About';
import Intro from "./pages/Intro/Intro";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// main file to display all pages, may add result and about/contact page
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route exact path='/about' element={<About/>}></Route>
          <Route exact path='/intro' element={<Intro/>}></Route>
        </Routes> 
      </Router>
      
    </div>
  );
}

export default App;
