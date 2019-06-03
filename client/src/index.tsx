// see https://react-firebase-js.com/docs/guides/build-a-react-app-with-firebase-auth-and-realtime-database/add-google-and-anonymous-auth
import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import View from "./pages/View";

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

if ((module as any).hot) {
  (module as any).hot.accept();
}

const rootElement = document.getElementById("root");
ReactDOM.render(<AppRouter />, rootElement);
