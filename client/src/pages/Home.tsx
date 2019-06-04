import React from "react";
import { emojiList } from "../core/data";
import { css } from "emotion";
import { Link } from "react-router-dom";
import { observable, toJS } from "mobx";
import { queryGraphQl } from "src/core/gql";
import { observer } from "mobx-react";
import { arrayToObject } from "src/core/helpers";

const styles = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .char {
    font-size: 60px;
  }
  .item {
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    padding: 20px;
    text-align: center;
    border: 2px solid white;
    :hover {
      border: 2px solid grey;
      cursor: pointer;
    }
    .number {
      color: grey;
      font-size: 12px;
      display: inline;
    }
    &.selected {
      width: 100%;
      height: 400px;
    }
  }
`;

@observer
export default class Home extends React.Component {
  async componentDidMount() {
    await store.load();
  }
  render() {
    if (!store.map) return "loading...";
    const map = toJS(store.map);
    return (
      <div className={styles}>
        {emojiList.map((emoji, i) => {
          const match: any = map[emoji];
          return (
            <Link to={`/emoji/${emoji}`}>
              <div className="item">
                <span className="char">{emoji}</span>
                <br />
                {match ? match.name : "..."}
                {match && <span className="number">({match.votes})</span>}
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
}

const store = observable({
  other: 123,
  map: null,
  async load() {
    const query = `
      {
        getEmojis {
          emoji
          name
          votes
        }
      }
    `;
    const response = await queryGraphQl(query);
    console.log("response", response);
    const data = response.data.getEmojis;
    this.map = arrayToObject(data, "emoji");
  }
});
