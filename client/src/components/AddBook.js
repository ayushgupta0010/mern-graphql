import React, { useEffect, useState } from "react";
import { GRAPHQL_URL } from "../urls";
import axios from "axios";

const AddBook = ({ setBookList }) => {
  const [book, setBook] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [authorsList, setAuthorsList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      query: `mutation {
        addBook(name:"${book}", genre:"${genre}",authorId:"${authorId}"){
            id
            name
        }
    }`,
    };
    axios
      .post(GRAPHQL_URL, data)
      .then((response) =>
        setBookList((original) => [...original, response.data.data.addBook])
      )
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const data = {
      query: `{
          authors {
            id
            name
          }
      }`,
    };
    axios
      .post(GRAPHQL_URL, data)
      .then((response) => setAuthorsList(response.data.data.authors))
      .catch((error) => console.log(error));
  }, []);

  return (
    <form id='add-book' onSubmit={handleSubmit}>
      <div className='field'>
        <label>Book name:</label>
        <input
          type='text'
          value={book}
          onChange={(e) => setBook(e.target.value)}
        />
      </div>
      <div className='field'>
        <label>Genre:</label>
        <input
          type='text'
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>
      <div className='field'>
        <label>Author:</label>
        <select value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
          <option>Select author</option>
          {authorsList.map((x) => (
            <option value={x.id} key={x.id}>
              {x.name}
            </option>
          ))}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;
