// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
//var bcrypt = require("bcrypt-nodejs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var Fieldnote = sequelize.define("Fieldnote", {
    // The email cannot be null, and must be a proper email before creation
    title: {
      type: DataTypes.STRING,
      // allowNull: false,
      
    },
    doctype: {
      type: DataTypes.STRING,
      // allowNull: false,
      
    },
    // The password cannot be null
    doclink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notedate: {
      type: DataTypes.DATETIME,
      allowNull: false,
    }
  }, {
    // Creating a custom method for our User model. This will check if an unhashed password entered by
    // The user can be compared to the hashed password stored in our database
    /*instanceMethods: {
      validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      }
    },
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    hooks: {
      beforeCreate: function(user, options, cb) {
        teacher.password = bcrypt.hashSync(teacher.password, bcrypt.genSaltSync(10), null);
        cb(null, options);
      }
    }*/
  });
  return Fieldnote;

};
