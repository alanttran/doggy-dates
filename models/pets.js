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

	return Dogs;
}