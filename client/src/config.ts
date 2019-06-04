const useNgrok = true;

const server = useNgrok ? "75d77815.ngrok.io" : "localhost:4001";
export default {
  graphqlPath: `http://${server}/graphql`
};
