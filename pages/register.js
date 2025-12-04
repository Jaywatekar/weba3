import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState } from "react";
import { registerUser } from "@/lib/authenticate";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [notice, setNotice] = useState("");
  const [uname, setUname] = useState("");
  const [pwd1, setPwd1] = useState("");
  const [pwd2, setPwd2] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      setNotice("");
      await registerUser(uname, pwd1, pwd2);
      router.push("/login");
    } catch (err) {
      setNotice(err.message);
    }
  };

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Register</h2>Register for an account:
        </Card.Body>
      </Card>

      <br />

      <Form onSubmit={submitForm}>
        <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control
            type="text"
            value={uname}
            name="userName"
            onChange={(e) => setUname(e.target.value)}
          />
        </Form.Group>

        <br />

        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={pwd1}
            name="password"
            onChange={(e) => setPwd1(e.target.value)}
          />
        </Form.Group>

        <br />

        <Form.Group>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            value={pwd2}
            name="password2"
            onChange={(e) => setPwd2(e.target.value)}
          />
        </Form.Group>

        <br />

        {notice && (
          <>
            <Alert variant="danger">{notice}</Alert>
          </>
        )}

        <Button variant="primary" className="pull-right" type="submit">
          Register
        </Button>
      </Form>
    </>
  );
}
