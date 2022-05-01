import axios from "axios";

export default axios.create({
  baseURL: "https://parseapi.back4app.com",
  headers: {
    "Accept": "application/json",
    "Content-type": "application/json",
    "X-Parse-Application-Id": "R1tQOTPpKy7qavKhWb9JAinEz810scDSoCshr6ZN",
    "X-Parse-REST-API-Key": "p3FmKM2y6NbcUSkbmlXb1MilzWK6vzWSqlHCuQt9"
  }
});

