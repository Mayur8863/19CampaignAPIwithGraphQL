const sequelize = require("../confiq/db");
var initModels = require("../models/init-models");
var models = initModels(sequelize);
const UserType = require("./TypeDefs/UserType");
const graphql = require("graphql");
const {GraphQLObjectType,GraphQLInt ,GraphQLString} = graphql;

module.exports = new GraphQLObjectType({
    name : "Mutation",
    fields: {
        createCustomer:{
            type : UserType.customer,
            args:{
                first_name : {type : GraphQLString},
                last_name : {type : GraphQLString},
                phone_no : {type : GraphQLString},
                district : {type : GraphQLString},
                tehsil : {type : GraphQLString},
                state : {type : GraphQLString},
                campaign : {type : GraphQLString},
            },
            error :{
                message : "Updation failed"
            },
            async resolve(parent ,args){
                await models.customer.sync().then(result =>{
                    console.log("customer Sync done" );
                });
                
                const findCustomer = async () => await models.customer.findOne({where : {phone_no : args.phone_no}});
                await findCustomer().then(async (result) =>{
                        const tehsil = async() =>{
                            if(args.tehsil!='')
                                        {
                                            await models.tehsil.sync().then(result =>{
                                                console.log("tehsil Sync done" );
                                            });
                                            const tehsil = async ()=> await models.tehsil.create({
                                                tehsil_name : `${args.tehsil}`,
                                                tehsil_id : 1000
                                            })
                                            tehsil().then(result =>{
                                                console.log(`Success : ${result}`);
                                                })
                                                .catch(err =>{
                                                    console.log(`tehsil creation error : ${err}`);
                                                })
                                        }
                        }
                        const district = async () =>{
                            if(args.district!='')
                                        {
                                            await models.district.sync().then(result =>{
                                                console.log("district Sync done" );
                                            });
                                            const district = async ()=> await models.district.create({
                                                district_name : `${args.district}`,
                                                district_id : 10023
                                            })
                                            district().then(result =>{
                                                console.log(`Success : ${result}`);
                                                })
                                                .catch(err =>{
                                                    console.log(`District creation error : ${err}`);
                                                })
                                        }
                        }
                        const state = async () =>{
                                        if(args.state!='')
                                        {
                                            await models.state.sync().then(result =>{
                                                console.log("state Sync done" );
                                            });
                                            const state = async ()=> await models.state.create({
                                            state_name : `${args.state}`,
                                            state_id : 1001
                                            })
                                            state().then(result =>{
                                                console.log(`Success : ${result}`);
                                                })
                                                .catch(err =>{
                                                    console.log(`state creation error : ${err}`);
                                                })
                                        }
                        }
            
                        if(!result)
                            {
                                let idcustomer;
                                // Customer Creation
                                const customer = async ()=> await models.customer.create({
                                    name : `${args.first_name}  ${args.last_name}`,
                                    first_name: `${args.first_name}`,
                                    last_name: `${args.last_name}`,
                                    phone_no: `${args.phone_no}`,
                                    district: `${args.district}`,
                                    tehsil : `${args.tehsil}`,
                                    state: `${args.state}`,
                                    })
                                    
                                    await customer().then(result =>{
                                        idcustomer = result.idcustomer;
                                        console.log(result);
                                    })
                                    .catch(err =>{
                                        console.log(`customer creation error : ${err}`);
                                    })
            
                                    // State , Tehsil , District Update
                                    await state();
                                    await district();
                                    await  tehsil();
            
                                        // Customer Campaign Table
                                        const findCampaign = async () => await models.campaign.findOne({where : {name : args.campaign}});
                                        findCampaign().then(async (result) =>{
                                            if(result)
                                                {
                                                    await models.customer_campaign.sync().then(result =>{
                                                        console.log("customer Sync done" );
                                                    });
                                                    const customer_campaign= async ()=> await models.customer_campaign.create({
                                                        idcustomer : idcustomer,
                                                        idcampaign : result.idcampaign
                                                    })
                                                        
                                                    customer_campaign().then(result =>{
                                                        console.log(`customer_campaign Creation Success : ${result}`);
                                                    })
                                                    .catch(err =>{
                                                        console.log(`customer_campaign creation error : ${err}`);
                                                    })
                                                }
                                        })
                                        .catch(err =>{
                                            console.log(`Error in finding Campaign ${err}`);
                                        })
                            }
                        else{
                            // console.log("ee");
                            const customer = async ()=> await models.customer.update(
                                {
                                    name : `${args.first_name}  ${args.last_name}`,
                                    first_name: `${args.first_name}`,
                                    last_name: `${args.last_name}`,
                                    district: `${args.district}`,
                                    tehsil : `${args.tehsil}`,
                                    state: `${args.state}`,
                                },
                                {where : {idcustomer : result.idcustomer}}
                                )
                                
                                await customer().then(result =>{
                                    Updated = result;
                                    console.log(`Customer Updation Success : ${result}`);
                                })
                                .catch(err =>{
                                    console.log(`Customer Updation Error : ${err}`);
                                })
            
                                // State , Tehsil , District Update
                                if(!result.tehsil) await tehsil();
                                if(!result.state) await state();
                                if(!result.district) await district();
                        }
                        })
                        .catch(err =>{
                            console.log(`Error in finding Customer ${err}`);
                        })
                
                return args;
            }
        },
        // Create Campaign
        createCampaign:{
            type : UserType.campaign,
            args:{
                name : {type : GraphQLString},
                description : {type : GraphQLString},
                start_date : {type : GraphQLString},
                end_date : {type : GraphQLString}
            },
            resolve(parent ,args){
                const createCampaign = async () => await models.campaign.create({
                    name : args.name,
                    description : args.description,
                    start_date : args.start_date,
                    end_date : args.end_date
                })
                createCampaign().then(result =>{
                    console.log(`Sucess Campaign Creation ${result}`);
                })
                .catch(err =>{
                    console.log(`Err Campaign Creation ${err}`);
                })
                return args;
            }
        },
    }
});