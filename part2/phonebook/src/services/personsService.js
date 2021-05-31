import axios from "axios"

axios.defaults.baseURL = "http://127.0.0.1:3001/persons"

const getAll = () => {
  const request = axios.get("/")
  return request.then(response => response.data)
}

const add = (newObject) => {
  const request = axios.post("/", newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`/${id}`)
  return request.then(response => response.data)
}

const personsService = { getAll, add, remove }
export default personsService
