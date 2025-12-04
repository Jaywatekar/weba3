/********************************************************************************
*  WEB422 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
*  Name: Jay Sanjay Watekar | Student ID: 167268226 | Date: December 4th, 2025
*********************************************************************************/

import { useRouter } from "next/router";
import PageHeader from "@/components/PageHeader";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function Home() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (formValues) => {
    const cleaned = Object.fromEntries(
      Object.entries(formValues).filter(([_, v]) => v !== "")
    );

    router.push({
      pathname: "/books",
      query: cleaned,
    });
  };

  return (
    <>
      <PageHeader
        text="Search for Books"
        subtext="Browse the extensive collection of books available on openlibrary.org."
      />

      <br />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xs={12}>
            <Form.Group className="mb-3" controlId="authorField">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author"
                {...register("author", { required: true })}
                className={errors.author && "inputError"}
              />
              {errors.author && (
                <span>
                  <br />
                  Author is required
                </span>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col lg={6}>
            <Form.Group className="mb-3" controlId="titleField">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                {...register("title")}
              />
            </Form.Group>
          </Col>

          <Col lg={6}>
            <Form.Group className="mb-3" controlId="subjectField">
              <Form.Label>Subject (contains)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter subject keyword"
                {...register("subject")}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col lg={6}>
            <Form.Group className="mb-3" controlId="langField">
              <Form.Label>Language Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter language code (e.g. eng)"
                maxLength={3}
                {...register("language")}
              />
            </Form.Group>
          </Col>

          <Col lg={6}>
            <Form.Group className="mb-3" controlId="pubYearField">
              <Form.Label>First Published (Year)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter published year"
                {...register("first_publish_year")}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12}>
            <Button
              type="submit"
              variant="primary"
              className="w-100 py-3 fs-5"
              disabled={Object.keys(errors).length > 0}
            >
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
