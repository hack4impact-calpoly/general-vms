import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import './StandardPage.scss';

interface IStandardPageProps {
  component: React.ReactElement;
}

function StandardPage({ component }: IStandardPageProps) {
  return (
    <>
      <Navbar />
      <div className='standard-page'>
        {component}
      </div>
      <Footer />
    </>
  );
}

export default StandardPage;
