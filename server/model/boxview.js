const { sequelize, dataTypes } = require('./config')

const Boxview = sequelize.define('boxview', {
  BoxID: {
    type: dataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  BoxName: dataTypes.STRING,
  CreateTime: dataTypes.DATE,
  DestroyTime: dataTypes.DATE,
  Comment: dataTypes.STRING
}, {
  tableName: 'boxview',
  timestamps: false
})

module.exports = Boxview
