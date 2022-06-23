const Sequelize = require('sequelize');
module.exports = new Sequelize('campaign','root','root',{
    host : 'localhost',
    dialect : 'mysql'
});
