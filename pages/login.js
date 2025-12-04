import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState } from "react";
import { authenticateUser } from "@/lib/authenticate";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { getFavourites } from "@/lib/userData";

export default function Login() {
  const router = useRouter();
  const [notice, setNotice] = useState("");
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [, setFavs] = useAtom(favouritesAtom);

  const syncFavs = async () => {
    const favData = await getFavourites();
    setFavs(favData);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await authenticateUser(username, pass);
      await syncFavs();
      router.push("/");
    } catch (err) {
      setNotice(err.message);
    }
  };

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Login</h2>Enter your login information below:
        </Card.Body>
      </Card>

      <br />

      <Form onSubmit={submitForm}>
        <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            name="userName"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <br />

        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={pass}
            name="password"
            onChange={(e) => setPass(e.target.value)}
          />
        </Form.Group>

        <br />

        <Button type="submit" variant="primary" className="pull-right">
          Login
        </Button>
      </Form>

      {notice && (
        <>
          <br />
          <Alert variant="danger">{notice}</Alert>
        </>
      )}
    </>
  );
}
