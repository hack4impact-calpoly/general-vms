import Home from '../Home/Home';
import Login from '../Login/Login';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ManageVolunteers from '../ManageVolunteers/ManageVolunteers';

function Testing() {
  return (
    <div className='TestManageVolunteers'>
      <ManageVolunteers
        volunteers = {
          [
            {firstName: "James",
            lastName: "Rounthwaite",
            userID: "1234"
            }, 
            {firstName: "Rachel",
            lastName: "Rounthwaite",
            userID: "1234"
            },
            {firstName: "Sho",
            lastName: "Rounthwaite",
            userID: "1234"
          }
            ]
        }
      />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate replace to="/" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/volunteer" element={<Testing />} />
        <Route path="*" element={<p>404</p>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
