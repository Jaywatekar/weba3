import React from "react";
import { Card } from "react-bootstrap";

export default function PageHeader({ text, subtext }) {
  return (
    <Card bg="light">
      <Card.Body className="text-center">
        <h1>{text}</h1>
        {subtext ? <p className="lead mb-0">{subtext}</p> : null}
      </Card.Body>
    </Card>
  );
}
