const { Sequelize } = require('sequelize');

// Configure the database connection
const sequelize = new Sequelize('inventory', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
});

// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

module.exports = sequelize;
