const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Subject = require('./Subject');

class Attempt extends Model {}

Attempt.init({
  attempt_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  subject_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'subjects',
      key: 'subject_id'
    }
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'users',
      key: 'user_id'
    }
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Attempt',
  tableName: 'attempts',
  timestamps: false
});

Attempt.belongsTo(Subject, {
  foreignKey: 'subject_id',
  as: 'subjects'
});
module.exports = Attempt;
