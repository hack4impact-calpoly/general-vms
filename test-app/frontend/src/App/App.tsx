import Home from '../Home/Home';
import Login from '../Login/Login';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import StandardPage from '../StandardPage/StandardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StandardPage component={<Home />} />} />
        <Route path="/home" element={<Navigate replace to="/" />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<p>404</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
