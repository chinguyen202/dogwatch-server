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
    "uuid": "07e59a6d-54cd-4795-8b20-76a159ce7ba6",
    "firstName": "Alina",
    "lastName": "Johnson",
    "email": "alina.johnson@example.com",
    "role": "sitter",
    "location": "Helsinki",
    "avatar": null,
    "headline": "A part-time veterinary science student with a passion for animal care",
    "description": "Hi! I’m Alina. ",
    "createdAt": "2024-11-27T18:30:47.000Z",
    "updatedAt": "2024-11-27T18:30:47.000Z",
    "receivedReviews": [
      {
        "uuid": "5a53e856-1b19-4ca8-8347-3485bb8e2844",
        "rating": 3,
        "comment": "A bit disappointed. There was a delay in updates, but my pet was okay.",
        "bookingId": "083c13c8-06b6-4ef6-b7b8-9fae34acad9d",
        "reviewerId": "409d179c-e2c8-4295-a1bc-3b391c3c2ff6",
        "revieweeId": "07e59a6d-54cd-4795-8b20-76a159ce7ba6",
        "createdAt": "2024-11-27T20:12:48.000Z",
        "updatedAt": "2024-11-27T20:12:48.000Z"
      },
      {
        "uuid": "5ba75d37-87c7-4002-80db-fc676644a585",
        "rating": 3,
        "comment": "Satisfactory, but I was hoping for more interaction time.",
        "bookingId": "735011f1-d608-40db-a09b-b77c170ca923",
        "reviewerId": "b7facc52-8848-4017-8b43-82e112313b05",
        "revieweeId": "07e59a6d-54cd-4795-8b20-76a159ce7ba6",
        "createdAt": "2024-11-27T20:12:48.000Z",
        "updatedAt": "2024-11-27T20:12:48.000Z"
      }
    ],
    "services": [
      {
        "uuid": "67a861e8-7e03-487f-b55e-0243294f32c5",
        "name": "House Sitting",
        "createdAt": "2024-11-27T18:53:30.000Z",
        "updatedAt": "2024-11-27T18:53:30.000Z"
      }
    ]
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

### Get one service by its id

```http
  GET /api/v1/services/:id
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
    "uuid": "a509bb0a-3c0a-411e-a175-20c375c367fd",
    "startDate": "2024-11-22T19:49:43.000Z",
    "endDate": "2024-11-22T19:49:43.000Z",
    "location": "Vantaa",
    "status": "completed",
    "serviceId": "67a861e8-7e03-487f-b55e-0243294f32c5",
    "sitterId": "67f50ca0-e130-4a22-a3a4-5be09704ac72",
    "ownerId": "132184ff-6218-44a7-a6ee-8f4eccd2dbc0",
    "createdAt": "2024-11-27T19:49:43.000Z",
    "updatedAt": "2024-11-27T19:49:43.000Z",
    "sitter": {
      "firstName": "Ryan",
      "lastName": "Lee",
      "avatar": null
    },
    "owner": {
      "firstName": "Emily",
      "lastName": "Nieminen",
      "avatar": null
    },
    "reviews": [
      {
        "uuid": "cac373c0-ccfb-4fdf-adff-da29e241ffb2",
        "rating": 3,
        "comment": "The service was good, but my pet seemed a little anxious afterward.",
        "bookingId": "a509bb0a-3c0a-411e-a175-20c375c367fd",
        "reviewerId": "132184ff-6218-44a7-a6ee-8f4eccd2dbc0",
        "revieweeId": "67f50ca0-e130-4a22-a3a4-5be09704ac72",
        "createdAt": "2024-11-27T20:12:48.000Z",
        "updatedAt": "2024-11-27T20:12:48.000Z"
      }
    ]
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

#### Owner: Cancel the booking request if the booking is still pending

#### Sitter: Confirm or deny the booking request if the booking is still pending

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

### Create a review (if there is a completed booking)

```http
  POST /api/v1/reviews/:bookingId
```

```http
  Authorization: Bearer token
```

```http
  Content-type: application/json
```

| Parameter     | Type     | Description                                          |
| :------------ | :------- | :--------------------------------------------------- |
| `rating `     | `number` | **Required, number from 1 to 5**                     |
| `comment `    | `text`   | **Required, must have at least 4 to 300 characters** |
| `revieweeId ` | `string` | **Required**                                         |

Response:

```json
[
  {
    "message": "Create review successfully"
  }
]
```

### Edit a review

```http
  PUT /api/v1/reviews/:reviewId
```

```http
  Authorization: Bearer token
```

```http
  Content-type: application/json
```

| Parameter  | Type     | Description                                          |
| :--------- | :------- | :--------------------------------------------------- |
| `rating `  | `number` | **Required, number from 1 to 5**                     |
| `comment ` | `text`   | **Required, must have at least 4 to 300 characters** |

Response:

```json
[
  {
    "message": "Review updated successfully"
  }
]
```

### Create a message

```http
  POST /api/v1/messages/:receiverId
```

```http
  Authorization: Bearer token
```

```http
  Content-type: application/json
```

| Parameter  | Type   | Description  |
| :--------- | :----- | :----------- | --- |
| `content ` | `text` | **Required** |     |

Response:

```json
{
  "success": true,
  "message": {
    "content": "hi there",
    "senderId": "17420dd8-e349-48f2-8c23-f70d225b5399",
    "receiverId": "65f86381-878b-4b0a-9ba3-6fae43cdecdb",
    "roomId": "17420dd8-e349-48f2-8c23-f70d225b539965f86381-878b-4b0a-9ba3-6fae43cdecdb"
  }
}
```

### Get my messages

```http
  GET /api/v1/messages
```

```http
  Authorization: Bearer token
```

Response:

```json
{
  "success": true,
  "messages": [
    {
      "partnerId": "67f50ca0-e130-4a22-a3a4-5be09704ac72",
      "partnerName": "Ryan Lee",
      "partnerAvatar": null,
      "messages": [
        {
          "uuid": "51b6c515-7929-4fe1-b023-619439bad3b0",
          "content": "Perfect, I’ll stick to the dog's routine as closely as possible.",
          "senderId": "132184ff-6218-44a7-a6ee-8f4eccd2dbc0",
          "receiverId": "67f50ca0-e130-4a22-a3a4-5be09704ac72",
          "createdAt": "2024-11-27T21:58:43.000Z",
          "updatedAt": "2024-11-27T21:58:43.000Z"
        }
      ]
    }
  ]
}
```

### Get messages from the a user and log in user

```http
  GET /api/v1/messages/:id
```

```http
  Authorization: Bearer token
```

Response:

```json
{
  "success": true,
  "messages": [
    {
      "uuid": "51b6c515-7929-4fe1-b023-619439bad3b0",
      "content": "Perfect, I’ll stick to the dog's routine as closely as possible.",
      "senderId": "132184ff-6218-44a7-a6ee-8f4eccd2dbc0",
      "receiverId": "67f50ca0-e130-4a22-a3a4-5be09704ac72",
      "createdAt": "2024-11-27T21:58:43.000Z",
      "updatedAt": "2024-11-27T21:58:43.000Z"
    }
  ]
}
```
