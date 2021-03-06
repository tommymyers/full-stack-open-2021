import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:3001/api/persons";

const getAll = () => {
  const request = axios.get("/");
  return request.then((response) => response.data);
};

const add = (newObject) => {
  const request = axios.post("/", newObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`/${id}`);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`/${id}`, newObject);
  return request.then((response) => response.data);
};

const peopleService = { getAll, add, remove, update };
export default peopleService;
