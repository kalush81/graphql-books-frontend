import React from "react";
import { useQuery, gql } from "@apollo/client";

const getBook = gql`
  query Book($id: ID) {
    book(id: $id) {
      title
      genre
      author {
        name
        books {
          title
          id
        }
      }
    }
  }
`;

export default function BookDetails({ id }) {
  const { data: {book: {title, genre, author} = {} } = {}, loading } = useQuery(getBook, {
    variables: { id },
  });

  if (loading) return <p>...loading</p>;

  return (
    <div>
      <p>{title}</p>
      <p>{genre}</p>
      <p>{author.name}</p>
      <h1>All books by this Author: </h1>
      <ul>
        {author.books.map((book) => {
          return <li key={book.id}>{book.title}</li>;
        })}
      </ul>
    </div>
  );
}
