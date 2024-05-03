import axios from "axios";

const apiConsumer = axios.create({
  baseURL: "https://consumer-tv8i.onrender.com",
});

const apiBroker = axios.create({
    baseURL: "http://localhost:4545/",
});

export { apiConsumer, apiBroker };