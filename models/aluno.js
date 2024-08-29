const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Aluno = sequelize.define('aluno',{
    id:{type: DataTypes.INTEGER,primaryKey: true,
        autoincrement: true,
},
nome: {type: DataTypes.STRING(50),allowNull: false,
},
idade: { type: DataTypes.INTEGER,allowNUll: false,
},
},{tableName:'aluno', timestamps: false,
});
module.exports = Aluno;
