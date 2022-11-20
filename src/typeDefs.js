const { gql } = require('apollo-server')

module.exports = gql`
  type Query {
    getUsers: [User]
  }
  type Mutation {
    createUser(RegisterInput: RegisterInput!): User
    loginUser(LoginInput: LoginInput!): User
  }
  type User {
    username: String!
    password: String
    email: String!
    token:String
    status:String
  }
  input RegisterInput {
    username: String!
    password: String!
    email: String!
  }
  input LoginInput {
    email: String!
    password: String!
  }
`;