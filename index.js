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

    type Mutation {
        createUser(
            userName: String!
            email: String!
            password: String!
            registerDate: String!
        ): User!

        updateUser(
            userId: ID!,
            userName: String,
            email: String
        ): User!

        deleteUser(
            userId: ID!
        ): User!

        addPublicationToUser(
            userId: ID!, 
            description: String!, 
            createDate: String!
        ): Publication!

        createPublication(
            description: String!, 
            createDate: String!
        ): Publication!

        updatePublication(
            publicationId: ID!, 
            description: String
        ): Publication!

        deletePublication(
            publicationId: ID!
        ): Publication!

        addLikeToPublication(
            publicationId: ID!, 
            userId: ID!
        ): Publication!
    }
`

const resolvers = {
    Query: {
        UserCount: () => User.collection.countDocuments(),
    },
    Mutation: {
        // Crear un nuevo usuario
        createUser: async (_, { userName, email, password, registerDate }) => {
            try {
                const newUser = await User.create({
                    userName,
                    email,
                    password,
                    registerDate
                });
                return newUser;
            } catch (error) {
                throw new Error('No se pudo crear el usuario');
            }
        },
        // Actualizar usuario
        updateUser: async (_, { userId, userName, email }) => {
            try {
                const updatedUser = await User.findByIdAndUpdate(
                    userId,
                    { userName, email },
                    { new: true }
                );
                return updatedUser;
            } catch (error) {
                throw new Error('No se pudo actualizar el usuario');
            }
        },
        // Eliminar usuario
        deleteUser: async (_, { userId }) => {
            try {
                const deletedUser = await User.findByIdAndDelete(userId);
                return deletedUser;
            } catch (error) {
                throw new Error('No se pudo eliminar el usuario');
            }
        },
        // Agregar publicación a un usuario
        addPublicationToUser: async (_, { userId, description, createDate }) => {
            try {
                const newPublication = await Publication.create({ description, createDate });
                await User.findByIdAndUpdate(userId, { $push: { publications: newPublication._id } });
                return newPublication;
            } catch (error) {
                throw new Error('No se pudo agregar la publicación al usuario');
            }
        },
        // Crear publicación
        createPublication: async (_, { description, createDate }) => {
            try {
                const newPublication = await Publication.create({ description, createDate });
                return newPublication;
            } catch (error) {
                throw new Error('No se pudo crear la publicación');
            }
        },
        // Actualizar publicación
        updatePublication: async (_, { publicationId, description }) => {
            try {
                const updatedPublication = await Publication.findByIdAndUpdate(publicationId, { description }, { new: true });
                return updatedPublication;
            } catch (error) {
                throw new Error('No se pudo actualizar la publicación');
            }
        },
        // Eliminar publicación
        deletePublication: async (_, { publicationId }) => {
            try {
                const deletedPublication = await Publication.findByIdAndDelete(publicationId);
                return deletedPublication;
            } catch (error) {
                throw new Error('No se pudo eliminar la publicación');
            }
        },
        // Dar like a una publicación
        addLikeToPublication: async (_, { publicationId, userId }) => {
            try {
                const updatedPublication = await Publication.findByIdAndUpdate(publicationId, { $inc: { likes: 1 } }, { new: true });
                return updatedPublication;
            } catch (error) {
                throw new Error('No se pudo agregar el like a la publicación');
            }
        },

    }
}

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
})

server.listen().then(({ url }) => {
    console.log(`Servidor corriendo en ${url}`);
})

