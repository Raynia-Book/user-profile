import { sequelize } from "../../database";
import { DataTypes } from "sequelize";

export const User = sequelize.define(
    "Users",
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        img: {
            type: DataTypes.TEXT,
        },
        name: {
            type: DataTypes.STRING,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        isPublisher: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {paranoid: true}
)