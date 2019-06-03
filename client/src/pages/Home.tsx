import React from "react";
import { emojiList } from "../core/data";
import { css } from "emotion";
import { Link } from "react-router-dom";

const styles = css`
  display: flex;
  flex-wrap: wrap;

  .char {
    font-size: 40px;
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

const c = 4;
export default () => (
  <div className={styles}>
    {emojiList.map((char, i) => (
      <Link to={`/emoji/${char}`}>
        <div className="item">
          <span className="char">{char}</span>
          <br />
          Dog shit <span className="number">(23,322)</span>
        </div>
      </Link>
    ))}
  </div>
);
