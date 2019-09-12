# SCV Prototype (api)

A simple JSON API for SCV.

## POST `/auth`

Allows a client to obtain a JWT bearer token, which can be used to make API requests.

### Resource URL

`http://localhost:8080/auth`

### Example request

`$ curl -X POST -H 'Content-Type: application/json' -d '{"username":"user","password":"password"}' http://localhost:8080/auth`

```bash
POST /auth
Content-Type: application/json
Host: localhost:8080
content-length: 41
{"username":"user","password":"password"}
```

### Example response

```bash
HTTP/1.1 200
status: 200
Content-Type: application/json;charset=UTF-8

{"tokenType":"bearer","accessToken":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyIiwiaXNzIjoic2N2LXByb3RvdHlwZS1hcGkiLCJleHAiOjE1Njg3MjEzMjMsImF1dGhvcml0aWVzIjpbIlJPTEVfQVBJIl19.MNbwpFb2dq46J28toaRvvzFJu0W8e0Rx2JnfVi1tT862KmOftfvnAKH-cYEEIBsOAHGlv3TazE24xcWYhJ9N-w"}
```

## POST `/api/greetings`

Fetches all greetings from the API. Requires a JWT bearer token in the request header.

### Resource URL

`http://localhost:8080/api/greetings`

### Example request

`$ curl -X GET -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyIiwiaXNzIjoic2N2LXByb3RvdHlwZS1hcGkiLCJleHAiOjE1Njg3MjEzMjMsImF1dGhvcml0aWVzIjpbIlJPTEVfQVBJIl19.MNbwpFb2dq46J28toaRvvzFJu0W8e0Rx2JnfVi1tT862KmOftfvnAKH-cYEEIBsOAHGlv3TazE24xcWYhJ9N-w' http://localhost:8080/api/greetings`

```bash
GET /api/greetings
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyIiwiaXNzIjoic2N2LXByb3RvdHlwZS1hcGkiLCJleHAiOjE1Njg3MjEzMjMsImF1dGhvcml0aWVzIjpbIlJPTEVfQVBJIl19.MNbwpFb2dq46J28toaRvvzFJu0W8e0Rx2JnfVi1tT862KmOftfvnAKH-cYEEIBsOAHGlv3TazE24xcWYhJ9N-w
Host: localhost:8080
```

### Example response

```bash
HTTP/1.1 200
status: 200
Content-Type: application/json;charset=UTF-8

[{"message":"Hello, world!"}]
```
