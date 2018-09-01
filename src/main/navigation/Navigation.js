import React, { Component } from "react";
import "./Navigation.css";

class Navigation extends Component {
  componentDidMount() {}

  render() {
    let modalClassNames;
    if (this.props.showModal) {
      modalClassNames = "navigation-modal";
    } else {
      modalClassNames = "navigation";
    }

    return (
      <section className={modalClassNames}>
        <form
          onSubmit={this.props.onSearchButtonClick}
          className="navigation-form"
        >
          <div className="navigation-search">
            <label>Search Term</label>
            <input
              className="navigation-input"
              title="book search value"
              name="searchValue"
              onChange={this.props.onInputChange}
              value={this.props.searchValue}
              type="text"
            />
          </div>
          <div className="navigation-order">
            <label>Search Order</label>
            <div className="navigation-order-container">
              <div>
                <input
                  type="radio"
                  name="radioValue"
                  value="newest"
                  checked={this.props.selectedOption === "newest"}
                  onChange={this.props.onRadioChange}
                />{" "}
                newest
              </div>
              <div>
                <input
                  type="radio"
                  name="radioValue"
                  value="relevance"
                  checked={this.props.selectedOption === "relevance"}
                  onChange={this.props.onRadioChange}
                />{" "}
                relevance
              </div>
            </div>
          </div>
          <div className="navigation-select">
            <label>Print Type</label>
            <select
              name="selectValue"
              id="printType"
              value={this.props.selectValue}
              onChange={this.props.onInputChange}
            >
              <option value="all">all</option>
              <option value="books">books</option>
              <option value="magazines">magazines</option>
            </select>
          </div>
          <button
            className="navigation-button"
            onClick={this.props.onSearchButtonClick}
          >
            Search
          </button>
        </form>
      </section>
    );
  }
}

export default Navigation;
