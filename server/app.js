require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const routes = require('./routes')
const mongoose = require('mongoose');
const cors = require('cors')
const morgan = require('morgan')

mongoose.set('useCreateIndex', true)

if(process.env.NODE_ENV === 'test') {
    process.env.MONGODB_CONNECTION = `mongodb://localhost/gamestation-test`
}

mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.MONGODB_CONNECTION, {useNewUrlParser: true})
.then(function(success){
    console.log("succesfully connect to database")
})
.catch(function(err){
    console.log(err)
});

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended:false }))

app.use('/', routes)

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`)
})

module.exports = app
