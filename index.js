const { ApolloServer, gql } = require('apollo-server')
const fs = require('fs')
const authors = require("./data/authors")
const books = require("./data/books")

const typeDefs = fs.readFileSync('./typeDefs.graphql', 'UTF-8')

// const resolvers = require('./resolvers')
// const Query = require("./resolvers/Query");

const resolvers = {
    Query: {
        allAuthors: (parent, args, context, info) => {
            return authors
        },

        author(parent, args, context, info) {
            return authors.find(author => author.id === args.id);
        },

        allBooks: (parent, args, context, info) => {
            return books
        },

        book(parent, args, context, info) {
            return books.find(book => book.id === args.id);
        },
    },

    Author: {
        books(parent, args, context, info) {
            return books.filter(book => book.author === parent.id);
        },
    },

    Book: {
        author(parent, args, context, info) {
            let result = authors.filter(author => author.id === parent.author);

            //here we have to return a individual Author instead of a list.
            return result[0];
        },
    },    
};


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