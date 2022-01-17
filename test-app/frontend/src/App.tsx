import './App.css';
import { UserProvider } from './models/user/UserStore';

function App() {
  return (
    <UserProvider>
      <p>Just for funsies</p>
    </UserProvider>
  );
}

export default App;
