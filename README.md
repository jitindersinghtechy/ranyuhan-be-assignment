# ranyuhan-be-assignment

To run this application, 

### Step 1
npm install

### Step 2
npm start


from postman, hit following queries:

### Step 3
You can copy paste below cURL request

---
> curl --location --request POST 'http://localhost:3022/Order/add'

---
> curl --location --request POST 'http://localhost:3022/Order' \
--header 'Content-Type: application/json' \
--data-raw '{
    "orderDetails": [
        {
            "itemId": 1,
            "itemName": "Iphone",
            "quantity": 2
        }
    ],
    "cardDetails": {
        "cardNo":789,
        "cvcNo": 595,
        "expiryMonth": 7,
        "expiryYear": 2026
    }
}'
---
