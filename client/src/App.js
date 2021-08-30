import React, { useEffect, useState } from "react";
import { GRAPHQL_URL } from "./urls";
import axios from "axios";
import AddBook from "./components/AddBook";
import BookDetails from "./components/BookDetails";

const App = () => {
  const [bookList, setBookList] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");

  useEffect(() => {
    const data = {
      query: `{
        books {
          id
          name
        }
    }`,
    };
    axios
      .post(GRAPHQL_URL, data)
      .then((response) => setBookList(response.data.data.books))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div id='main'>
      <h1>Books</h1>
      <ul id='book-list'>
        {bookList.map((x) => (
          <li key={x.id} onClick={(e) => setSelectedBook(x.id)}>
            {x.name}
          </li>
        ))}
      </ul>
      <BookDetails book={selectedBook} />
      <AddBook setBookList={setBookList} />
    </div>
  );
};

export default App;
