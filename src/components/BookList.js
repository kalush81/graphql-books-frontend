import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

const allBooks = gql`
  {
    allBooks {
      id
      title
      genre
      author {
        name
        books {
          id
          title
        }
      }
    }
  }
`;

export default function BookList() {
  const [bookIndex, setBookIndex] = useState(null);
  const query = useQuery(allBooks);

  console.log("data", query);
  if (query.loading) {
    return <p>...is loading</p>;
  }

  return (
    <ul>
      {query.data.allBooks.map((book, idx) => {
        return (
          <li key={book.id}>
            <p>title: {book.title}</p>
            <p>genre: {book.genre}</p>
            <p>author name: {book.author.name}</p>
            <button onClick={() => setBookIndex(idx)}>
              check other books of this author
            </button>

            {bookIndex === idx ? (
              <ul>
                {book.author.books.map((b) => (
                  <li key={b.id}>{b.title}</li>
                ))}
              </ul>
            ) : null}

            <hr />
          </li>
        );
      })}
    </ul>
  );
}
