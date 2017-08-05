module.exports = function(sequelize, DataTypes) {
  var Facebook = sequelize.define("Facebook", {
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    appid: DataTypes.STRING,
    token: DataTypes.STRING,
    email: DataTypes.STRING,
    profileUrl: DataTypes.STRING
    
  });
  return Facebook;
};