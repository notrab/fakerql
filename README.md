# FakerQL

FakerQL was created for frontend developers and GraphQL powered apps. Whether you're getting started with a new project or learning Relay/Apollo, you can forget about building a custom server and rely on [Faker.js](https://github.com/marak/Faker.js) to provide some goodies!

## Give it a try

You can head over to [GraphiQL](https://fakerql.com) to send some example queries and mutations.

## Queries

#### Get a list of users

You can request a list of users. `count` is optional and defaults to 25.

```graphql
# allUsers(count: Int)

{
  allUsers(count: 5) {
    id
    firstName
    lastName
    email
    avatar
  }
}
```

#### Get a User

You can request a single User by providing any ID.

```graphql
# allUsers(count: Int)

{
  allUsers(count: 5) {
    id
    firstName
    lastName
    email
    avatar
  }
}
```

#### Get a list of products

You can request a list of products. `count` is optional and defaults to 25.

```graphql
# allProducts(count: Int)

{
  allProducts(count: 5) {
    id
    name
    price
  }
}
```

#### Get a Product

You can request a single Product by providing any ID.

```graphql
# Product(id: String!)

{
  allProducts(count: 10) {
    id
    name
    price
  }
}
```

## Mutations

#### Register user

Registering a User returns a random signed JWT. `expiresIn` is optional and pretty much pointless right now.

```graphql
# register(email: String!, password: String!, expiresIn: String)

{
  register(email: "hi@jamiebarton.co.uk", password: "F4K3rqL!", expiresIn: '24h') {
    token
  }
}
```

#### Login user

Logging in a User returns a random signed JWT. `expiresIn` is optional and pretty much pointless right now.

```graphql
# login(email: String!, password: String!, expiresIn: String)

{
  login(email: "hi@jamiebarton.co.uk", password: "F4K3rqL!") {
    token
  }
}
```

#### WIP: Updating user

This mutation returns the updated data you passed in to update.

```graphql
# updateUser(id: ID!, email: String!, firstName: String, lastName: String)

{
  updateUser(id: "wk0z1j1tzj7xc0116is3ckdrx", firstName: "Jim") {
    id
    firstName
    lastName
  }
}
```

➡️ You must specify the header `Authorization: Bearer token` to satisfy this mutation.

## Subscriptions

_Coming soon._

## Client side library example

The example below uses [graphql-request](https://github.com/graphcool/graphql-request).

```js
import { request } from 'graphql-request';

const query = `{
  products: allProducts(count: 25) {
    id
    name
    price
  }

  user: User(id: "wk0z1j1tzj7xc0116is3ckdrx") {
    id
    firstName
    lastName
    email
    avatar
  }
}`;

request('https://fakerql.com', query).then(data => console.log(data));
```

## Todo

* Subscriptions
* Custom directives
