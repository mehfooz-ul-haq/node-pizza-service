# Pizza Service in NodeJs

## Requirements
 - Node v14.17.6
 - Npm v6.14.15
 - MongoDB
 - Redis

### Steps to install
```shell
$ npm install -g npm
$ npm install -g migrate-mongo
```

### Application configuration
open `src/api/config.js` and update `db` and `redis` object according to your environmennt

### Application commands 
run following commands
```shell
$ npm i
$ migrate-mongo up // it will creates staffs collection in database require to place an order
$ nodemon
```

### Access API in Postman
 - create new order
 - `POST` http://localhost:3001/api/orders
```json
{
  name: Mehhfooz
  email: myemail@example.com
  phone: 12345678
}
```

it will create an orders collections in database
