import React from "react";
import { css } from "emotion";
import { Link } from "react-router-dom";
import { queryGraphQl } from "src/core/gql";
import { observable } from "mobx";
import { observer } from "mobx-react";

const styles = css`
  .char {
    font-size: 140px;
  }
`;

@observer
export default class View extends React.Component<any> {
  @observable input: any = null;
  emoji;

  async componentDidMount() {
    const emoji = (this.emoji = this.props.match.params.emoji);
    await store.load(emoji);
  }

  onKeyPress(e) {
    if (e.key == "Enter") {
      store.vote(this.emoji, e.target.value);
    }
  }

  render() {
    if (!store.data) return "...loading";
    return (
      <div className={styles}>
        <Link to="/">&lt; Back</Link>
        <div className="char">{this.emoji}</div>
        <ul>
          {store.data.names.map(nameItem => (
            <li>
              {nameItem.name} ({nameItem.votes}){" "}
              <button onClick={() => store.vote(this.emoji, nameItem.name)}>
                +
              </button>
            </li>
          ))}
        </ul>
        {this.input}
        <br />
        <input
          onChange={e => (this.input = e.target.value)}
          onKeyPress={e => this.onKeyPress(e)}
        />
      </div>
    );
  }
}

const store = observable({
  data: null,
  async load(emoji) {
    const query = `
      query($emoji:String){
        getEmoji(emoji:$emoji) {
          emoji
          votes,
          names{
            name,
            votes
          }
        }
      }
    `;
    const response = await queryGraphQl(query, { emoji });

    return (this.data = response.data.getEmoji);
  },

  async vote(emoji, name) {
    const query = `
      mutation($emoji:String, $name:String){
        addVote(input: { emoji:$emoji, name:$name }) {
          name,
            votes
        }
      }
    `;
    const response = await queryGraphQl(query, { emoji, name });
    await this.load(emoji);
    return true;
  }
});
