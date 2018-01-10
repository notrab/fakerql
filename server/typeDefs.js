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

  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
  }

  type Query {
    allUsers(count: Int): [User]
    User(id: ID!): User
    allProducts(count: Int): [Product]
    Product(id: ID!): Product
    Todo(id: ID!): Todo
    allTodos(count: Int): [Todo]
  }

  type Mutation {
    register(email: String!, password: String!, expiresIn: String): AuthPayload
    login(email: String!, password: String!, expiresIn: String): AuthPayload
    updateUser(id: ID!, email: String!, firstName: String, lastName: String): User
    createTodo(title: String!, completed: Boolean): Todo
  }
`;
