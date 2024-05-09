import axios from "axios";

const apiConsumer = axios.create({
  baseURL: "https://consumer-tv8i.onrender.com",
});

const apiBroker = axios.create({
    baseURL: "https://broker-mk3x.onrender.com",
});

export { apiConsumer, apiBroker };