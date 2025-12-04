import {useEffect, useState} from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { addToFavourites } from "@/lib/userData";
import { removeFromFavourites } from "@/lib/userData";

const BookDetails = ({ book,  showFavouriteBtn = true, workId}) => {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(()=>{
    if(workId){
      setShowAdded(favouritesList?.includes(workId))
    }
  },[favouritesList]);

  const favouritesClicked = async () => {
    if(showAdded){
      setFavouritesList(await removeFromFavourites(workId));
    }else{
      setFavouritesList(await addToFavourites(workId));
    }
  }

  return (
    <Container>
      <Row>
        <Col lg="4">
          <img
            onError={(event) => {
              event.target.onerror = null; // Remove the event handler to prevent infinite loop
              event.target.src =
                "https://placehold.co/400x600?text=Cover+Not+Available";
            }}
            className="img-fluid w-100"
            src={`https://covers.openlibrary.org/b/id/${book?.covers?.[0]}-L.jpg`}
            alt="Cover Image"
          />
          <br />
          <br />
        </Col>

        <Col lg="8">
          <h3>{book.title}</h3>
          {book.description && (
            <p>
              {typeof book.description === "string"
                ? book.description
                : book.description.value}
            </p>
          )}

          {book.subject_people && (
            <>
              <h5>Characters</h5>
              {book.subject_people.map((people, index) => (
                <span key={index}>
                  {book.subject_people.length - 1 > index
                    ? `${people}, `
                    : `${people}`}
                </span>
              ))}
            </>
          )}

          <br />
          <br />

          {book.subject_places && (
            <>
              <h5>Settings</h5>
              {book.subject_places.map((place, index) => (
                <span key={index}>
                  {book.subject_places.length - 1 > index
                    ? `${place}, `
                    : `${place}`}
                </span>
              ))}
            </>
          )}

          <br />
          <br />

          {book.links && (
            <>
              <h5>More Information</h5>
              {book.links.map((link,index) => (
                <span key={index}>
                  <a href={link.url}>{link.title}</a>
                  <br />
                </span>
              ))}
            </>
          )}
          <br />
          {showFavouriteBtn && workId && <Button onClick={favouritesClicked} variant={ showAdded ? "primary" : "outline-primary" }>{showAdded ? "+ Favourite (added)" : "+ Favourite"}</Button>}
        </Col>
      </Row>
    </Container>
  );
};

export default BookDetails;
