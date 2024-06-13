import { Col, Container, Row } from "react-bootstrap";

export function FormContainer({ children }) {
  return (
    <Container className="justify-content-md-center w-50 mt-5">
      <Col>
        <Row className="card p-4 ">{children}</Row>
      </Col>
    </Container>
  );
}
