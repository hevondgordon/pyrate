# Pyrate

Pyrate is essentially a clone of Strapi.js, except it's written in python 😊

## Upcoming Features

- Management UI 🚧
- Automatic API Generation 🚧
- Authentication
- Authorization
- Session Management

## API Reference

By default there is a user service that will be used to manage the different users
of the sytem. The following endpoints are available by default

#### Get all users

```http
  GET /users/
```

| Parameter | Type     | Description  | Required |
| :-------- | :------- | :----------- | :------- |
| `api_key` | `string` | Your API key | false    |

#### Get single user

```http
  GET /users/1/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to fetch |

#### Create user

the user entity may contain more fields than those that are listed below -
those are just the defaults.

```http
  POST /users
```

| Parameter    | Type     | Description                       |
| :----------- | :------- | :-------------------------------- |
| `first_name` | `string` | **Required**. Id of user to fetch |
| `last_name`  | `string` | **Required**. Id of user to fetch |
| `email`      | `string` | **Required**. Id of user to fetch |
| `username`   | `string` | **Optional**. Id of user to fetch |
| `password`   | `string` | **Required**. Id of user to fetch |

#### Update user

the user entity may contain more fields than those that are listed below -
those are just the defaults.

```http
  PUT /users
```

| Parameter    | Type     | Description                       |
| :----------- | :------- | :-------------------------------- |
| `first_name` | `string` | **Required**. Id of user to fetch |
| `last_name`  | `string` | **Required**. Id of user to fetch |
| `email`      | `string` | **Required**. Id of user to fetch |
| `username`   | `string` | **Optional**. Id of user to fetch |
| `password`   | `string` | **Required**. Id of user to fetch |

#### Delete single user

```http
  DELETE /users/1/
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of user to delete |
