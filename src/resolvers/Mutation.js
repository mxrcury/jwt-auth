// const jwt = require('jw')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Users = require("../models/Users")

const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"1h"})
}

const Mutation = {
    createUser: async (_,args) => {
        const { RegisterInput:{username,password,email} } = args
        const userExists = await Users.findOne({username, email})
        if(userExists){
            const error = new Error('User already exists',{cause:{status:400}})
            error.status = 400
            error.code = "USER_ALREADY_EXISTS"
            throw error
        }
        const hashedPassword = bcrypt.hashSync(password,6)

        await Users.create({username,password:hashedPassword,email})
        return {username,password:hashedPassword,email}
    },
    loginUser: async (_,args) => {
        const { LoginInput:{email,password} } = args
        const user = await Users.findOne({email})
        if(!user){
            const error = new Error('No user was found',{cause:{status:400}})
            error.status = 400
            error.code = "USER_NOT_FOUND"
            throw error
        }

        const isValidPassword = bcrypt.compareSync(password,user.password)
        if(!isValidPassword){
            const error = new Error('Invalid password',{cause:{status:400}})
            error.status = 400
            error.code = "INVALID_PASSWORD"
            throw error
        }

        const token = generateAccessToken(user._id)

        return {...user._doc,token, status:`You're logged in`}
    },
}


module.exports = Mutation