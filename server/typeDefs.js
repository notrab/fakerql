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
    allUsers(count: Int): [User]
    User(id: ID!): User
    allProducts(count: Int): [Product]
    Product(id: ID!): Product
  }

  type Mutation {
    register(email: String!, password: String!, expiresIn: String): AuthPayload
    login(email: String!, password: String!, expiresIn: String): AuthPayload
    updateUser(id: ID!, email: String!, firstName: String, lastName: String): User
  }
`;
