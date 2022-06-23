const graphql = require("graphql");
const {GraphQLObjectType,GraphQLInt ,GraphQLString} = graphql;

const customer = new GraphQLObjectType({
    name : "Customer",
    fields: ()=>({
        idcustomer : {type:GraphQLInt},
        name : {type : GraphQLString},
        first_name : {type : GraphQLString},
        last_name : {type : GraphQLString},
        phone_no : {type : GraphQLString},
        district : {type : GraphQLString},
        tehsil : {type : GraphQLString},
        state : {type : GraphQLString},
        campaign : {type : GraphQLString}
    })
})

const campaign = new GraphQLObjectType({
    name : "Campaign",
    fields: ()=>({
        idcampaign : {type:GraphQLInt},
        name : {type : GraphQLString},
        description : {type : GraphQLString},
        start_date : {type : GraphQLString},
        end_date : {type : GraphQLString}
    })
})

module.exports= {
    customer : customer,
    campaign : campaign
}