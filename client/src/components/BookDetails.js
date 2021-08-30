import React, { useEffect, useState } from "react";
import { GRAPHQL_URL } from "../urls";
import axios from "axios";

const BookDetails = ({ book }) => {
  const [bookDetails, setBookDetails] = useState({
    name: "",
    genre: "",
    author: {
      books: [],
    },
  });

  useEffect(() => {
    if (book !== "") {
      const bookQuery = {
        query: `{
              book(id:"${book}"){
                id
                name
                genre
                author{
                  id
                  name
                  age
                  books{
                    id
                    name
                  }
                }
              }
            }`,
      };

      axios
        .post(GRAPHQL_URL, bookQuery)
        .then((response) => setBookDetails(response.data.data.book))
        .catch((error) => console.log(error));
    }
  }, [book]);

  return (
    <div id='book-details'>
      <h2>{bookDetails.name}</h2>
      <p>{bookDetails.genre}</p>
      <p>{bookDetails.author.name}</p>
      <p>All books by this author:</p>
      <ul className='other-books'>
        {bookDetails.author.books.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookDetails;
