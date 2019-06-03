// see https://react-firebase-js.com/docs/guides/build-a-react-app-with-firebase-auth-and-realtime-database/add-google-and-anonymous-auth
import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { config } from "../config";
import "./styles.css";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer
} from "@react-firebase/auth";
import { login } from "./Auth";
import Home from "../pages/Home";

export default () => (
  <FirebaseAuthProvider firebase={firebase} {...config}>
    <Home />

    <FirebaseAuthConsumer>
      {({ isSignedIn, firebase }) => {
        if (isSignedIn === true) {
          return (
            <div>
              <h2>You're signed in 🎉 </h2>
              <button
                onClick={() => {
                  firebase
                    .app()
                    .auth()
                    .signOut();
                }}
              >
                Sign out
              </button>
            </div>
          );
        } else {
          return (
            <div>
              <h2>You're not signed in </h2>
              <button
                onClick={async () => {
                  login();
                }}
              >
                Sign in with facebook
              </button>
            </div>
          );
        }
      }}
    </FirebaseAuthConsumer>
    <FirebaseAuthConsumer>
      {({ isSignedIn, user, providerId }) => {
        return (
          <pre style={{ height: 300, overflow: "auto" }}>
            {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
          </pre>
        );
      }}
    </FirebaseAuthConsumer>
  </FirebaseAuthProvider>
);
