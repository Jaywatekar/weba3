import { Card, Button } from "react-bootstrap";
import Link from "next/link";
import useSWR from "swr";
import Error from "next/error";

const BookCard = ({ workId }) => {
  const { data, error } = useSWR(`https://openlibrary.org/works/${workId}.json`);

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  console.log(data)

  return (
    <Card>
      <Card.Img 
        variant="top"
        onError={(event) => {
          event.target.onerror = null;
          event.target.src = "https://placehold.co/400x600?text=Cover+Not+Available";
        }}
        src={`https://covers.openlibrary.org/b/id/${data?.covers?.[0]}-M.jpg`}
        alt="Book Cover"
      />
      <Card.Body>
        <Card.Title>{data.title || ""}</Card.Title>
        <Card.Text>
          First Published: {data.first_published_date || "N/A"}
        </Card.Text>
        <Button as={Link} href={`/works/${workId}`} variant="primary">
          View Book
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BookCard;