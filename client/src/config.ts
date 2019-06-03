const useNgrok = true;

const server = useNgrok ? "caca80ca.ngrok.io" : "localhost:4001";
export default {
  graphqlPath: `http://${server}/graphql`
};
