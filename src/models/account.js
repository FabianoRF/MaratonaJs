module.exports= (sequelize, DataTypes)=>{

    const Account= sequelize.define('Account', {
        email :{
            type: DataTypes.STRING,
            allowNull:false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    Account.prototype.toJSON = function(){//remove o camppo de senha para nap retornar no json a senha(por segurança)
        const values = {...this.get()}
        delete values.password
    }

    return Account
}