import { useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { FormContainer } from "../components/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

export function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password not match");
    } else {
      const data = { firstName, lastName, email, password };
      setIsLoading(true);

      try {
        await authService.register(data);
        navigate("/login");
      } catch (error) {
        toast.error(error.toString());
      }

      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
      <div className="w-100">
        <h1 className="mt-3">Register</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="my-3" controlId="formBasicFirstName">
            <Form.Label>First name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="my-3" controlId="formBasicLastName">
            <Form.Label>Last name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Form.Group>
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
          <Form.Group className="my-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirm password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button
            disabled={isLoading}
            variant={isLoading ? "danger" : "primary"}
            type="submit"
          >
            Register
            {isLoading && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                style={{ marginLeft: "15px" }}
              />
            )}
          </Button>
        </Form>
        <Row className="mt-2">
          <Col>
            You have account?
            <Link className="mx-2" to={"/Login"}>
              Login
            </Link>
          </Col>
        </Row>
      </div>
    </FormContainer>
  );
}
