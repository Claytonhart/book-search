import React, { Component } from "react";
import axios from "axios";

import Navigation from "./navigation/Navigation";
import BookList from "./booklist/BookList";
import Header from "../header/Header";

class Main extends Component {
  state = {
    apiKey: `AIzaSyDm8izvnzH0Cu-tyEpGidcXyBdHCOuIbLM`,
    url: `https://www.googleapis.com/books/v1/volumes?q=`,
    maxResults: 20,
    bookInfo: [],
    searchValue: "Harry Potter",
    selectedOption: "relevance",
    selectValue: "all",
    startIndex: 0,
    width: 0,
    height: 0,
    showArrow: false,
    showModal: false
  };

  componentDidMount() {
    this.getBooks();
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({
      width: window.innerWidth,
      showArrow: window.innerWidth <= 700
    });
  };

  getNextPage = () => {
    const { startIndex, maxResults, totalItems } = this.state;

    if (startIndex + maxResults < totalItems) {
      this.setState({ startIndex: startIndex + maxResults }, this.getBooks);
    }
  };

  getPreviousPage = () => {
    const { startIndex, maxResults } = this.state;

    if (startIndex - maxResults >= 0) {
      this.setState({ startIndex: startIndex - maxResults }, this.getBooks);
    }
  };

  getBooks = async () => {
    const {
      url,
      apiKey,
      maxResults,
      searchValue,
      selectedOption,
      selectValue,
      startIndex
    } = this.state;

    const searchUrl = `${url}${searchValue}&maxResults=${maxResults}&orderBy=${selectedOption}&printType=${selectValue}&startIndex=${startIndex}&key=${apiKey}`;

    const response = await axios.get(
      // `${url}${searchValue}&maxResults=${maxResults}&key=${apiKey}`
      searchUrl
    );
    const booklist = response.data.items;
    const { totalItems } = response.data;
    this.setState({ totalItems });
    this.saveBooklist(booklist);
  };

  saveBooklist = booklist => {
    let noDuplicateBooklist = [];

    for (let j = 0; j < booklist.length; j++) {
      let duplicate = false;
      for (let i = j + 1; i < booklist.length; i++) {
        if (booklist[j].id === booklist[i].id) {
          duplicate = true;
        }
      }
      if (!duplicate) {
        noDuplicateBooklist.push(booklist[j]);
      }
    }

    let bookInfo = noDuplicateBooklist.map(book => {
      let author = book.volumeInfo.authors || ["N/A"];
      author = author.join(", ");
      const title = book.volumeInfo.title;
      const year = book.volumeInfo.publishedDate;
      const rating = book.volumeInfo.averageRating;
      const id = book.id;
      let image;

      if (book.volumeInfo.imageLinks) {
        image =
          book.volumeInfo.imageLinks.thumbnail ||
          book.volumeInfo.imageLinks.smallThumbnail;
      }

      const bookObject = {
        author,
        title,
        year,
        rating,
        image,
        id
      };

      return bookObject;
    });

    this.setState({ bookInfo });
  };

  onInputChange = event => {
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onRadioChange = event => {
    this.setState({
      selectedOption: event.target.value
    });
  };

  onSearchButtonClick = event => {
    event.preventDefault();
    this.getBooks();
    if (this.state.showModal) {
      this.toggleNavModal();
    }
  };

  toggleNavModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    return (
      <div>
        <Header
          toggleNavModal={this.toggleNavModal}
          showArrow={this.state.showArrow}
        />
        <section className="main">
          <Navigation
            onInputChange={this.onInputChange}
            onRadioChange={this.onRadioChange}
            searchValue={this.state.searchValue}
            selectedOption={this.state.selectedOption}
            onSearchButtonClick={this.onSearchButtonClick}
            showModal={this.state.showModal}
          />
          <BookList
            bookInfo={this.state.bookInfo}
            getNextPage={this.getNextPage}
            getPreviousPage={this.getPreviousPage}
          />
        </section>
      </div>
    );
  }
}

export default Main;
