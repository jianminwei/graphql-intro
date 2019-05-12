module.exports = {
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
}