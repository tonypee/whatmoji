// see https://react-firebase-js.com/docs/guides/build-a-react-app-with-firebase-auth-and-realtime-database/add-google-and-anonymous-auth
import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase/app";
import "firebase/auth";
import { config } from "./config";
import "./styles.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import View from "./pages/View";

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

function AppRouter() {
  return (
    <div className="App">
      <h1>Whatmoji😍🍄🙃</h1>

      <Router>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/emoji/:emoji" component={View} />
        </div>
      </Router>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<AppRouter />, rootElement);
