"use client";
import BookDetails from "@/components/BookDetails";
import { useRouter } from "next/router";
import useSWR from "swr";
import Error from "next/error";
import PageHeader from "@/components/PageHeader";

const Work = () => {
  const router = useRouter();
  const { workId } = router.query;

  const { data, error, isLoading } = useSWR(
    workId ? `https://openlibrary.org/works/${workId}.json` : null
  );

  if (isLoading || !workId) {
    return null; 
  }

  if (error || !data) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <PageHeader text={data.title} />
      <br />
      <BookDetails book={data} workId={workId} />
    </>
  );
};

export default Work;