import React, { Component } from "react";
import axios from "axios";

import "./Book.css";
import notfound from "../images/notfound.svg";

class Book extends Component {
  state = {
    book: {},
    isLoading: true,
    imageLoaded: false
  };

  async componentDidMount() {
    const { bookId } = this.props.match.params;
    const bookUrl = `https://www.googleapis.com/books/v1/volumes/${bookId}`;

    let response = await axios.get(bookUrl);
    let book = response.data.volumeInfo;

    const {
      authors,
      averageRating,
      categories,
      imageLinks,
      pageCount,
      publishedDate,
      publisher,
      title,
      description
    } = book;

    let isbn;
    if (book.industryIdentifiers) {
      let index = book.industryIdentifiers.length - 1;
      isbn = book.industryIdentifiers[index].identifier;
    }

    this.setState({
      authors,
      averageRating,
      categories,
      imageLinks,
      pageCount,
      publishedDate,
      publisher,
      title,
      isbn,
      description,
      isLoading: false
    });
  }

  onImageLoad = () => {
    this.setState({ imageLoaded: true });
  };

  onImageError = () => {
    console.log("image couldn't load");
  };

  render() {
    const {
      authors,
      averageRating,
      categories,
      imageLinks,
      pageCount,
      publishedDate,
      publisher,
      title,
      isbn,
      description
    } = this.state;

    let medium, thumbnail;
    if (imageLinks) {
      medium = imageLinks.medium;
      thumbnail = imageLinks.thumbnail;
    }

    return (
      <div className="book-container">
        {!this.state.isLoading && (
          <div>
            <h1 className="book-title">{title}</h1>
            <div className="book-inner-container">
              <img
                src={medium || thumbnail || notfound}
                alt={title}
                onLoad={this.onImageLoad}
                onError={this.onImageError}
              />
              <div className="book-info">
                <p>
                  <span>Title</span>
                  {title}
                </p>
                <p>
                  <span>ISBN 13</span>
                  {isbn}
                </p>
                <p>
                  <span>Publisher</span>
                  {publisher}
                </p>
                <p>
                  <span>Authors</span>
                  {authors}
                </p>
                <p>
                  <span>Date published</span>
                  {publishedDate}
                </p>
                <p>
                  <span>Page Count</span>
                  {pageCount}
                </p>
                <p>
                  <span>Categories</span>
                  {categories}
                </p>
                <p>
                  <span>Average Rating</span>
                  {averageRating}
                </p>
                <div className="book-info-description">
                  <div className="book-info-description--name">Description</div>
                  <div>{description}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Book;
