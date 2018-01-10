module.exports = `
  type AuthPayload {
    token: String!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    avatar: String
  }

  type Product {
    id: ID!
    price: String!
    name: String!
  }

  type Query {
    allUsers(perPage: Int, page: Int): [User]
    User(id: ID!): User
    allProducts: [Product]
    Product(id: ID!): Product
  }

  type Mutation {
    register(email: String!, password: String!, expiresIn: String): AuthPayload
    login(email: String!, password: String!, expiresIn: String): AuthPayload
    updateUser(id: ID!, email: String!, firstName: String, lastName: String): User
  }
`;
