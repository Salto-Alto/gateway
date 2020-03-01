import { ApolloServer } from "apollo-server";
import typeDefs from "./schema";
import LaunchAPI from "./datasources/launch";
import resolvers from "./resolvers";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        launchAPI: new LaunchAPI(),
    })
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});