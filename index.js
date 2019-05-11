const { ApolloServer, gql } = require('apollo-server')

const typeDefs = `
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Author {
    id: ID!
    name: String!
  }

  type Query {
    books: [Book!]!
    Book (id: ID!): Book
    authors: [Author!]!
    Author(id: ID!): Author
   }
`;

const resolvers = {
    Query: {
        books(parent, args, context, info) {
            return books;
        },

        Book: (parent, args, context, info) => {
            return books.find(b => b.id === args.id)
        },

        authors(parent, args, context, info) {
            return authors;
        },

        Author: (parent, args, context, info) => {
            return authors.find(a => a.id === args.id)
        },
    },
};

const authors = [
    {
        id: "foo-bar",
        name: "Foo Bar"
    },
    {
        id: "jane-doe",
        name: "Jane Doe"
    },
    {
        id: "joe-shemoe",
        name: "Joe Shemoe"
    }       

];

const books = [
    {
        id: "01",
        title: "GraphQA in Action",
        author: "foo-bar"
    },
    {
        id: "02",
        title: "Learning React",
        author: "foo-bar"
    },
    {
        id: "03",
        title: "Learning JavaScript",
        author: "jane-doe"
    }         
]

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