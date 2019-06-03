import { knex } from "../core/db";

export const model = {
  async test() {
    //   await knex.raw(`set role postgres`);

    console.log(123);
    const names = await knex("names");
    console.log(names);
  },

  async getEmojiById(emoji) {
    //   await knex.raw(`set role postgres`);

    const data = await knex("emoji")
      .where({
        emoji
      })
      .first();

    return data;
  },

  async addName(emoji: String, name: String) {
    console.log("-- addName", { emoji, name });

    const response = await knex("names")
      .insert({
        emoji,
        name,
        creator: 1
      })
      .returning("*");

    console.log({ response });
    return response;
  }
};
