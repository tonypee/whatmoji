import { makeExecutableSchema } from "graphql-tools";
import { gql, ForbiddenError } from "apollo-server-core";
import { model } from "./model";
import GraphQLJSON from "graphql-type-json";
import { GraphQLDateTime } from "graphql-iso-date";

// Issues have been commented out until that feature is implemented

export const schema = makeExecutableSchema({
  typeDefs: gql`
    scalar DateTime

    scalar JSON

    type User {
      id: Int!
      fbid: String
      name: String
      joined: String
    }

    type Emoji {
      emoji: String
      votes: Int
      name: String
      names: [Name]
    }

    type Name {
      name: String
      creator: User
      votes: Int
      created: DateTime
    }

    # API

    type Query {
      getEmojis: [Emoji]
      getEmoji(emoji: String): Emoji
      test: Boolean
    }

    type Mutation {
      addVote(input: AddNameInput): Name
    }

    # Inputs

    input AddNameInput {
      emoji: String
      name: String
    }

    input VoteInput {
      emoji: String
      name: String
    }
  `,

  resolvers: {
    DateTime: GraphQLDateTime,
    JSON: GraphQLJSON,
    Query: {
      // open
      getEmojis: async (root, {}) => {
        return await model.getEmojis();
      },
      getEmoji: async (root, { emoji }) => {
        return await model.getEmoji(emoji);
      },
      test: async () => {
        return await model.test();
      }
    },
    Mutation: {
      addVote: async (root, { input }) => {
        return await model.addVote(input.emoji, input.name, 2);
      }
    }
    // Name: {
    //   async user(device_event) {
    //     //return await model.getDeviceById(device_event.device_id);
    //   }
    // }
  }
});
