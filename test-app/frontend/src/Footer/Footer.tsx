import './Footer.scss';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="main-footer">
      <Container>
        <Row>
          <Col>
            <div className="contact-num">
              <p className="contact">Contact: </p>
              <p className="number"> (111) 111-0000 </p>
            </div>
          </Col>
          <Col>
            <p className="middle-info"> &copy; Year NonProfit Organization</p>
            <p className="middle-info"> NonProfit Org 501(C)(3) Nonprofit Organization</p>
            <p className="middle-info"> Founded in Year by Person</p>
          </Col>
          <Col>
            <p className="hack"> Made with &hearts; by Hack4Impact Cal Poly </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
