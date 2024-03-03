import { ApolloServer, gql } from "apollo-server"

const server = new ApolloServer({
    // typeDefs: ,
    // resolvers: 
})

server.listen().then(({url}) => {
    console.log(`Servidor corriendo en ${url}`);
})

