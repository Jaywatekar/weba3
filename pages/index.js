/********************************************************************************
*  WEB422 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
*  Name: Jay Sanjay Watekar | Student ID: 167268226 | Date: November 10th, 2025
*********************************************************************************/

import { useRouter } from "next/router";
import PageHeader from "@/components/PageHeader";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";

const stripEmpty = (obj) =>
  Object.fromEntries(
    Object.entries(obj)
      .map(([k, v]) => [k, typeof v === "string" ? v.trim() : v])
      .filter(([, v]) => v !== "" && v !== undefined && v !== null)
  );

export default function Home() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues: useMemo(
      () => ({
        author: "",
        title: "",
        subject: "",
        language: "",
        first_publish_year: "",
      }),
      []
    ),
  });

  const onSubmit = useCallback(
    (form) => {
      const query = stripEmpty(form);
      router.push({ pathname: "/books", query });
    },
    [router]
  );

  return (
    <>
      <PageHeader
        text="Find Books"
        subtext="Search Open Library’s catalogue by author, title, subject, language, or first publication year."
      />

      <Form noValidate onSubmit={handleSubmit(onSubmit)} className="mt-3">
        <Row>
          <Col xs={12}>
            <Form.Group controlId="fieldAuthor" className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="eg. Agatha Christie"
                isInvalid={!!errors.author}
                {...register("author", {
                  required: "Author is required",
                  setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.author?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col lg={6}>
            <Form.Group controlId="fieldTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="eg. Murder on the Orient Express"
                {...register("title", {
                  setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
                })}
              />
            </Form.Group>
          </Col>

          <Col lg={6}>
            <Form.Group controlId="fieldSubject" className="mb-3">
              <Form.Label>Subject (contains)</Form.Label>
              <Form.Control
                type="text"
                placeholder="eg. mystery"
                {...register("subject", {
                  setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
                })}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col lg={6}>
            <Form.Group controlId="fieldLanguage" className="mb-3">
              <Form.Label>Language Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="3-letter code, eg. eng"
                maxLength={3}
                isInvalid={!!errors.language}
                {...register("language", {
                  setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
                  pattern: {
                    value: /^[A-Za-z]{3}$/,
                    message: "Use a 3-letter ISO code (eg. eng, fre, spa).",
                  },
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.language?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col lg={6}>
            <Form.Group controlId="fieldYear" className="mb-3">
              <Form.Label>First Published (Year)</Form.Label>
              <Form.Control
                type="number"
                placeholder="eg. 1934"
                isInvalid={!!errors.first_publish_year}
                {...register("first_publish_year", {
                  setValueAs: (v) => (v === "" ? "" : Number(v)),
                  min: { value: 1400, message: "Year must be ≥ 1400" },
                  max: { value: new Date().getFullYear(), message: "Year cannot be in the future" },
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.first_publish_year?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12}>
            <Button
              variant="primary"
              type="submit"
              className="w-100 py-3 fs-5"
              disabled={isSubmitting}
            >
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
