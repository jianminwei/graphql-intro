const { ApolloServer, gql } = require('apollo-server')

const typeDefs = `
  type Book {
    id: ID
    title: String
    author: Author
  }

  type Author {
    id: ID
    name: String
    books: [Book]
  }

  type Query {
    author(id: ID!): Author
   }
`;

const resolvers = {
    Query: {
        author(parent, args, context, info) {
            return authors.find(a => a.id = args.id);
        },
    },

    Author: {
        books(author) {
            return books.filter(book => book.author === author.id);
        },
    },

    Book: {
        author(book) {
            let result = authors.filter(a => a.id === book.author);
            return result[0];
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