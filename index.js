const express = require('express');
const { createServer } = require('http');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { formatError } = require('apollo-errors');
const cors = require('cors');
const jwt = require('express-jwt');
const faker = require('faker/locale/en');
const compression = require('compression');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');

const typeDefs = require('./server/typeDefs');
const resolvers = require('./server/resolvers');
const initQuery = require('./server/initQuery');
const { sslRedirect } = require('./server/utils');

const {
  PORT = 5000,
  JWT_SECRET = 'bufb73f3f084f3487f7803fn30f34bf0n3fb3f83'
} = process.env;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const app = express();
const server = createServer(app);
const isDeveloping = app.get('env') === 'development';

if (!isDeveloping) {
  app.disable('x-powered-by');
  app.use(compression());
}

app.use(cors());

app.use(
  '/graphql',
  jwt({
    secret: JWT_SECRET,
    credentialsRequired: false
  }),
  bodyParser.json(),
  graphqlExpress(req => ({
    formatError,
    schema,
    context: {
      jwtSecret: JWT_SECRET,
      faker,
      user: req.user
    }
  }))
);

app.get(
  '/',
  graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`,
    query: initQuery
  })
);

server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);

  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema
    },
    {
      server,
      path: '/subscriptions'
    }
  );
});
