import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import BookDetails from "./bookDetails";

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

  const [selectedBook, setSelectedBook] = useState(null)

  if (query.loading) {
    return <p>...is loading</p>;
  }

  return (
    <div>
      <ul>
        {query.data.allBooks.map((book, idx) => {
          return (
            <li key={book.id}>
              <p>title: {book.title}</p>
              <button onClick={() => setSelectedBook(book.id) }>Get book details</button>
              <hr />
            </li>
          );
        })}
      </ul>
      {selectedBook && <BookDetails id={selectedBook}/>}
    </div>
  );
}
