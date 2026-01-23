// 1. Iyi mirongo ibiri niyo yari ibuze:
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Reba neza ko path ari iy'ukuri

// 2. Noneho hano 'sequelize' izaba imenyekanye
const Project = sequelize.define('Project', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.DECIMAL(10, 2) },
    imageUrl: { type: DataTypes.STRING }
});

module.exports = Project;