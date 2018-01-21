# FakerQL

FakerQL was created for frontend developers and GraphQL powered apps. Whether you're getting started with a new project or learning Relay/Apollo, you can forget about building a custom server and rely on [Faker.js](https://github.com/marak/Faker.js) to provide some goodies!

## Give it a try

You can head over to [GraphiQL](https://fakerql.com) to send some example queries and mutations.

## Queries

#### Get authorised user

You can request the logged in user provided you pass a valid `Authorization` header with a signed `JWT`. This can be done using the `register`/`login` mutations.

```graphql
# me

{
  me {
    id
    firstName
    lastName
    email
    avatar
  }
}
```

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
# User(id: String!)

{
  allUsers(id: "wk0z1j1tzj7xc0116is3ckdrx") {
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
  allProduct(id: "cjbrygtdz3e480147hv8ozt40") {
    id
    name
    price
  }
}
```

#### Get a list of todos

You can request a list of todos. `count` is optional and defaults to 25.

```graphql
# allTodos(count: Int)

{
  allTodos(count: 5) {
    id
    title
    completed
  }
}
```

#### Get a Todo

You can request a single Todo by providing any ID.

```graphql
# Todo(id: String!)

{
  Todo(id: "cjbrygq0u3e4301476mfqoaae") {
    id
    title
    completed
  }
}
```

#### Get a list of posts

You can request a list of posts. `count` is optional and defaults to 25.

```graphql
# allPosts(count: Int)

{
  allPosts(count: 5) {
    id
    title
    body
    published
    createdAt
    author {
      id
      firstName
      lastName
      avatar
    }
  }
}
```

#### Get a Post

You can request a single Post by providing any ID.

```graphql
# Post(id: String!)

{
  Post(id: "cjbryfb1x3e3c0147f4f4110o") {
    id
    title
    body
    published
    createdAt
    author {
      id
      firstName
      lastName
      avatar
    }
  }
}
```

## Mutations

#### Register user

Registering a User returns a random signed JWT. `expiresIn` is optional and pretty much pointless right now.

```graphql
# register(email: String!, password: String!, expiresIn: String)

mutation {
  register(email: "hi@jamiebarton.co.uk", password: "F4K3rqL!", expiresIn: '24h') {
    token
  }
}
```

#### Login user

Logging in a User returns a random signed JWT. `expiresIn` is optional and pretty much pointless right now.

```graphql
# login(email: String!, password: String!, expiresIn: String)

mutation {
  login(email: "hi@jamiebarton.co.uk", password: "F4K3rqL!") {
    token
  }
}
```

#### Updating user

This mutation returns the updated data you passed in to update.

```graphql
# updateUser(id: ID!, email: String!, firstName: String, lastName: String)

mutation {
  updateUser(id: "wk0z1j1tzj7xc0116is3ckdrx", firstName: "Jim") {
    id
    firstName
    lastName
  }
}
```

➡️ You must specify the header `Authorization: Bearer token` to satisfy this mutation.

#### Create Todo

This mutation returns the data you sent arguments + a fake ID.

```graphql
# createTodo(title: String!, completed: Boolean)

mutation {
  createTodo(title: "Book movie tickets") {
    id
    title
    completed
  }
}
```

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

request('https://fakerql.com/graphql', query).then(data => console.log(data));
```

## Todo

* Subscriptions
* Custom directives
