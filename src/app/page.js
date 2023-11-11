"use client";
import { useState } from "react";
import "./homeStyle.css";

export default function Home() {
  const [written, setWritten] = useState("");
  const [collection, setCollection] = useState([]);

  function handlerAddWritten(event) {
    event.preventDefault();
    setWritten(event.target.value);
  }
  function handlerAddNote() {
    const UpdateCollection = [...collection, written];
    setCollection(UpdateCollection);
    setWritten(""); //reset
    console.log(written);
  }

  return (
    <section>
      <div className="card-container">
        <div className="header-card-wrapper">
          <h1>Create a new task</h1>
          <p>You can simply make a new task by typing down below</p>
        </div>
        <div className="cta-card-wrapper">
          <input placeholder="Write something.." onChange={handlerAddWritten} />
          {written ? (
            <button onClick={handlerAddNote}>Submit</button>
          ) : (
            <button disabled style={{
              backgroundColor: 'gray'
            }}>Maybe, type something?</button>
          )}
        </div>
      </div>
      {collection.length > 0 ? (
        <ul>
          {collection.map((notes, index) => (
            <li key={index}>
              <div className="card-container">
                <div className="header-card-wrapper">
                  <p className="truncate">{notes}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
