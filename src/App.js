import React from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.scss";

import ContactsList from "./components/ContactsList";
import Navbar from "./constants/Navbar";
import About from "./components/About";

const App = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path={["/address-book-ui/", "/address-book-ui/contacts"]} component={ContactsList} />
        <Route exact path={"/address-book-ui/about"} component={About} />
      </Switch>
    </div>
  )
}

export default App
