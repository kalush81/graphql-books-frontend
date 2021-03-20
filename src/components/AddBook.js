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
          </select>
        </div>
      </form>
    </div>
  );
}
