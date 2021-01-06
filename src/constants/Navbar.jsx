import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-primary">
        <a href="/address-book-ui/contacts" className="navbar-brand">
          Address Book
        </a>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/address-book-ui/"} className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/address-book-ui/about"} className="nav-link">
              About
            </Link>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li className="nav-item navbar-right">
            <Link to={"/address-book-ui/contacts"} className="nav-link avatar">
              <img
                className="rounded-circle mr-2"
                src="https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/11_avatar-512.png"
                width="5%"
                alt="Avatar"
              />
              Krasivaya
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
