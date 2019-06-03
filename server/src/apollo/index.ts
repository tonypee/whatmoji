import { ApolloServer, ForbiddenError } from "apollo-server-express";
import { schema } from "./schema";
import chalk from "chalk";

export default app => {
  const server = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
    formatError: error => {
      console.error(chalk.red(error.toString()));
      if (error && error.extensions) {
        delete error.extensions.exception;
      }
      return error;
    },
    async context({ req }) {
      const token = req.headers.authorization || "";
      if (token) {
        // const tokenInfo = jwt.decode(token.substr(7), config.jwtSecret);
        // if (!tokenInfo) {
        //   throw new ForbiddenError("Invalid Token");
        // }
        // console.log("-- Context: ", tokenInfo.userId, tokenInfo.email);
        // await knex.raw(`
        //   set role api_accessor;
        //   set jwt.claims.userid =${tokenInfo.userId};
        // `);
        // return { user: tokenInfo };
      }
    }
  });

  server.applyMiddleware({ app, path: "/graphql" });

  return (req, res, next) => {
    next();
  };
};
