import firebase from "firebase";

export const login = async () => {
  var provider = new firebase.auth.FacebookAuthProvider();

  try {
    const result = await firebase.auth().signInWithPopup(provider);
    var token = (result.credential as any).accessToken;
    var user = result.user;
    console.log("logged in ", token, user);
    return user;
  } catch (e) {
    console.log(e);
  }
};
