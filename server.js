// sequelize-auto -o "./models" -d campaign -h localhost -u root -p 3306 -x root -e mysql -t customer
const http = require("http");
const express = require("express");
const app  =express();
const {graphqlHTTP} = require("express-graphql");
app.use(express.json());

// const dataInsertion = require("./controllers/dataInsertion");
// dataInsertion();

const schema = require("./Schemas");

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))


const server = http.createServer(app);
server.listen(3000,)