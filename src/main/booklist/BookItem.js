import React from "react";
import { Link } from "react-router-dom";
import "./BookItem.css";
import notfound from "../../images/notfound.svg";

const BookItem = props => {
  const {
    image = notfound,
    id = "N/A",
    rating = "N/A",
    title = "N/A",
    year = "N/A"
  } = props.book;
  const realeaseYear = year.substring(0, 4);

  return (
    <li className="book-item">
      <Link to={`/book/${id}`} className="thumbnail">
        <img src={image} alt={title} />
        <div className="book-description">
          <h2>{title}</h2>
          <section className="book-details">
            <div className="book-year">
              <span className="title">Year</span>
              <span>{realeaseYear}</span>
            </div>
            <div className="book-rating">
              <span className="title">Rating</span>
              <span>{rating}</span>
            </div>
          </section>
        </div>
      </Link>
    </li>
  );
};

export default BookItem;
