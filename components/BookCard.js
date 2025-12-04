import Link from "next/link";
import useSWR from "swr";
import { Card, Button, Placeholder, Badge } from "react-bootstrap";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load work");
  return res.json();
};

export default function BookCard({ workId }) {
  const { data, error, isLoading } = useSWR(
    `https://openlibrary.org/works/${workId}.json`,
    fetcher,
    { revalidateOnFocus: false, shouldRetryOnError: false }
  );

  if (isLoading) {
    return (
      <Card>
        <div
          style={{ width: "100%", aspectRatio: "2/3", background: "#f2f2f2" }}
        />
        <Card.Body>
          <Placeholder as={Card.Title} animation="wave">
            <Placeholder xs={8} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="wave">
            <Placeholder xs={5} /> <Placeholder xs={3} />
          </Placeholder>
          <Button disabled variant="secondary">
            Loading…
          </Button>
        </Card.Body>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <div
          style={{ width: "100%", aspectRatio: "2/3", background: "#eee" }}
        />
        <Card.Body>
          <Card.Title className="d-flex align-items-center gap-2">
            Unavailable <Badge bg="secondary">Error</Badge>
          </Card.Title>
          <Card.Text>We couldn’t load this book right now.</Card.Text>
          <Button as={Link} href={`/works/${workId}`} variant="outline-primary">
            Try Open
          </Button>
        </Card.Body>
      </Card>
    );
  }

  const title = data?.title ?? "Untitled";
  const coverId = data?.covers?.[0];
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://placehold.co/400x600?text=No+Cover";

  const published =
    data?.first_publish_date ||
    data?.first_published_date ||
    data?.created?.value?.slice(0, 4) ||
    "N/A";

  return (
    <Card>
      <Card.Img
        variant="top"
        src={coverUrl}
        alt={`${title} cover`}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src =
            "https://placehold.co/400x600?text=Cover+Not+Available";
        }}
        style={{ aspectRatio: "2/3", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title className="text-truncate" title={title}>
          {title}
        </Card.Title>
        <Card.Text className="mb-3">
          First Published: <strong>{published}</strong>
        </Card.Text>
        <Button as={Link} href={`/works/${workId}`} variant="primary">
          View Book
        </Button>
      </Card.Body>
    </Card>
  );
}