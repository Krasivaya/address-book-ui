import http from "../config/http";

const getAll = () => {
  return http.get("/contacts");
};
const getAllBlocked = () => {
  return http.get("/contacts/blacklist");
};

const get = id => {
  return http.get(`/contacts/user/${id}`);
};

const create = data => {
  return http.post("/contacts", data);
};

const update = (id, data) => {
  return http.put(`/contacts/user/${id}`, data);
};

const remove = id => {
  return http.delete(`/contacts/user/${id}`);
};

const removeAll = () => {
  return http.delete(`/contacts`);
};

const findByName = name => {
  return http.get(`/contacts?name=${name}`);
};

export default {
  getAll,
  getAllBlocked,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName
};
