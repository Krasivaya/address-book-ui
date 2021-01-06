import React, { useState, useEffect } from "react";
import ContactDataService from "../services/ContactService";
import { Button, Modal, Input } from "semantic-ui-react";
import cogoToast from "cogo-toast";
import AddContact from "./AddContact";

const exampleReducer = (state, action) => {
  switch (action.type) {
    case "close":
      return { open: false };
    case "open":
      return { open: true, size: action.size };
    default:
      throw new Error("Unsupported action...");
  }
};

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const [blacklist, setBlacklist] = useState([]);
  const [currentContact, setCurrentContact] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    retrieveContacts();
    retrieveBlacklist();
  }, []);

  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveContacts = () => {
    ContactDataService.getAll()
      .then((response) => {
        setContacts(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveBlacklist = () => {
    ContactDataService.getAllBlocked()
      .then((response) => {
        setBlacklist(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveContacts();
    retrieveBlacklist();
    setCurrentContact(null);
    setCurrentIndex(-1);
  };

  const setActiveContact = (contact, index) => {
    setCurrentIndex(index);

    ContactDataService.get(contact.id)
      .then((response) => {
        setCurrentContact(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentContact({ ...currentContact, [name]: value });
  };

  const updateContact = () => {
    ContactDataService.update(currentContact.id, currentContact)
      .then((response) => {
        console.log(response.data);
        const options = { position: "top-right" };
        cogoToast.success("Contact has been updated successfully!", options);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateBlocked = (status) => {
    ContactDataService.update(currentContact.id, { blocked: status })
      .then((response) => {
        setCurrentContact({ ...currentContact, blocked: status });
        const options = { position: "top-right" };
        cogoToast.success("Contact has been updated successfully!", options);
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removeAllContacts = () => {
    ContactDataService.removeAll()
      .then((response) => {
        const options = { position: "top-right" };
        cogoToast.success(
          "All Contacts have been deleted successfully!",
          options
        );
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteContact = () => {
    ContactDataService.remove(currentContact.id)
      .then((response) => {
        const options = { position: "top-right" };
        cogoToast.success("Contact has been delete successfully!", options);
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const blocked = contacts.filter((contact) => !contact.blocked);

  const findByName = () => {
    ContactDataService.findByName(searchName)
      .then((response) => {
        setContacts(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="mt-4">
      <div className="row mx-2">
        <div className="col-md-3">
          <AddContact />
        </div>
        <div className="col-md-5">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findByName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <span
            className="btn btn-sm btn-danger float-right"
            onClick={() => removeAllContacts()}
          >
            Remove All
          </span>
        </div>
      </div>
      <div className="row mx-2 mt-3">
        <div className="col-md-3">
          <h4>
            BlackList
            <span class="badge badge-primary badge-sm badge-pill ml-2">
              {blacklist.length}
            </span>
          </h4>
          <ul className="list-group">
            {blacklist &&
              blacklist.map((contact, index) => (
                <li
                  className={
                    "list-group-item " +
                    (-index === currentIndex ? "active" : "")
                  }
                  onClick={() => setActiveContact(contact, -index)}
                  key={index}
                >
                  {contact.name}
                </li>
              ))}
          </ul>
        </div>
        {searchName ? (
          <div className="col-md-5">
            <h4>Found {contacts.length} Contacts</h4>
            <ul className="list-group">
              {contacts &&
                contacts.map((contact, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => setActiveContact(contact, index)}
                    key={index}
                  >
                    {contact.name}
                  </li>
                ))}
            </ul>
          </div>
        ) : (
          <div className="col-md-5">
            <h4>
              Contacts
              <span class="badge badge-primary badge-sm badge-pill ml-2">
                {blocked.length}
              </span>
            </h4>
            <ul className="list-group">
              {contacts &&
                contacts.map(
                  (contact, index) =>
                    !contact.blocked && (
                      <li
                        className={
                          "list-group-item " +
                          (index === currentIndex ? "active" : "")
                        }
                        onClick={() => setActiveContact(contact, index)}
                        key={index}
                      >
                        {contact.name}
                      </li>
                    )
                )}
            </ul>
          </div>
        )}
        <div className="col-md-4">
          {currentContact ? (
            <div className="card">
              <div className="card-body">
                <div>
                  <h4>Contact</h4>
                  <div>
                    <label>
                      <strong>Name:</strong>
                    </label>{" "}
                    {currentContact.name}
                  </div>
                  <div>
                    <label>
                      <strong>Email:</strong>
                    </label>{" "}
                    {currentContact.email}
                  </div>
                  <div>
                    <label>
                      <strong>Phone Number:</strong>
                    </label>{" "}
                    {currentContact.phone_number}
                  </div>
                  <div>
                    <label>
                      <strong>Status:</strong>
                    </label>{" "}
                    {currentContact.blocked ? "Blocked" : "Active"}
                  </div>

                  {currentContact.id ? (
                    <>
                      <span
                        className="badge badge-primary"
                        role="button"
                        onClick={() => dispatch({ type: "open", size: "tiny" })}
                      >
                        Edit
                      </span>

                      <Modal
                        size={size}
                        open={open}
                        onClose={() => dispatch({ type: "close" })}
                      >
                        <Modal.Header>Edit Contact</Modal.Header>
                        <Modal.Content>
                          <h5>
                            <label className="mr-3" htmlFor="name">
                              Name:
                            </label>
                            <Input
                              placeholder="Enter name..."
                              type="text"
                              id="name"
                              name="name"
                              value={currentContact.name}
                              onChange={handleInputChange}
                            />
                          </h5>
                          <h5>
                            <label className="mr-3" htmlFor="name">
                              Email:
                            </label>
                            <Input
                              placeholder="Enter email..."
                              type="text"
                              id="email"
                              name="email"
                              value={currentContact.email}
                              onChange={handleInputChange}
                            />
                          </h5>
                          <h5>
                            <label className="mr-3" htmlFor="name">
                              Phone Number:
                            </label>
                            <Input
                              placeholder="Enter phone number..."
                              type="text"
                              id="phone_number"
                              name="phone_number"
                              value={currentContact.phone_number}
                              onChange={handleInputChange}
                            />
                          </h5>
                        </Modal.Content>
                        <Modal.Actions>
                          <Button
                            className="float-left"
                            negative
                            onClick={() => dispatch({ type: "close" })}
                          >
                            Cancel
                          </Button>
                          <Button
                            positive
                            onClick={() => {
                              dispatch({ type: "close" });
                              updateContact();
                            }}
                          >
                            Save
                          </Button>
                        </Modal.Actions>
                      </Modal>
                    </>
                  ) : (
                    <span></span>
                  )}

                  {currentContact.blocked ? (
                    <span
                      className="badge badge-warning mx-2"
                      role="button"
                      onClick={() => updateBlocked(false)}
                    >
                      UnBlock
                    </span>
                  ) : (
                    <span
                      className="badge badge-warning mx-2"
                      role="button"
                      onClick={() => updateBlocked(true)}
                    >
                      Block
                    </span>
                  )}

                  <span
                    className="badge badge-danger"
                    role="button"
                    onClick={deleteContact}
                  >
                    Delete
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p>Please click on a Contact...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactsList;
