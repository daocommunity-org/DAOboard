import logo from './logo.svg';
import './App.css';
import { AppProvider } from './context/AppConfig';
import { Home } from './components/Home';

function App() {
  return (
    <AppProvider>
      <Home/>
    </AppProvider>

  );
}

export default App;
