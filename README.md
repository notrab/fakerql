# FakerQL

FakerQL was created for frontend developers and GraphQL powered apps. Whether you're getting started with a new project or learning Relay/Apollo, you can forget about building a custom server and rely on [Faker.js](https://github.com/marak/Faker.js) to provide some goodies!

## Give it a try

You can head over to [GraphiQL](https://faker.com) to send some example queries and mutations.

### Queries

* `allUsers(count: Int)`
* `User(id: String!)`
* `allProducts(count: Int)`
* `Product(id: String!)`

### Mutations

* `register(email: String, password: String!)`
* `login(email: String, password: String!)`
* `updateUser(id: String, email: String!)`

## Example

The example below uses [graphql-request](https://github.com/graphcool/graphql-request).

```
import { request } from 'graphql-request'

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
}`

request('https://fakerql.com', query).then(data => console.log(data))
```

➡️ The mutations `register` and `login` return a JWT token that can be used for the `updateUser` mutation. You must specify the `Authorization` header with the Bearer token to satisfy the request.

## Todo

* Subscriptions
* Custom directives
