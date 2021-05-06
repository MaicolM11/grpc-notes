const grpc = require("grpc");
const NoteService = grpc.load('notes.proto').Notes

const client = new NoteService('localhost:40000',   grpc.credentials.createInsecure())

function createNote(text){
    client.createNote({"text": text}, (err, response) => {
        console.log("Recieved from server ", response )
    })
}

function getNotes(){
    client.getNotes({}, (err, response) => {
        console.log(response)
    })
}

function getNotesStream(){
    const call = client.getNotesStream();
    call.on("data", item => {
        console.log("received item from server ", item)
    })
    call.on("end", e => console.log("finish"))
}
