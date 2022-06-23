const sequelize = require("../confiq/db");
var initModels = require("../models/init-models");
var models = initModels(sequelize);
const UserType = require("./TypeDefs/UserType");
const graphql = require("graphql");
const {GraphQLObjectType,GraphQLList,GraphQLInt ,GraphQLString} = graphql;

module.exports = new GraphQLObjectType({
    name : "RootQueryType",
    fields : {
        getAllCustomers :{
            type : new GraphQLList(UserType.customer),
            args: {idcustomer : {type : GraphQLInt}},
            async resolve(parent,args){
                let userData;
                await models.customer.findAll().then(result =>{
                        userData =  result;
                    })
                return userData;
            }
        },
        getAllCampaigns :{
            type : new GraphQLList(UserType.campaign),
            args: {idcampaign : {type : GraphQLInt}},
            async resolve(parent,args){
                let userData;
                await models.campaign.findAll()
                .then(result =>{
                        userData =  result;
                    })
                return userData;
            }
        } 
    }
});