import React, { useRef } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import {allBooks} from "./BookList"

const getAuthorsQuery = gql`
  {
    allAuthors {
      id
      name
    }
  }
`;

const addBookMutation = gql`
  mutation AddBook($title: String!, $genre: String!, $authorId: ID!) {
    addBook(title: $title, genre: $genre, authorId: $authorId) {
      title
      genre
    }
  }
`;

export default function AddBook() {
  const [ AddBook, { loading, error } ] = useMutation(addBookMutation);
  const query = useQuery(getAuthorsQuery);

  const titleRef = useRef();
  const genreRef = useRef();
  const authorIdRef = useRef(null);

  const addBookToDB = () => {
    const title = titleRef.current.value;
    const genre = genreRef.current.value;
    let authorId = authorIdRef.current.value;

    // Add book with Apollo query
    AddBook({ variables: { title, genre, authorId }, refetchQueries: [{query: allBooks }] });

    //TODO
    // set authorIdRef.current.value to be empty string after every render

  };
  if (error) {
    return "... ups sometihng went wrong"
  }
  if (loading) {
    return " ... uploading book";
  }
  return (
    <div>
      <form>
        Add Book
        <div>
          <label>Book title: </label>
          <input type="text" ref={titleRef} />
        </div>
        <div>
          <label>Genre :</label>
          <input type="text" ref={genreRef} />
        </div>
        <div>
          <label>Author</label>
          <select defaultValue="">
            <option >Select Author</option>
            {query.loading ? (
              <option>...loading</option>
            ) : (
              query.data.allAuthors.map((author) => (
                <option key={author.id} value={author.id} ref={authorIdRef}>
                  {author.name}
                </option>
              ))
            )}
          </select>
        </div>
        <button onClick={addBookToDB}>Add Book</button>
      </form>
    </div>
  );
}
