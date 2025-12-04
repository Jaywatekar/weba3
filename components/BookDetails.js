import { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";

export default function BookDetails({
  book,
  showFavouriteBtn = true,
  workId,
}) {
  const [favs, setFavs] = useAtom(favouritesAtom);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (workId) setAdded(favs.includes(workId));
  }, [workId, favs]);

  const coverId = book?.covers?.[0];
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : "https://placehold.co/400x600?text=Cover+Not+Available";

  const descriptionText = useMemo(() => {
    const desc = book?.description;
    if (!desc) return null;
    return typeof desc === "string" ? desc : desc?.value ?? null;
  }, [book?.description]);

  const characters = useMemo(
    () => (Array.isArray(book?.subject_people) ? book.subject_people.join(", ") : null),
    [book?.subject_people]
  );

  const settings = useMemo(
    () => (Array.isArray(book?.subject_places) ? book.subject_places.join(", ") : null),
    [book?.subject_places]
  );

  const moreLinks = Array.isArray(book?.links) ? book.links : [];

  const toggleFavourite = () => {
    if (!workId) return;
    setFavs((prev) => {
      if (prev.includes(workId)) {
        setAdded(false);
        return prev.filter((id) => id !== workId);
      } else {
        setAdded(true);
        return Array.from(new Set([...prev, workId]));
      }
    });
  };

  return (
    <Container>
      <Row>
        <Col lg={4}>
          <img
            className="img-fluid w-100"
            src={coverUrl}
            alt="Cover Image"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://placehold.co/400x600?text=Cover+Not+Available";
            }}
          />
          <br />
          <br />
        </Col>

        <Col lg={8}>
          <h3 className="mb-3">{book?.title ?? "Untitled"}</h3>

          {descriptionText && <p className="mb-4">{descriptionText}</p>}

          {characters && (
            <>
              <h5>Characters</h5>
              <p className="mb-4">{characters}</p>
            </>
          )}

          {settings && (
            <>
              <h5>Settings</h5>
              <p className="mb-4">{settings}</p>
            </>
          )}

          {moreLinks.length > 0 && (
            <>
              <h5>More Information</h5>
              <ul className="mb-4">
                {moreLinks.map((link, idx) => (
                  <li key={`${link?.url ?? idx}-${idx}`}>
                    <a href={link?.url} target="_blank" rel="noreferrer">
                      {link?.title ?? link?.url ?? "Link"}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}

          {showFavouriteBtn && workId && (
            <Button
              onClick={toggleFavourite}
              variant={added ? "primary" : "outline-primary"}
              aria-pressed={added}
            >
              {added ? "+ Favourite (added)" : "+ Favourite"}
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}