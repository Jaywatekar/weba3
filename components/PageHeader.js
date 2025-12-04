import { Card } from "react-bootstrap";

export default function PageHeader({ text, subtext }) {
  return (
    <Card className="shadow-sm border-0 mb-3">
      <Card.Body className="py-4 text-center">
        <h1 className="fw-bold mb-1">{text}</h1>
        {subtext && (
          <small className="text-muted" style={{ fontSize: "1.05rem" }}>
            {subtext}
          </small>
        )}
      </Card.Body>
    </Card>
  );
}