'use strict';
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define('comment', {
    content: DataTypes.TEXT,
    userID: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.comment.belongsTo(models.user, {foreignKey: 'userID'});
      }
    }
  });
  return comment;
};