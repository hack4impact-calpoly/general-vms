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
            {
              firstName: 'James',
              lastName: 'Rounthwaite',
              userID: '1234',
              eventsAttending: ['Beack Clean Up', 'Halloween Party'],
            },
            {
              firstName: 'Rachel',
              lastName: 'Rounthwaite',
              userID: '4567',
              eventsAttending: ['Beack Clean Up', 'Halloween Party'],
            },
            {
              firstName: 'Sho',
              lastName: 'Rounthwaite',
              userID: '9635',
              eventsAttending: ['Beack Clean Up', 'Halloween Party'],
            },
            {
              firstName: 'Robin',
              lastName: 'Rounthwaite',
              userID: '7589',
              eventsAttending: ['Beack Clean Up', 'Halloween Party'],
            },
          ]
        }
      />
    </div>
  );
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
