
## Project Overview
The **Booking Management System** is a backend solution to manage gym schedules, trainers, trainees, and bookings. It ensures:
- Trainers can handle multiple schedules.
- Trainees can book sessions.
- Each schedule is restricted to 10 bookings per day.

---

## Relational Diagram
Below is the relational diagram illustrating the models and relationships:

![Relational Diagram](https://drive.google.com/file/d/1pzJ503Xk8-I1MsQMSOb6H0lNpi9Ku0-S/view?usp=sharing)

## live server url = https://gym-class-scheduling-and-membership.onrender.com

##er diagram link =https://lucid.app/lucidchart/517d3d58-df19-45f2-aa9f-dd3fac067c92/edit?viewport_loc=-870%2C-1606%2C2994%2C1391%2C0_0&invitationId=inv_aeb201ee-69c0-410e-9ac3-d214f12ae9d3


---

## Technology Stack
- **Programming Language**: TypeScript
- **Framework**: Express.js
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Hosted on render 

---

##admin login credential  email = admin@admin.com  pass= password

## Installation

Install Gym-Class-Scheduling-and-Membership-Management-System
 with yarn

```bash

git clone https://github.com/Ronnie038/Gym-Class-Scheduling-and-Membership-Management-System.git

cd project-folder

yarn install 

npx prisma migrate dev --name init
```
    

### Base URL http://localhost:5000/

## API Reference

####  Login Admin

```http
  post /api/v1/auth/login
```
``
  Request body  
``
```
   {
    "password": "password",         default admin creadential
    "email":"admin@admin.com"        default admin creadential
   }

```

| Parameter   | Type     | Description                |
| :--------   | :------- | :------------------------- |
| `password`   | `string` | **Required**. `true` |
| `email`    | `email` | **Required**. `true` |

``
  response body  
``
```
  {
    "success": true,
    "message": "Logged in successfully!",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTczNzM1NTc1MCwiZXhwIjoxNzM4MjE5NzUwfQ.B9fqfjUUoFNBHhl_VP6XNdkVS4FuSco10f9fUphPENs"
    }
}

```

## create trainer

```http
  post /api/v1/users/create-trainer
```
```
 Request Headers  
```

| Parameter   | Type     | Description                |
| :--------   | :------- | :------------------------- |
| `Athorization`   | `admin login jwt access token` | **Required**. `true` |

```
Request body 
{
    "password": "123456",
    "trainer": {
        "name": "trainer5",
        "email": "trainer5@trainer.com",
        "gender": "Male",
        "contactNo": "0123456789",
        "address": "456 Oak Street, Springfield",
        "experienceYears": 3
    }
}

```

| flields   | Type     | Description                |
| :--------   | :------- | :------------------------- |
| `password`   | `string` | **Required**. `true` |
| `name`     | `string` | **Required**. `true` |
| `email`    | `email` | **Required**. `true` |
| `gender` | `string` | **Required**. `true` |
| `experienceYears` | `number` | **Required**. `true` |


## create trainee
```http
  post /api/v1/users/create-trainee
```
``
  Request body  
``
```
   {
    "password": "securePassword123",
    "trainee": {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "contactNo": "0123456789",
        "gender": "Male",
        "dateOfBirth": "2000-10-10",
        "address": "123 Main Street, Cityville"
    }

```

| Parameter   | Type     | Description                |
| :--------   | :------- | :------------------------- |
| `password`   | `string` | **Required**. `true` |
| `name`     | `string` | **Required**. `true` |
| `email`    | `email` | **Required**. `true` |
| `contactNo` | `string` | **Required**. `true` |
| `dateOfBirth` | `string` | **Required**. `true` |
| `address` | `string` | **Required**. `true` |



## create Schedule or Class
```http
  post /api/v1/schedules
```
``
  Request body  
``
```
 {
  "trainerId": "df6cfeeb-a828-4275-93cb-c8843daa2bab",
  "startTime": "2025-01-20T16:00:00.000Z",   this time format required
  "endTime": "2025-01-20T18:00:00.000Z",     this time format required
  "sessionDate":"2025-01-21"                optional
}

```

| Parameter   | Type     | Description                |
| :--------   | :------- | :------------------------- |
| `trainerId`   | `string` | **Required**. `true` |
| `startTime`     | `string` | **Required**. `true` |
| `endTime`    | `email` | **Required**. `true` |
| `sessionDate` | `string` | **Required**. `false` |


## Get Schedule or Class
```http
  Get /api/v1/schedules
```
``
  Response Body  
``
```
{
    "success": true,
    "message": "shedules retreived successfully",
    "data": [
        {
            "id": "48376d86-a1d0-49ae-81b5-49003783fa3e",
            "trainerId": "48068f4b-2335-4de0-ab65-9ec43f1e84d2",
            "sessionDate": "2025-01-20T00:00:00.000Z",
            "startTime": "2025-01-20T18:00:00.000Z",
            "endTime": "2025-01-20T20:00:00.000Z",
            "createdAt": "2025-01-20T02:37:04.353Z",
            "updatedAt": "2025-01-20T02:37:04.353Z"
        },
    ]
}

```
## Get Trainer Schedule or Class
```http
  Get /api/v1/schedules/get-trainer-schedules
```
```sh
    Request Header
```
| Parameter   | Type     | Description                |
| :--------   | :------- | :------------------------- |
| `Athorization`   | `trainer jwt login access token` | **Required**. `true` |

```
  Response Body  
```
```
{
    "success": true,
    "message": "shedules retreived successfully",
    "data": responseData
}

```

-----------------------------------

## Create Schedule Booking
```http
  post /api/v1/bookings
```

```sh
    Request Header
```
| Parameter   | Type     | Description                |
| :--------   | :------- | :------------------------- |
| `Athorization`   | `trainee jwt login access token` | **Required**. `true` |


``
  Request body  
``
```
{

    "scheduleId":"48376d86-a1d0-49ae-81b5-49003783fa3e"
}

```

| Parameter   | Type     | Description                |
| :--------   | :------- | :------------------------- |
| `scheduleId`   | `string` | **Required**. `true` |

```
  Response body  
```
```
{
    "success": true,
    "message": "Booking created successfully",
    "data": {
        "id": "411038ed-c76f-4cb3-a9cb-098e4c74afc0",
        "traineeId": "165598b7-8224-4e13-b39a-571a8f6bcb58",
        "scheduleId": "48376d86-a1d0-49ae-81b5-49003783fa3e",
        "bookingDate": "2025-01-20T00:00:00.000Z",
        "createdAt": "2025-01-20T02:54:09.134Z",
        "updatedAt": "2025-01-20T02:54:09.134Z"
    }
}
```




## Get Schedule Bookings
```http
  Get /api/v1/bookings
```

```sh
    Request Header
```
| Parameter   | Type     | Description                |
| :--------   | :------- | :------------------------- |
| `Athorization`   | `trainer or Admin jwt login access token` | **Required**. `true` |


```
  Response body  
```
```
{
    "success": true,
    "message": "Booking retrieved successfully",
    "data": responseData
}
```

## Get Trainee Schedule Bookings
```http
  Get /api/v1/bookings/get-trainee-bookings
```

```sh
    Request Header
```
| Parameter   | Type     | Description                |
| :--------   | :------- | :------------------------- |
| `Athorization`   | `trainee jwt login access token` | **Required**. `true` |


```
  Response body  
```
```
{
    "success": true,
    "message": "Booking retrieved successfully",
    "data": responseData
}
```
## Cancel Trainee Schedule Booking
```http
  Put /api/v1/bookings/:id  --->bookingId
```

```sh
    Request Header
```
| Parameter   | Type     | Description                |
| :--------   | :------- | :------------------------- |
| `Athorization`   | `trainee jwt login access token` | **Required**. `true` |


```
  Response body  
```
```
{
    "success": true,
    "message": "Booking canceled successfully",
    "data": responseData
}
```
