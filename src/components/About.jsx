import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <div className="jumbotron">
              <h3 className="display-3">Address Book</h3>
              <p className="lead">
                This is a simple address book, where you can add and view people
                in your contact list or blacklist them with a privilege to edit
                and remove them anytime.
              </p>
              <hr className="my-4" />
              <p>Start using it now!</p>
              <p className="lead text-center">
                <Link className="btn btn-primary btn-lg" to="/" role="button">
                  View Contacts
                </Link>
              </p>
            </div>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </div>
  );
};

export default About;
