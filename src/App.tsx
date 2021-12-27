import React from 'react';
import './App.css';
import AppWrapper from './AppWrapper';
import Parse from 'parse';
// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = 'R1tQOTPpKy7qavKhWb9JAinEz810scDSoCshr6ZN';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'cYQSqMFrttPxdpaKBGaOxFFigfBzgt1BNngxVIng';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;
function App() {
  return (
    <div className="App">
      <AppWrapper/>
    </div>
  );
}
export default App;
