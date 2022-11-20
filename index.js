const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose') 
require('dotenv').config()

const typeDefs = require('./src/typeDefs')
const resolvers = require('./src/resolvers')

const port = process.env.PORT || 5000
const url = process.env.DB

mongoose.connect(url)

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen(port).then(({url})=>console.log(`Server is on ${url}`))