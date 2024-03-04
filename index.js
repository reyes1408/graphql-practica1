import { ApolloServer, gql } from "apollo-server"
import { connectDB } from "./database/db.js";
import User from "./models/user.js";
import Publication from "./models/publication.js"

connectDB();

const typeDefs = gql`
    type User {
        userName: String!,
        email: String!,
        password: String!,
        registerDate: String!,
        publications: [Publication]
    }

    type Publication {
        description: String!,
        createDate: String!,
        likes: Int!
    }

    type Query {
        UserCount: Int!
    }
`

const resolvers = {
    Query: {
        UserCount: () => User.collection.countDocuments(),
    }
}

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
})

server.listen().then(({ url }) => {
    console.log(`Servidor corriendo en ${url}`);
})

