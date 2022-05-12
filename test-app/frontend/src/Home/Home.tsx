import { useEffect } from 'react';
import './Home.scss';

function Home() {
  useEffect(() => {
    fetch('/api/custom-test').catch(console.log);
  }, []);

  return (
    <main>
      <p>Home</p>
    </main>
  );
}

export default Home;
