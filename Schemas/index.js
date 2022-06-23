const graphql = require("graphql");
const {GraphQLSchema} = graphql;

const RootQuery = require("./queryGraphQl");
const Mutation = require("./mutationGraphQl");

module.exports = new GraphQLSchema({query : RootQuery,mutation : Mutation})