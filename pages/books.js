import PageHeader from "@/components/PageHeader";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useMemo, useState, useEffect } from "react";
import { Alert, Spinner, Pagination, Table } from "react-bootstrap";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Books() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState(null);

  const queryString = useMemo(() => {
    const entries = Object.entries(router.query || {}).filter(
      ([, v]) => v !== "" && v !== undefined && v !== null
    );
    return new URLSearchParams(entries).toString();
  }, [router.query]);

  useEffect(() => {
    setPage(1);
  }, [queryString]);

  const apiUrl = queryString
    ? `https://openlibrary.org/search.json?${queryString}&page=${page}&limit=10`
    : null;

  const { data, error, isLoading } = useSWR(apiUrl, fetcher, {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (data) setPageData(data);
  }, [data]);

  const handlePrev = () => setPage((p) => (p > 1 ? p - 1 : p));
  const handleNext = () => setPage((p) => p + 1);

  const criteriaSummary = useMemo(() => {
    if (!router.query || Object.keys(router.query).length === 0) return "";
    return Object.entries(router.query)
      .map(([k, v]) => `${k}: ${v}`)
      .join(", ");
  }, [router.query]);

  return (
    <>
      <PageHeader
        text="Search Results"
        subtext={criteriaSummary || "No search criteria specified"}
      />

      {isLoading && (
        <div className="d-flex align-items-center gap-2 my-3">
          <Spinner animation="border" size="sm" />
          <span>Loading results…</span>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="my-3">
          Something went wrong fetching books. Please try again.
        </Alert>
      )}

      {!isLoading && !error && (
        <>
          <Table striped hover responsive className="mt-3">
            <thead>
              <tr>
                <th>Title</th>
                <th>Published</th>
              </tr>
            </thead>
            <tbody>
              {pageData?.docs?.length ? (
                pageData.docs.map((book) => {
                  const rowKey = `${book.key}-${book.cover_edition_key ?? book.first_publish_year ?? ""}`;
                  const goTo = book?.key ?? "#";
                  return (
                    <tr
                      key={rowKey}
                      style={{ cursor: "pointer" }}
                      onClick={() => goTo !== "#" && router.push(goTo)}
                    >
                      <td>{book.title ?? "Untitled"}</td>
                      <td>{book.first_publish_year ?? "—"}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={2} className="text-muted text-center py-4">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          <Pagination className="justify-content-center">
            <Pagination.Prev onClick={handlePrev} disabled={page === 1} />
            <Pagination.Item active>{page}</Pagination.Item>
            <Pagination.Next
              onClick={handleNext}
              disabled={!pageData?.docs || pageData.docs.length === 0}
            />
          </Pagination>
        </>
      )}
    </>
  );
}