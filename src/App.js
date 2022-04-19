import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from './components/Header';
import { BankSearch } from './components/BankSearch';
import './lib/font-awesome/css/all.min.css';
import { Favourites } from './components/Favourites';
import { GlobalProvider } from './components/context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Header />

        <Routes>
          <Route excat path="/" element={<BankSearch />} />
          <Route path="/Favourites" element={<Favourites />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;
