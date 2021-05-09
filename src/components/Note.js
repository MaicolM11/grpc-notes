import React, {useState} from 'react'

function Note(props) {
    const [id, setId] = useState(props.id||-1)
    const [content, setContent] = useState(props.content||'Contenido')
    const [date, setDate] = useState(props.date||'')

    return (
        <div className="col">
            <div className ="card">
                <div className="card-header text-center">
                    {id}
                </div>
                <div className="card-body">
                    {content}
                </div>
                <div class="card-footer text-muted">
                    {new Date(parseInt(date)).toDateString()}
                </div>
            </div>
        </div>
    );
}

export default Note;