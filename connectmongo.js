const mongoose = require('mongoose')

const connectDB = async() => {
  try{
    await mongoose.connect(process.env.mongodb_conn_url)
    console.log("connected successfully")
  } catch (error) {
    console.log("connect failed")
  }

}

module.exports = connectDB
