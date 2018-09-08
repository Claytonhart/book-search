import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Main from "./main/Main";
import Book from "./book/Book";
import NotFound from "./NotFound";

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/book/:bookId" component={Book} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
