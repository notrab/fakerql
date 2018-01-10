# FakerQL

The idea is to have an endpoint that can be used independently or via schema stitching.

The following Queries are possible...

* `User(id: "<ANY_STRING_HERE>")`
* `Product(id: "<ANY_STRING_HERE>")`

The following Mutations are possible...

* `register(email: "<ANY_STRING_HERE>", password: "<ANY_STRING_HERE>", expiresIn: "2d")`
* `token(email: "<ANY_STRING_HERE>", password: "<ANY_STRING_HERE>", expiresIn: "2d")`

These both return a token including the email passed in as arguments. The token uses `jsonwebtoken` and `expiresIn` is completely optional and ultimately pointless.

_More docs to follow._
