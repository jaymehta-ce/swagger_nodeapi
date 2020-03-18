# swagger_nodeapi

In this demo, I have created an authentication with JSON Web Tokens. I have sent the jwt with every request, meaning that we don’t rely on sessions, but simply put the token on every request we make to the API. This way we don’t have to worry about cookies, but we can save it in localStorage or other places on the frontend. I have used passport-jwt with express framework.

# passport-jwt

A Passport strategy for authenticating with a JSON Web Token.
This module lets you authenticate endpoints using a JSON web token. It is intended to be used to secure RESTful endpoints without sessions.

Created below routes for token:
1. Creating a /login route to acquire a token
(If a user has been found and the password is correct, we set the payload for the JWT to {id: user.id} we use the jsonwebtoken package to create the token and respond with it. If the password entered is wrong then appropriate message is displayed to the user.)
2. Creating a /secret route, that only is available to logged in users with a JSON web token
(Use the token to be able to access some kind of secret information. In /secret route, we pass the request through previously defined authentication strategy and run it. If it’s successful, then display the secret message, else the request will be unauthorized (401).)
