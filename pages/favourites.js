
import { Container, Row, Col } from "react-bootstrap";
import { useAtom } from "jotai";
import PageHeader from "@/components/PageHeader";
import BookCard from "@/components/BookCard";
import { favouritesAtom } from "../store";

export default function Favourites() {
  const [saved] = useAtom(favouritesAtom);
  const hasItems = saved.length > 0;

  return (
    <Container className="mt-2">
      <PageHeader
        text={hasItems ? "Favourite Books" : "No Favourites Yet"}
        subtext={
          hasItems
            ? "Here are the books you liked"
            : "Browse books and add them to your favourites"
        }
      />

      {hasItems && (
        <Row className="gy-4 mt-3">
          {saved.map((id) => (
            <Col key={id} lg={3} md={6} sm={12}>
              <BookCard workId={id} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}