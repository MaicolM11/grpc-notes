const express = require('express');
const cors = require('cors');
const path = require('path');

var app=express()
app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

const http = require('http').createServer(app);
const io = require('socket.io')(http);
global.sockets=io.sockets
var port =4000

const grpc = require("grpc");
const NoteService = grpc.load('notes.proto').Notes

const client = new NoteService('localhost:40000',   grpc.credentials.createInsecure())

function createNote(text){
    client.createNote({"text": text}, (err, response) => {
        getNotes()
    })
}

function getNotes(){
    client.getNotes({}, (err, response) => {
        global.sockets.emit('notes', response.items)
    })
}

function getNotesStream(){
    const call = client.getNotesStream();
    call.on("data", item => {
        console.log("received item from server ", item)
    })
    call.on("end", e => console.log("finish"))
}

app.post('/note',(req,res)=>{
    console.log()
    createNote(req.body.text)
    res.sendStatus(200)
})

io.sockets.on('connection',(socket)=>{

    getNotes()
    
})

http.listen(port, async () => {
    console.log('Client listening on port ', port);
});