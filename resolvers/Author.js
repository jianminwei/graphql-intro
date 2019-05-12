module.exports = {
    books(parent, args, context, info) {
        return books.filter(book => book.author === parent.id);
    },
}