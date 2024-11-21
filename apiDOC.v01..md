# DogWatch - REST API #1

## API Reference v.0.1

### Login

```http
  POST /api/v1/login
```

```http
  Content-type: application/json
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `username` | `email`  | **Required** |
| `password` | `string` | **Required** |

Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
  "userId": "005e37d5-c9bd-4978-809e-97f2d3f45b22",
  "role": "sitter"
}
```

### Register

```http
  POST /api/v1/register
```

```http
  Content-type: application/json
```

| Parameter   | Type     | Description                                                        |
| :---------- | :------- | :----------------------------------------------------------------- |
| `firstName` | `string` | **Required, min length 3 max length 100**                          |
| `lastName`  | `string` | **Required, min length 3 max length 100**                          |
| `email`     | `email`  | **Required, email, must be unique**                                |
| `password`  | `string` | **Required, min length 8 characters, at least one capital letter** |
| `role`      | `string` | **Required, must be one of the following 'owner', 'sitter'**       |
| `location`  | `string` | **Required**                                                       |

Response:

```json
{
  "message": "Register success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
  "userId": "124324345",
  "role": "sitter"
}
```

### Update user information

```http
  PUT /api/v1/users/:id
```

```http
  Authorization: Bearer token
```

```http
  Content-type: multipart/form-data
```

| Parameter                                    | Type     | Description                                    |
| :------------------------------------------- | :------- | :--------------------------------------------- |
| `firstName`                                  | `string` | **Not Required, min length 3 max length 100**  |
| `lastName`                                   | `string` | **Not Required, min length 3 max length 100**  |
| `email`                                      | `email`  | **Not Required, email, must be unique**        |
| `headline`                                   | `text`   | **Not Required, min length 4 max length 150**  |
| `description`                                | `text  ` | **Not Required, min length 4 max length 1000** |
| `avatar`                                     | `file`   | **Not Required, jpg, png**                     |
| `At least one of the field value is changed` |

Response:

```json
{
  "message": "User updated"
}
```

### Changing password

```http
  PATCH /api/v1/users/:id
```

```http
  Authorization: Bearer token
```

```http
  Content-type: application/json
```

| Parameter         | Type     | Description                                   |
| :---------------- | :------- | :-------------------------------------------- |
| `currentPassword` | `string` | **Not Required, min length 3 max length 100** |
| `newPassword`     | `string` | **Not Required, min length 3 max length 100** |

Response:

```json
{
  "message": "Password is updated"
}
```

### Get all sitters

```http
  GET /api/v1/sitters
```

Response:

```json
[
  {
    "uuid": "005e37d5-c9bd-4978-809e-97f2d3f45b22",
    "firstName": "test",
    "lastName": "user",
    "email": "email3@gmail.fi",
    "role": "sitter",
    "location": "helsinki",
    "avatar": "632795a20956ba431aa72b82c5b67771",
    "headline": null,
    "description": null,
    "createdAt": "2024-11-18T12:00:58.000Z",
    "updatedAt": "2024-11-19T10:53:22.000Z"
  }
]
```

### Get one user

```http
  GET /api/v1/users/:id
```

| Parameter | Type  | Description                        |
| :-------- | :---- | :--------------------------------- |
| `id`      | `int` | **Required, Id of user to fetch**. |

Response:

```json
{
  "uuid": "005e37d5-c9bd-4978-809e-97f2d3f45b22",
  "firstName": "test",
  "lastName": "user",
  "email": "email3@gmail.fi",
  "role": "sitter",
  "location": "helsinki",
  "avatar": "3b255b3cc88ec2be4bf643390968f612",
  "headline": null,
  "description": null,
  "createdAt": "2024-11-18T12:00:58.000Z",
  "updatedAt": "2024-11-21T04:07:36.000Z",
  "receivedReviews": [],
  "services": []
}
```

### Search for sitters

```http
  POST /api/v1/search
```

```http
  Content-type: application/json
```

| Parameter   | Type     | Description  |
| :---------- | :------- | :----------- |
| `serviceId` | `string` | **Required** |
| `location`  | `string` | **Required** |
| `rating`    | `number` | **Required** |

Response:

```json
[
  {
    "uuid": "005e37d5-c9bd-4978-809e-97f2d3f45b22",
    "firstName": "test",
    "lastName": "user",
    "email": "email3@gmail.fi",
    "role": "sitter",
    "location": "helsinki",
    "avatar": "632795a20956ba431aa72b82c5b67771",
    "headline": null,
    "description": null,
    "createdAt": "2024-11-18T12:00:58.000Z",
    "updatedAt": "2024-11-19T10:53:22.000Z"
  }
]
```

### Get all services

```http
  GET /api/v1/services
```

Response:

```json
[
  {
    "uuid": "6337cdc7-d0ca-4a0d-a34b-f7a26adf42ce",
    "name": "Boarding",
    "createdAt": "2024-11-18T07:18:06.000Z",
    "updatedAt": "2024-11-18T07:18:06.000Z"
  }
]
```

### Update a sitter's provided services

```http
  POST /api/v1/users/:id/services
```

```http
  Content-type: application/json
```

| Parameter   | Type              | Description                      |
| :---------- | :---------------- | :------------------------------- |
| `services ` | `array of string` | **Required, list of service id** |

Response:

```json
{
  "message": "Service updated successfully"
}
```

### Get all of log in user 's booking

```http
  GET /api/v1/bookings
```

```http
  Authorization: Bearer token
```

Response:

```json
[
  {
    "uuid": "6337cdc7-d0ca-4a0d-a34b-f7a26adf42ce",
    "name": "Boarding",
    "createdAt": "2024-11-18T07:18:06.000Z",
    "updatedAt": "2024-11-18T07:18:06.000Z"
  }
]
```

### Create a booking request (owner only)

```http
  POST /api/v1/bookings
```

```http
  Authorization: Bearer token
```

```http
  Content-type: application/json
```

| Parameter    | Type     | Description  |
| :----------- | :------- | :----------- |
| `startDate ` | `date`   | **Required** |
| `endDate `   | `date`   | **Required** |
| `location `  | `string` | **Required** |
| `serviceId ` | `string` | **Required** |
| `sitterId `  | `string` | **Required** |

Response:

```json
[
  {
    "message": "Create booking successfully",
    "booking": {
      "uuid": "9a59aa3d-2e11-4a94-9e13-d689db3baab2",
      "status": "pending",
      "startDate": "2024-11-18T10:30:00.000Z",
      "endDate": "2024-11-18T12:30:00.000Z",
      "location": "helsinki",
      "serviceId": "6337cdc7-d0ca-4a0d-a34b-f7a26adf42ce",
      "sitterId": "005e37d5-c9bd-4978-809e-97f2d3f45b22",
      "ownerId": "1aa06859-2fd1-4801-8b7a-bf290ef1ce09",
      "updatedAt": "2024-11-21T06:27:19.632Z",
      "createdAt": "2024-11-21T06:27:19.632Z"
    }
  }
]
```

### Update booking status

#### Owner: Cancel the booking request

#### Sitter: Confirm or deny the booking request

```http
  PATCH /api/v1/bookings/:bookingId
```

```http
  Authorization: Bearer token
```

```http
  Content-type: application/json
```

| Parameter | Type     | Description                                                                  |
| :-------- | :------- | :--------------------------------------------------------------------------- |
| `status ` | `string` | **Required, One of following: 'confirmed','completed','denied','cancelled'** |

Response:

```json
[
  {
    "message": "Updated booking status successfully"
  }
]
```
