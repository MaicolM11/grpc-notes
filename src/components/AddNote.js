import React, {useState} from 'react'

function AddNote(props) {

    const [content, setContent] = useState('')
    const [click, setClick] = useState(false)

    const sendNote=()=>{
        let event=window.event
        if (event) event.preventDefault()
        if (content!='') {
            fetch( `${window.location}note`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({text: content})
            })
            .then(()=>setClick(false))
            .catch(()=>setClick(false))
        }else{
            alert('Ingrese un texto')
        }
    }

    return (
        <div className="col">
            {!click&&<button className='ml-2 btn btn-primary'
                        onClick={e=>{setClick(true)}}><h1 class="display-1">+</h1></button>}
            {click&&<div className ="card">
                <div className="card-header text-center">
                    CREAR NOTA
                </div>
                <div className="card-body">
                    <p >Nota:</p>
                    <textarea onChange={e=>{setContent(e.target.value)}} className="form-control" placeholder="Ingrese un texto">
                    </textarea>
                </div>
                <div class="card-footer text-muted">
                    <div className="row">
                        <button className="btn btn-primary" onClick={e=>{sendNote()}}>CREAR</button>
                        <button className="btn btn-danger" onClick={e=>{setClick(false)}}>CANCELAR</button>
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default AddNote;