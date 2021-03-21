import React from "react";
import { useQuery, gql } from "@apollo/client";

export const allBooks = gql`
  {
    allBooks {
      id
      title
    }
  }
`;

export default function BookList() {
  
  const query = useQuery(allBooks);

  if (query.loading) {
    return <p>...is loading</p>;
  }

  return (
    <ul>
      {query.data.allBooks.map((book, idx) => {
        return (
          <li key={book.id}>
            <p>title: {book.title}</p>
            <hr />
          </li>
        );
      })}
    </ul>
  );
}
