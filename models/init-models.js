var DataTypes = require("sequelize").DataTypes;
var _campaign = require("./campaign");
var _client = require("./client");
var _customer = require("./customer");
var _customer_campaign = require("./customer_campaign");
var _district = require("./district");
var _state = require("./state");
var _tehsil = require("./tehsil");

function initModels(sequelize) {
  var campaign = _campaign(sequelize, DataTypes);
  var client = _client(sequelize, DataTypes);
  var customer = _customer(sequelize, DataTypes);
  var customer_campaign = _customer_campaign(sequelize, DataTypes);
  var district = _district(sequelize, DataTypes);
  var state = _state(sequelize, DataTypes);
  var tehsil = _tehsil(sequelize, DataTypes);


  return {
    campaign,
    client,
    customer,
    customer_campaign,
    district,
    state,
    tehsil,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
