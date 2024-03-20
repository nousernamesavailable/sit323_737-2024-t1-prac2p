//node js dependencies 
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')


app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var dbUrl = 'mongodb+srv://user:user@learning-node.anekdjh.mongodb.net/'

var Message = mongoose.model('Message', {
    name: String,
    message: String
})

app.get('/messages', (req, res) =>{
    Message.find()
    .then((messages) => {
        console.log("working")
        res.send(messages)
    })
    .catch((err) => {
        console.log("couldn't retrieve messages: " + err)
    })
})

// post a message from webpage 
app.post('/messages', (req, res) =>{
    var message = new Message(req.body)

    message.save()
    .then(() => {
        console.log('saved')
    })
    .then(() => {
        // emit will allow the page to wait for a message rather than polling 
        io.emit('message', req.body)
        res.sendStatus(200)
    })
    .catch((err) => {
        res.sendStatus(500)
    })
})

io.on('connection', (socket) => {
    //console.log here for debugging!
    //console.log('a user connected!')
})

// mongoose no longer accepts callbacks - this is a promise below. 
mongoose.connect(dbUrl)
.then((success)=> console.log("successfuly connected to mongo"))
.catch((err)=> console.log("issue with connection: " + err));


//switched from ${app}.listen to ${http}.listen 
var server = http.listen(3000, () => {
    console.log('server is listening on prot', server.address)

})