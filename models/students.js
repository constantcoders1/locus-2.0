// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
var bcrypt = require("bcrypt-nodejs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define("Student", {
    // timestamps: false,
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false,
  	}, 
	username: {
	   type: DataTypes.STRING,
	   allowNull: false,
	},
  longitude: {
    type: DataTypes.STRING,
  },
  latitude: {
    type: DataTypes.STRING,
  },
	country: {
		type: DataTypes.STRING,
	    allowNull: true,
	},
	state: {
	  	type: DataTypes.STRING,
	},
	city: {
	    type: DataTypes.STRING,
	    allowNull: true,
	},
  }, {
    // Creating a custom method for our User model. This will check if an unhashed password entered by
    // The user can be compared to the hashed password stored in our database
    instanceMethods: {
      validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      }
    },
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    
    validate: {
    	statesUS:  function() {
    		if (this.country == "United States of America" && this.state.trim() == "") {
    			throw new Error("In the US state is required")
    		}
    	},
    },

    hooks: {
      beforeCreate: function(user, options, cb) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
        cb(null, options);
      }
    }
  });
  return Student;

};
