const { sequelize, dataTypes } = require('./config')

const Boxposition = sequelize.define('boxposition', {
  BoxID: {
    type: dataTypes.INTEGER,
    primaryKey: true
  },
  BoxPosition: dataTypes.STRING
}, {
  tableName: 'boxposition',
  timestamps: false
})

module.exports = Boxposition
