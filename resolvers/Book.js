module.exports = {
    author(parent, args, context, info) {
        let result = authors.filter(author => author.id === parent.author);

        //here we have to return a individual Author instead of a list.
        return result[0];
    },
}