import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';
import 'dotenv/config';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000;
const HOST = process.env.HOST || '0.0.0.0';

import mongoose from "mongoose";
await mongoose.connect("mongodb://localhost:27017/movies_db");

console.log("MongoDB connected");

const server = new ApolloServer({
    typeDefs,
    resolvers
});


const { url }  = await startStandaloneServer(server, {
    listen: { port: PORT, host: HOST }
});
console.log(`Server started: ${url}`);