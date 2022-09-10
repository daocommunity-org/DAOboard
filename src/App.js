import logo from './logo.svg';
import './App.css';
import { AppProvider } from './context/AppConfig';
import { Home } from './components/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Admin } from './components/Admin';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <AppProvider>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/admin' element={<Admin />}></Route>
          <Route path='/register' element={<div> <Register /></div>}></Route>
        </Routes>

      </AppProvider>
    </Router>


  );
}

export default App;
