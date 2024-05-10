const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { resolvers} = require('./resolvers');
const cors = require('cors');
const { connectDB } = require('./db');
const jwt = require('jsonwebtoken');

require('dotenv').config();



connectDB();


// GraphQL schema
const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        tasks: [Task!]
    }

    type Task {
        id: ID!
        name: String!
        complete: Boolean!
        user: User!
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    input RegisterInput {
        name: String!
        email: String!
        password: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    input CreateTaskInput {
        name: String!
        complete: Boolean!
    }

    input UpdateTaskInput {
        name: String
        complete: Boolean
    }

    type Query {
        greetings: [String!]
        tasks: [Task!]
    }

    type Mutation {
        register(input: RegisterInput!): User!
        login(input: LoginInput!): AuthPayload!
        createTask(input: CreateTaskInput!): Task!
        updateTask(id: ID!, input: UpdateTaskInput!): Task!
        deleteTask(id: ID!): Task!
    }
`;

const app = express();
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

const secretKey = process.env.JWT_SECRET;

const getUser = async (token) => {
    if (token) {
        try {
            // Log the token to check its value
            console.log('Token:', token);

            // Verify the token using the correct secret key
            const decoded = await jwt.verify(token, secretKey);
            return decoded;
        } catch (error) {
            console.error('Token verification failed:', error.message);
            return null;
        }
    }
};


// Create an instance of ApolloServer
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const token = req.headers.authorization;
        const user = await getUser(token);
        return { user };
    },
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, async () => {
    await server.start();
    server.applyMiddleware({ app });
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
});
