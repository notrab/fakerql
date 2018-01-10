const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { formatError } = require('apollo-errors');
const cors = require('cors');
const jwt = require('express-jwt');
const faker = require('faker/locale/en');
const casual = require('casual');
const compression = require('compression');

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
      casual,
      user: req.user
    }
  }))
);

app.get(
  '/',
  graphiqlExpress({
    endpointURL: '/graphql',
    query: initQuery
  })
);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
