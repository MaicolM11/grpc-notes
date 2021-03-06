const grpc = require("grpc");
const notesProto = grpc.load('notes.proto')

var sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms*1000));

const server = new grpc.Server();
const notes = []

server.addService(notesProto.Notes.service,   {
    "createNote": createNote,
    "getNotes" : getNotes,
    "getNotesStream": getNotesStream
});

server.bind("0.0.0.0:40000", grpc.ServerCredentials.createInsecure());
server.start();

function createNote (call, callback) {
    const noteItem = { "id": notes.length + 1,  "text": call.request.text, "date": `${Date.now()}` }
    notes.push(noteItem)
    callback(null, noteItem);
}

function getNotes(call, callback) {
    callback(null, {"items": notes})   
}



async function getNotesStream(call, callback) { 
    for (let i = 0; i < notes.length; i++) {
        await sleep(1)
        call.write(notes[i])
    }
    call.end();
}

