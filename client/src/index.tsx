// see https://react-firebase-js.com/docs/guides/build-a-react-app-with-firebase-auth-and-realtime-database/add-google-and-anonymous-auth
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import View from "./pages/View";
import { Global, css } from "@emotion/core";

function AppRouter() {
  return (
    <div className="App">
      <Global
        styles={css`
          .App {
            font-family: sans-serif;
          }

          a {
            text-decoration: none;
            color: black;
          }
        `}
      />
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
