const cuid = require('cuid');
const { generateAuthToken } = require('./utils');

module.exports = {
  Query: {
    allUsers(parent, args, { faker }) {
      return new Array(15).fill(0).map(_ => {
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

    allProducts(parent, args, { faker }) {
      return new Array(15).fill(0).map(_ => {
        return {
          id: cuid(),
          price: faker.commerce.price(),
          name: faker.commerce.productName()
        };
      });
    },

    Product(parent, { id }, { faker }, info) {
      return {
        id,
        price: faker.commerce.price(),
        name: faker.commerce.productName()
      };
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
    }
  }
};
