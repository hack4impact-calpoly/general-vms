import './Footer.scss';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="main-footer">
      <Container className="h-100">
        <Row className="h-100">
          <Col>
            <div className="contact-num">
              <p className="contact">Contact: </p>
              <p className="number"> (123) 456-7890 </p>
            </div>
          </Col>
          <Col className="middle-info">
            <p> &copy; Year NonProfit Organization</p>
            <p> Organization 501(C)(3) Nonprofit Organization</p>
            <p> Founded in Year by Person</p>
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
