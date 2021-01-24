import axios from "axios";

const baseURL = "http://localhost:3001";

const getAll = () => {
  return axios.get(`${baseURL}/persons`);
};

const create = (person) => {
  return axios.post(`${baseURL}/persons`, person);
};

const update = (person) => {
  return axios.put(`${baseURL}/persons/${person.id}`, person);
};

const deletePerson = (person) => {
  return axios.delete(`${baseURL}/persons/${person.id}`);
};

export { create, getAll, update, deletePerson };
