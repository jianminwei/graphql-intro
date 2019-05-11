const { ApolloServer, gql } = require('apollo-server')

const typeDefs = `
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Query {
    books: [Book!]!
    book (id: ID!): Book
   }
`;

const resolvers = {
    Query: {
        books(parent, args, context, info) {
            return books;
        },

        book: (parent, args, context, info) => {
            return books.find(b => b.id === args.id)
        }
    },
};

const books = [
    {
        id: "01",
        title: "GraphQA in Action",
        author: "Foo Bar"
    },
    {
        id: "02",
        title: "Learning React",
        author: "Foo Bar"
    },
    {
        id: "03",
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