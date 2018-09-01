import React, { Component } from "react";
import "./Header.css";

class Header extends Component {
  state = { width: 0, height: 0, hideNav: false };

  // componentDidMount() {
  //   this.updateWindowDimensions();
  //   window.addEventListener("resize", this.updateWindowDimensions);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener("resize", this.updateWindowDimensions);
  // }

  // updateWindowDimensions = () => {
  //   this.setState({
  //     width: window.innerWidth,
  //     hideNav: window.innerWidth <= 700
  //   });
  // };

  render() {
    return this.props.showArrow ? (
      <header className="header-mobile">
        <h1 className="book-search-header-mobile">Book Search</h1>
        <div className="arrow-down" onClick={this.props.toggleNavModal} />
      </header>
    ) : (
      <header className="header-desktop">
        <h1 className="book-search-header">Book Search</h1>
      </header>
    );
  }
}

export default Header;
