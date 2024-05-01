const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Subject extends Model {}

Subject.init({
  subject_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Subject',
  tableName: 'subjects',
  timestamps: false
});

module.exports = Subject;
