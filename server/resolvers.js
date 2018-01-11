const cuid = require('cuid');
const { generateAuthToken } = require('./utils');

const DEFAULT_COUNT = 25;

module.exports = {
  Query: {
    allUsers(parent, { count = DEFAULT_COUNT }, { faker }) {
      return new Array(count).fill(0).map(_ => {
        return {
          id: cuid(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
          avatar: faker.image.avatar()
        };
      });
    },

    User(parent, { id }, { faker }) {
      return {
        id,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar()
      };
    },

    allProducts(parent, { count = DEFAULT_COUNT }, { faker }) {
      return new Array(count).fill(0).map(_ => {
        return {
          id: cuid(),
          price: faker.commerce.price(),
          name: faker.commerce.productName()
        };
      });
    },

    Product(parent, { id }, { faker }) {
      return {
        id,
        price: faker.commerce.price(),
        name: faker.commerce.productName()
      };
    },

    Todo: (parent, { id }, { faker }) => ({
      id,
      title: faker.random.words(),
      completed: faker.random.boolean()
    }),

    allTodos: (parent, { count }, { faker }) => {
      return new Array(count).fill(0).map(_ => ({
        id: cuid(),
        title: faker.random.words(),
        completed: faker.random.boolean()
      }));
    },

    // refactor user relation into Class
    Post: (parent, { id }, { faker }) => ({
      id,
      title: faker.random.words(),
      body: faker.lorem.paragraphs(),
      published: faker.random.boolean(),
      createdAt: faker.date.past(),
      author: {
        id: cuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar()
      }
    }),

    // refactor user relation into Class
    allPosts: (parent, { count }, { faker }) => {
      return new Array(count).fill(0).map(_ => ({
        id: cuid(),
        title: faker.random.words(),
        body: faker.lorem.sentences(),
        published: faker.random.boolean(),
        createdAt: faker.date.past(),
        author: {
          id: cuid(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
          avatar: faker.image.avatar()
        }
      }));
    }
  },

  Mutation: {
    async register(
      parent,
      { email, password, expiresIn = '2d' },
      { jwtSecret },
      info
    ) {
      const token = await generateAuthToken({ email }, jwtSecret, expiresIn);

      return {
        token
      };
    },

    async login(
      parent,
      { email, password, expiresIn = '2d' },
      { jwtSecret },
      info
    ) {
      const token = await generateAuthToken({ email }, jwtSecret, expiresIn);

      return {
        token
      };
    },

    updateUser(parent, { id, firstName, lastName, email }, { user }) {
      if (!user) {
        throw new Error('You must be logged into do that.');
      }

      return {
        id,
        firstName,
        lastName,
        email
      };
    },

    createTodo: (parent, { title, completed }, { faker }) => ({
      id: cuid(),
      title,
      completed: completed === undefined ? faker.random.boolean() : completed
    })
  }
};
