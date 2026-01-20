const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASS, 
    {
        host: process.env.DB_HOST,
        dialect: 'mysql', // Change to 'postgres' if needed
        logging: false
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database Connected Successfully');
        await sequelize.sync({ alter: true }); // Automatically creates/updates tables
    } catch (error) {
        console.error('❌ Database Connection Error:', error);
    }
};

module.exports = { sequelize, connectDB };