import { GraphQLServer, PubSub } from 'graphql-yoga';
import { formatError } from 'apollo-errors';
import * as jwt from 'express-jwt';
import * as faker from 'faker/locale/en';
import * as compression from 'compression';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

const { JWT_SECRET = 'bufb73f3f084f3487f7803fn30f34bf0n3fb3f83' } = process.env;

const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: ({ request }: any) => ({
    jwtSecret: JWT_SECRET,
    faker,
    pubsub,
    user: request.user
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
  playground: '/'
};

server.start(options, ({ port }) =>
  console.log(`Server is running on PORT: ${port}`)
);
