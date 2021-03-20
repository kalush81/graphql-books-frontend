import React from "react";
import { useQuery, gql } from "@apollo/client";

const allAuthors = gql`
  {
    allAuthors {
      id
      name
    }
  }
`;

export default function AddBook() {
  const query = useQuery(allAuthors);

  console.log("query", query);
  if (query.loading) {
      return "...loading"
  }
  return (
    <div>
      <form>
        Add Book
        <div>
          <label>Book name: </label>
          <input type="text" />
        </div>
        <div>
          <label>Genre :</label>
          <input type="text" />
        </div>
        <div>
          <label>Author</label>
          <select>
            <option>Select Author</option>
            {query.data.allAuthors.map(author => <option key={author.id}>{author.name}</option>)}
          </select>
        </div>
      </form>
    </div>
  );
}
