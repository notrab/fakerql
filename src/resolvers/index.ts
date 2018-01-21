import * as scuid from 'scuid';

import { generateAuthToken, getUserId } from '../utils';

const DEFAULT_COUNT = 25;

export default {
  Query: {
    me: (parent, args, ctx) => {
      const userId = getUserId(ctx);
      const { faker } = ctx;

      return {
        id: userId,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar()
      };
    },

    allUsers(parent, { count = DEFAULT_COUNT }, { faker }) {
      return new Array(count).fill(0).map(_ => ({
        id: scuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar()
      }));
    },

    User: (parent, { id }, { faker }) => ({
      id,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar()
    }),

    allProducts: (parent, { count = DEFAULT_COUNT }, { faker }) => {
      return new Array(count).fill(0).map(_ => ({
        id: scuid(),
        price: faker.commerce.price(),
        name: faker.commerce.productName()
      }));
    },

    Product: (parent, { id }, { faker }) => ({
      id,
      price: faker.commerce.price(),
      name: faker.commerce.productName()
    }),

    Todo: (parent, { id }, { faker }) => ({
      id,
      title: faker.random.words(),
      completed: faker.random.boolean()
    }),

    allTodos: (parent, { count = DEFAULT_COUNT }, { faker }) => {
      return new Array(count).fill(0).map(_ => ({
        id: scuid(),
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
        id: scuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar()
      }
    }),

    // refactor user relation into Class
    allPosts: (parent, { count }, { faker }) => {
      return new Array(count).fill(0).map(_ => ({
        id: scuid(),
        title: faker.random.words(),
        body: faker.lorem.sentences(),
        published: faker.random.boolean(),
        createdAt: faker.date.past(),
        author: {
          id: scuid(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
          avatar: faker.image.avatar()
        }
      }));
    }
  },

  Mutation: {
    register: async (
      parent,
      { email, password, expiresIn = '2d' },
      { jwtSecret },
      info
    ) => ({
      token: await generateAuthToken(
        { userId: scuid(), email },
        jwtSecret,
        expiresIn
      )
    }),

    login: async (
      parent,
      { email, password, expiresIn = '2d' },
      { jwtSecret },
      info
    ) => ({
      token: await generateAuthToken(
        { email, userId: scuid() },
        jwtSecret,
        expiresIn
      )
    }),

    updateUser: (parent, { id, firstName, lastName, email, avatar }, ctx) => {
      const userId = getUserId(ctx);
      const { faker } = ctx;

      return {
        id: userId,
        firstName: firstName === undefined ? faker.name.firstName() : firstName,
        lastName: lastName === undefined ? faker.name.lastName() : lastName,
        email: email === undefined ? faker.internet.email() : email,
        avatar: avatar === undefined ? faker.image.avatar() : avatar
      };
    },

    // No authentication for demo purposes
    createTodo: (parent, { title, completed }, { faker }) => {
      const id = scuid();

      // pubsub.publish('todoAdded', {
      //   todoAdded: {
      //     id,
      //     title,
      //     completed
      //   }
      // });

      return {
        id,
        title,
        completed: completed === undefined ? faker.random.boolean() : completed
      };
    }
  }

  // Subscription: {
  //   todoAdded: {
  //     subscribe: (parent, args, { pubsub }) => {
  //       // setInterval(
  //       //   () => pubsub.publish(channel, { counter: { count: count++ } }),
  //       //   2000
  //       // );
  //       //
  //       // return pubsub.asyncIterator({
  //       //   id: 'abc',
  //       //   title: 'Hello',
  //       //   completed: true
  //       // });
  //     }
  //   }
  // }
};
