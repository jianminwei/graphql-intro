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
    allAuthors: [Author!]!
    author(id: ID!): Author
    allBooks: [Book!]!
    book(id: ID!): Book
   }
`;

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
        title: "GraphQL in Action",
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