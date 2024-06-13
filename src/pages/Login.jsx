import { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import { FormContainer } from "../components/FormContainer";
import authService from "../services/authService";
import { AuthContext } from "../context/authContext";

export function Login() {
  const { setAuthentication } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { email, password };

    try {
      const response = await authService.login(data);
      setAuthentication(response);
      if (typeof response != 'undefined') {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.toString());
    }
  };

  return (
    <FormContainer>
      <div className="w-100">
        <h1 className="mt-3">Login</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="my-3" controlId="formBasicEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="my-3" controlId="formBasicPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
        <Row className="mt-2">
          <Col>
            New user?
            <Link className="mx-2" to={"/register"}>
              Register
            </Link>
          </Col>
        </Row>
      </div>
    </FormContainer>
  );
}
