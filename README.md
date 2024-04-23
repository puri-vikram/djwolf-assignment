The Login Api:

  Url: http://localhost:4000/user/login
  Type: POST
  Body: 
    Raw
    {
      "email":"djwolf@gmail.com",
      "password":"123456"
    }


Download pdf and send email api:

  Url: http://localhost:4000/user/get-user-pdf
  Type: GET
  Header: {token: 'jwttoken'}


  Mongo Json Data To import:
  
  name: local.invoices.json
      [{
      "_id": {
        "$oid": "6627ae957fa72141028343c4"
      },
      "invoiceNumber": 1,
      "invoiceName": "573xyz",
      "user": {
        "$oid": "6627808469b2cc904e8dd25d"
      },
      "amount": 573,
      "tax": 593,
      "status": "paid",
      "__v": 0
    }]


  name: local.users.json

    [{
    "_id": {
      "$oid": "6627808469b2cc904e8dd25d"
    },
    "name": "djwolf",
    "email": "djwolf@gmail.com",
    "password": "$2a$10$eKlUiZBQqjoh8KE17jSR1uTqRcWIjcf63ctmLAWEAaQBiKQbpsQgW",
    "__v": 0
  }]





    
