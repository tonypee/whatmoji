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
      getEmojiById: Emoji
      test: Boolean
    }

    type Mutation {
      addName(input: AddNameInput): Emoji
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
      getEmojiById: async (root, { emoji }) => {
        return await model.getEmojiById(emoji);
      },
      test: async () => {
        return await model.test();
      }
    },
    Mutation: {
      addName: async (root, { input }) => {
        return await model.addName(input.emoji, input.name);
      }
    }
    // Name: {
    //   async user(device_event) {
    //     //return await model.getDeviceById(device_event.device_id);
    //   }
    // }
  }
});
