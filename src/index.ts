import { GraphQLServer, PubSub } from 'graphql-yoga';
import { formatError } from 'apollo-errors';
import * as jwt from 'express-jwt';
import * as faker from 'faker/locale/en';
import * as compression from 'compression';

import resolvers from './resolvers';
import defaultPlaygroundQuery from './initQuery'

const { JWT_SECRET } = process.env;

const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    jwtSecret: JWT_SECRET,
    faker,
    pubsub
  })
});

server.express.disable('x-powered-by');

server.express.use(
  '/graphql',
  jwt({
    secret: JWT_SECRET,
    credentialsRequired: false
  })
);

server.express.use(compression());

const options = {
  formatError,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/',
  defaultPlaygroundQuery
};

server.start(options, ({ port }) =>
  console.log(`Server is running on PORT: ${port}`)
);
