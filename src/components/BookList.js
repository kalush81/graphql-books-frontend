import React from "react";
import { useQuery, gql } from "@apollo/client";

const allBooks = gql`
  {
    allBooks {
      id
      title
    }
  }
`;

export default function BookList() {
  //const [bookIndex, setBookIndex] = useState(null);
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
            <hr />
          </li>
        );
      })}
    </ul>
  );
}
