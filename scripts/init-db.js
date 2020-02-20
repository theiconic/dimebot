const path = require('path')
const mysql = require('mysql')
const dotenv = require('dotenv')

let envOptions = {}

if (process.env.NODE_ENV === 'test') {
  envOptions = { path: path.join(__dirname, '/../.env.test') }
}

dotenv.config(envOptions)

let connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD
})

connection.connect((err) => {
  if (err) {
    throw err
  }

  connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DBNAME}`, (err, result) => {
    if (err) {
      throw err
    }

    console.log('Database created sucessfully.')
    process.exit()
  })
})
