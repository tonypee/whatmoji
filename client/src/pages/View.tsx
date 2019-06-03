import React from "react";
import { css } from "emotion";
import { Link } from "react-router-dom";
import firebase from "firebase";

const styles = css`
  .char {
    font-size: 140px;
  }
`;

export default class View extends React.Component<any> {
  async componentDidMount() {
    const ref = await firebase.firestore().collection("emojis");
    const ss = await ref.get();
    console.log(ss.docs[0]);
  }

  render() {
    return (
      <div className={styles}>
        <Link to="/">&lt; Back</Link>
        <div className="char">{this.props.match.params.emoji}</div>
        <ul>
          <li>1</li>
        </ul>
        View here...
      </div>
    );
  }
}
