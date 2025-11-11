# Nutech - Take Home Test (swagger API and feature docs guide)


## /auth (or module membership)

POST /registration

- The email request parameter must include email format validation.
- The password request parameter must be at least 8 characters long.
- Handle responses according to the response documentation below.

req body:

{
  "email": "user@nutech-integrasi.com",
  "first_name": "User",
  "last_name": "Nutech",
  "password": "abcdef1234"
}

response:

200

{
  "status": 0,
  "message": "Registrasi berhasil silahkan login",
  "data": null
}

400

{
  "status": 102,
  "message": "Paramter email tidak sesuai format",
  "data": null
}

---

POST /login

T&C:

- The email request parameter must include email format validation.
- The password request parameter must be at least 8 characters long.
- The generated JWT must contain the email payload and be set to expire 12 hours after it is generated.
- Handle responses according to the response documentation below.

req body:

{
  "email": "user@nutech-integrasi.com",
  "password": "abcdef1234"
}

response:

200

{
  "status": 0,
  "message": "Login Sukses",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNTRVdXRjYTdCS0ZPX0ZUZGZ1bXlJem9zSTRKa1VxUGZVZ0ROSTUwelRTQlo2aHoyY0hKZ1VMb1loM09HUUd0ekQxV3dTX194aHBNZTE2SGFscVRzcEhjS21UclJ3S2FYYmZob3AzdzFFUHJ2NFdBQmk1c0RpdV9DSnZTSWt2MDFTbEU0QU5pbVB0bUx5azZoUzlOalVQNEZaVVpfRVBtcEk4Y3pNc3ZWa2JFPSIsImlhdCI6MTYyNjkyODk3MSwiZXhwIjoyNTU2MTE4Nzk4fQ.9C9NvhZYKivhGWnrjo4Wr1Rv-wur1wCm0jqfK9XDD8U"
  }
}

400

{
  "status": 102,
  "message": "Paramter email tidak sesuai format",
  "data": null
}

401

{
  "status": 103,
  "message": "Username atau password salah",
  "data": null
}

---

GET /profile

(use bearer token)

- This service must use a Bearer Token JWT to access it
- There is no email parameter in the query param url or request body; the email parameter is taken from the JWT payload obtained from the login results
- Handle the response according to the response documentation below

response:

200

{
  "status": 0,
  "message": "Sukses",
  "data": {
    "email": "user@nutech-integrasi.com",
    "first_name": "User",
    "last_name": "Nutech",
    "profile_image": "https://yoururlapi.com/profile.jpeg"
  }
}

400

{
  "status": 108,
  "message": "Token tidak tidak valid atau kadaluwarsa",
  "data": null
}

---

PUT /profile/update

(use bearer token)

- This service must use a Bearer Token JWT to access it
- There is no email parameter in the query param url or request body; the email parameter is taken from the JWT payload obtained from the login results
- Handle the response according to the response documentation below

request:

{
  "first_name": "User Edited",
  "last_name": "Nutech Edited"
}

response:

200

{
  "status": 0,
  "message": "Update Pofile berhasil",
  "data": {
    "email": "user@nutech-integrasi.com",
    "first_name": "User Edited",
    "last_name": "Nutech Edited",
    "profile_image": "https://yoururlapi.com/profile.jpeg"
  }
}

400

{
  "status": 108,
  "message": "Token tidak tidak valid atau kadaluwarsa",
  "data": null
}

---

PUT /profile/update

(use bearer token)

T&C:

- This service must use a Bearer Token JWT to access it
- There is no email parameter in the query param url or request body; the email parameter is taken from the JWT payload obtained from the login results
- Only jpeg and png image formats can be uploaded.
- Handle the response according to the response documentation below

request:

file
string($binary)

response:

200

{
  "status": 0,
  "message": "Update Profile Image berhasil",
  "data": {
    "email": "user@nutech-integrasi.com",
    "first_name": "User Edited",
    "last_name": "Nutech Edited",
    "profile_image": "https://yoururlapi.com/profile-updated.jpeg"
  }
}

400

{
  "status": 102,
  "message": "Format Image tidak sesuai",
  "data": null
}

401

{
  "status": 108,
  "message": "Token tidak tidak valid atau kadaluwarsa",
  "data": null
}

---

## Information module

GET /banner

T&C:

- Create a banner data list according to the Response documentation below. Try not to hardcode this banner, but rather retrieve it from the database.
- There is no need to create a CRUD banner module.
- Handle the Response according to the Response documentation below.

(public)

response:

200

