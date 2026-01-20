const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Project = sequelize.define('Project', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    techStack: { type: DataTypes.STRING }, // e.g., "Node, Express, MySQL"
    link: { type: DataTypes.STRING }
});

module.exports = Project;