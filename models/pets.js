module.exports = function(sequelize, DataTypes) {
	var Dogs =  sequelize.define("Dogs", {
		dog_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isUrl: true
			}
		},
		// zip_code: {
        //     type: DataTypes.INTEGER,
        //     validate: {
        //         len: [5,5]
        //     }
        // },
		energy_level: {
			type: DataTypes.STRING	
		},
		sex: {
			type: DataTypes.STRING
		},
		size: {
			type: DataTypes.STRING
		},
		dob: {
			type: DataTypes.DATEONLY
		}
	});


	Dogs.associate = function(models) {
	// We're saying that a Post should belong to an Author
	// A Post can't be created without an Author due to the foreign key constraint
		Dogs.belongsTo(models.User, {
		  foreignKey: {
		    allowNull: false
		  }
		});
	};

	return Dogs;
}