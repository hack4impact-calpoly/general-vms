import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import "./StandardPage.scss";

interface IStandardPageProps {
  useTopPadding?: boolean;
  component: JSX.Element;
}

function StandardPage({ component, useTopPadding }: IStandardPageProps) {
  return (
    <>
      <Navbar />
      <div className={`standard-page ${useTopPadding ? "standard-page-top-padding" : ""}`}>
        {component}
      </div>
      <Footer />
    </>
  );
}

export default StandardPage;
