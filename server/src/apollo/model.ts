import { knex } from "../core/db";

export const model = {
  async test() {
    //   await knex.raw(`set role postgres`);

    console.log(123);
    const names = await knex("names");
    console.log(names);
  },

  async getEmojis() {
    const { rows } = await knex.raw(
      `select v.emoji, v.name, count(v.name) as votes  FROM
        votes v
        group by(v.emoji, v.name)
      `
    );
    return rows;
  },
  async getEmoji(emoji) {
    const { rows } = await knex.raw(
      `
      SELECT v.name, v.emoji, count(v.id) as votes
        FROM votes v 
        WHERE v.emoji=?  
        group by (v.name, v.emoji)
      `,
      [emoji]
    );

    const total = await knex(`votes`).where({
      emoji
    });

    return {
      emoji,
      votes: total.length,
      names: rows
    };
  },

  async addVote(emoji: String, name: String, user) {
    console.log("-- addVote", { emoji, name });

    const response = await knex("votes")
      .insert({
        emoji,
        name,
        user
      })
      .returning("*");

    console.log({ response });
    return response;
  }
};
