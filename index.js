const { ApolloServer, gql } = require('apollo-server')

const typeDefs = `
  type Book {
    title: String!
    author: String!
  }

  type Query {
    books: [Book!]!
  }
`;

const resolvers = {
    Query: {
        books(parent, args, context, info) {
            return books;
        },
    },
};

const books = [
    {
        title: "GraphQA in Action",
        author: "Foo Bar"
    },
    {
        title: "Learning React",
        author: "Foo Bar"
    },
    {
        title: "Learning JavaScript",
        author: "Jane Doe"
    }         
]

const context = { books }

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    engine: process.env.ENGINE_API_KEY ? true : false
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});