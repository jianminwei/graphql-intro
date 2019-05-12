const { ApolloServer, gql } = require('apollo-server')
const fs = require('fs')
const authors = require("./data/authors")
const books = require("./data/books")

const typeDefs = fs.readFileSync('./typeDefs.graphql', 'UTF-8')

const resolvers = require('./resolvers')

const context = { books, authors }

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    engine: process.env.ENGINE_API_KEY ? true : false
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});