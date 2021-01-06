import React, { useState } from "react";
import { Button, Modal, Input } from "semantic-ui-react";
import ContactDataService from "../services/ContactService";

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

const AddContact = () => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;

  const initialContactState = {
    id: null,
    name: "",
    email: "",
    phone_number: "",
    blocked: false,
  };
  const [contact, setContact] = useState(initialContactState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContact({ ...contact, [name]: value });
  };

  const saveContact = () => {
    var data = {
      name: contact.name,
      email: contact.email,
      phone_number: contact.phone_number,
    };

    ContactDataService.create(data)
      .then((response) => {
        setContact({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          phone_number: response.data.phone_number,
          blocked: response.data.blocked,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    window.location.reload();
  };
  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() => dispatch({ type: "open", size: "tiny" })}
      >
        Create Contact
      </button>

      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: "close" })}
      >
        <Modal.Header>Create Contact</Modal.Header>
        <Modal.Content>
          <h5>
            <label className="mr-3" htmlFor="name">
              Name:
            </label>
            <Input
              placeholder="Enter name..."
              type="text"
              id="name"
              required
              value={contact.name}
              onChange={handleInputChange}
              name="name"
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
              required
              value={contact.email}
              onChange={handleInputChange}
              name="email"
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
              required
              value={contact.phone_number}
              onChange={handleInputChange}
              name="phone_number"
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
              saveContact();
            }}
          >
            Create
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default AddContact;
