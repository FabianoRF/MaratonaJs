module.exports= (sequelize, DataTypes)=>{

    const Account= sequelize.define('Account', {
        email :{
            type: DataTypes.STRING,
            allowNull:false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        jwtVersion:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    })

    Account.associate = (models) =>{
        Account.hasMany(models.Link, {foreignKey: 'accountId'})//um usuario tem muitos(hasMany) links
    }

    Account.prototype.toJSON = function() {//remove o campo de senha para nap retornar no json a senha(por segurança)
        const values = {...this.get()}
        delete values.password
        return values
    }

    return Account
}