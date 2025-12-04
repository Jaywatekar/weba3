"use client";

import React from "react";
import BookDetails from "@/components/BookDetails";
import PageHeader from "@/components/PageHeader";

export async function getStaticProps() {
  const res = await fetch(`https://openlibrary.org/works/OL453657W.json`);
  const data = await res.json();
  return { props: { book: data } };
}

const about = (props) => {
  return (
    <>
      <PageHeader text="About the Developer" subtext={"Jay Watekar"}/>
      <br />
      <p>
        Hello, I’m <strong>Jay Watekar</strong>, a passionate developer exploring <strong>web
        development</strong> and <strong>system design</strong>. I love solving complex problems and
        building applications that make life easier for people.
      </p>
      <p>
        One of the books I find fascinating is shown below — I chose it because
        of its unique story and the creativity behind its world-building.
      </p>
      <br />
      <BookDetails book={props.book} workId={"OL453657W"} showFavouriteBtn={false} />
    </>
  )
};

export default about;
