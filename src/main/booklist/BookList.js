import React from "react";

import BookItem from "./BookItem";
import "./BookList.css";

const BookList = ({ bookInfo, getNextPage, getPreviousPage }) => {
  return (
    <section className="book-list-section">
      <ul className="book-list">
        {bookInfo.map(book => {
          return <BookItem key={book.id} book={book} />;
        })}
      </ul>
      <div className="book-list-button-container">
        <button onClick={getPreviousPage} className="book-list-button">
          Previous
        </button>
        <button onClick={getNextPage} className="book-list-button">
          Next
        </button>
      </div>
    </section>
  );
};

export default BookList;
