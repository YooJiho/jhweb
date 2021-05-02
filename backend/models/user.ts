import { Sequelize, DataTypes, Model } from 'sequelize'
import { sequelize } from './index'

interface UserAttributes {
    userId: string,
    password: string,
    nickname: string
}

class User extends Model<UserAttributes> {
    public readonly id!: number
    public userId!: string
    public password!: string
    public nickname!: string
    public readonly createAt!: Date
    public readonly updateAt!: Date
}

User.init(
    {
        userId: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        nickname: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'user',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    }
)

export default User