{
  "status": 0,
  "message": "Sukses",
  "data": [
    {
      "banner_name": "Banner 1",
      "banner_image": "https://nutech-integrasi.app/dummy.jpg",
      "description": "Lerem Ipsum Dolor sit amet"
    },
    ....,
    {
      "banner_name": "Banner 6",
      "banner_image": "https://nutech-integrasi.app/dummy.jpg",
      "description": "Lerem Ipsum Dolor sit amet"
    }
  ]
}

---

GET /services

T&C:

- Create a Service/Service list according to the Response documentation below. Try not to hardcode this Service or Service list data, but rather retrieve it from the database.
- There is no need to create a CRUD Service/Service module.
- Handle Responses according to the Response documentation below.

(use bearer token)

response:

200

{
  "status": 0,
  "message": "Sukses",
  "data": [
    {
      "service_code": "PAJAK",
      "service_name": "Pajak PBB",
      "service_icon": "https://nutech-integrasi.app/dummy.jpg",
      "service_tariff": 40000
    },
    ...,
    {
      "service_code": "ZAKAT",
      "service_name": "Zakat",
      "service_icon": "https://nutech-integrasi.app/dummy.jpg",
      "service tariff": 300000
    }
  ]
}

401

{
  "status": 108,
  "message": "Token tidak tidak valid atau kadaluwarsa",
  "data": null
}

## Transaction module

GET /balance

T&C:

- This service must use a Bearer Token JWT to access it
- There is no email parameter in the query param url or request body; the email parameter is taken from the JWT payload obtained from the login results
- Handle the response according to the response documentation below

(use bearer token)

response:

200

{
  "status": 0,
  "message": "Get Balance Berhasil",
  "data": {
    "balance": 1000000
  }
}

401

{
  "status": 108,
  "message": "Token tidak tidak valid atau kadaluwarsa",
  "data": null
}

---

POST /topup

(use bearer token)

T&C:

- This service must use a Bearer Token JWT to access it
- There is no email parameter in the query param url or request body; the email parameter is taken from the JWT payload obtained from the login results
- Every time you top up, the user's balance will automatically increase
- The amount parameter can only be a number and cannot be less than 0
- When topping up, set the transaction_type in the database to TOPUP
- Handle the response according to the response documentation below

req body:

{
  "top_up_amount": 1000000
}

response:

200

{
  "status": 0,
  "message": "Top Up Balance berhasil",
  "data": {
    "balance": 2000000
  }
}

400

{
  "status": 102,
  "message": "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
  "data": null
}

401

{
  "status": 108,
  "message": "Token tidak tidak valid atau kadaluwarsa",
  "data": null
}

---

POST /transaction

(use bearer token)

T&C:

- This service must use a Bearer Token JWT to access it.
- There are no email parameters in the query param url or request body. The email parameter is taken from the JWT payload obtained from the login results.
- Every time a transaction is made, it must be ensured that the balance is sufficient.
- At the time of the transaction, set the transaction_type in the database to PAYMENT.
- Handle responses according to the response documentation below.
- The invoice_number response format can be generated freely.

req body:

{
  "service_code": "PULSA"
}

response:

200

{
  "status": 0,
  "message": "Transaksi berhasil",
  "data": {
    "invoice_number": "INV17082023-001",
    "service_code": "PLN_PRABAYAR",
    "service_name": "PLN Prabayar",
    "transaction_type": "PAYMENT",
    "total_amount": 10000,
    "created_on": "2023-08-17T10:10:10.000Z"
  }
}

400

{
  "status": 102,
  "message": "Service ataus Layanan tidak ditemukan",
  "data": null
}

401

{
  "status": 108,
  "message": "Token tidak tidak valid atau kadaluwarsa",
  "data": null
}

---

GET /transaction/history

(use bearer token)

T&C:

- This service must use a Bearer JWT Token to access it.
- There is no email parameter in the query param url or request body. The email parameter is taken from the JWT payload obtained from the login results.
- There is an optional limit parameter. If the limit is not sent, display all data.
- Data is ordered from the most recent based on the transaction date (created_on).
- Handling Response according to the Response documentation below.

response:

200

{
  "status": 0,
  "message": "Get History Berhasil",
  "data": {
    "offset": 0,
    "limit": 3,
    "records": [
      {
        "invoice_number": "INV17082023-001",
        "transaction_type": "TOPUP",
        "description": "Top Up balance",
        "total_amount": 100000,
        "created_on": "2023-08-17T10:10:10.000Z"
      },
      ...,
      {
        "invoice_number": "INV17082023-003",
        "transaction_type": "PAYMENT",
        "description": "Pulsa Indosat",
        "total_amount": 40000,
        "created_on": "2023-08-17T12:10:10.000Z"
      }
    ]
  }
}

401

{
  "status": 108,
  "message": "Token tidak tidak valid atau kadaluwarsa",
  "data": null
}
