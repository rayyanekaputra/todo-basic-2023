'use client'
import { useState } from 'react';
import './homeStyle.css'

export default function Home() {

  const [written, setWritten] = useState('')
  const [note, setNote] = useState('')

  function handlerAddWritten(event){
    event.preventDefault
    setWritten(event.target.value)
  }
  function handlerAddNote(){
    setNote(written)
    console.log(written)
  }


  return (
    <section>
      <div className="card-container">
        <div className="header-card-wrapper">
          <h1>Create a new task</h1>
          <p>You can simply make a new task by typing down below</p>
        </div>
        <div className="cta-card-wrapper">
          <input placeholder="Write something.." onChange={handlerAddWritten}/>
          <button onClick={handlerAddNote}>Submit</button>
        </div>
        <div className="cta-card-wrapper">
          <p>{note}</p>
        </div>

      </div>
    </section>
  );
}
