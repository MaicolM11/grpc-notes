import React,{useState,useEffect} from 'react'
import Note from './Note'
import AddNote from './AddNote'
import io from 'socket.io-client'

function App() {
  const [notes, setNotes] = useState([])
  const [val, setVal]=useState(false)
  const [stop, setStop] = useState('')

  var socket=io('/',{autoConnect: false})

  useEffect(()=>{
    if (!val) {
        socket.connect()
        setVal(true)
    }
  },[stop])

  socket.on('notes',(data)=>{
    let j=JSON.parse(JSON.stringify(data))
    let temp=[]
    j.map(note=>{
      temp.push(note)
    })
    setNotes(temp)
  })

  const handleAdd=(content)=>{
   
  }

  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-center">
        NOTAS
      </h1>
      <div className="row row-cols-5">
        {notes.map((note,i)=>{
          return <Note id={note.id} content={note.text} date={note.date}/>
        })}
        <AddNote/>
      </div>
    </div>
  );
}

export default App;
