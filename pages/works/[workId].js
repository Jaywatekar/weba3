"use client";
import BookDetails from "@/components/BookDetails";
import { useRouter } from "next/router";
import useSWR from "swr";
import Error from "next/error";
import PageHeader from "@/components/PageHeader";

export default function Work() {
  const router = useRouter();
  const { workId } = router.query;

  const { data: bookData, error, isLoading } = useSWR(
    workId ? `https://openlibrary.org/works/${workId}.json` : null
  );

  if (!workId || isLoading) return null;

  if (error || !bookData) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <PageHeader text={bookData.title} />
      <br />
      <BookDetails book={bookData} workId={workId} />
    </>
  );
}
