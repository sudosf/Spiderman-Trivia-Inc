const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Subject = require('./Subject');
const User = require('./User');

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

// Set up relations
Attempt.belongsTo(Subject, {
  foreignKey: 'subject_id',
  as: 'subjects'
});
Attempt.belongsTo(User, { foreignKey: 'user_id', as:'user'});
User.hasMany(Attempt, { foreignKey: 'user_id',as: 'attempts' });

module.exports = Attempt;
