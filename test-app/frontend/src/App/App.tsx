import Home from '../Home/Home';
import Login from '../Login/Login';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from '../models/user/UserStore';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate replace to="/" />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<p>404</p>} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
