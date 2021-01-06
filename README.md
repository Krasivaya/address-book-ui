# Address Book 📑

This is a simple address book application, where you can add and view people
in your contact list or blacklist them with a privilege to edit
and remove them anytime.

## Features :rocket:

These are Endpoints that API project exports:

| Endpoints               | Methods | Actions                                      |
| ----------------------- | ------- | -------------------------------------------- |
| /api/contacts           | POST    | Create a contact                             |
| /api/contacts           | GET     | Get all contacts                             |
| /api/contacts           | DELETE  | Delete all contacts                          |
| /api/contacts/user/:id  | GET     | Get a contact by `id`                        |
| /api/contacts/user/:id  | PUT     | Update a contact by `id`                     |
| /api/contacts/user/:id  | DELETE  | Delete a contact by `id`                     |
| /api/blacklist          | GET     | Get all blocked contacts                     |
| /api/contacts?name=[kw] | GET     | Find all contacts which name contains `'kw'` |

## Prerequisites :wrench:

### Set API Project 💻

- Clone the API project with `git clone https://github.com/Krasivaya/address-book-backend.git`
- Head to the directory with `cd address-book-backend`
- Install packages `npm install` or `yarn`
- Create database and add credentials in `.env` file accordingly
- Launch server with `npm run start` or `yarn start`

### Set UI Project 💊

- Clone the UI project with `git clone https://github.com/Krasivaya/address-book-ui.git`
- Head to the directory with `cd address-book-ui`
- Install packages with `npm install` or `yarn`
- Launch app with `npm run start` or `yarn start`

## Technologies Used :gear:

### Backend

- NodeJS
- Express
- MySQL

### Frontend

- React
- Bootstrap

## Screenshots

![address_book](https://user-images.githubusercontent.com/51264308/103799104-4c725100-5053-11eb-867e-ad74a4a744c1.png)
