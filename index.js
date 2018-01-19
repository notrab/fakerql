const { GraphQLServer, PubSub } = require('graphql-yoga');
const { formatError } = require('apollo-errors');
const jwt = require('express-jwt');
const faker = require('faker/locale/en');
const compression = require('compression');

const typeDefs = require('./server/typeDefs');
const resolvers = require('./server/resolvers');
const rootValue = require('./server/rootValue');

const { JWT_SECRET = 'bufb73f3f084f3487f7803fn30f34bf0n3fb3f83' } = process.env;

const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: ({ request }) => ({
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

const options = {
  formatError,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/'
};

server.start(options, ({ port }) =>
  console.log(`Server is running on PORT: ${port}`)
);
