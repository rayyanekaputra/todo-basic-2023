"use client";
import { useState, useEffect} from "react";
import "./homeStyle.css";
import axios from "axios";

export default function Home() {
  const [written, setWritten] = useState("");
  const [collection, setCollection] = useState([]);
  const apiUrl = 'https://654fb41a358230d8f0cda1a4.mockapi.io/notes'

  function handlerAddWritten(event) {
    
    setWritten(event.target.value);
  }
  async function handlerAddNote() {
    const updatedCollection = [...collection, written];
    setCollection(updatedCollection);
    setWritten(""); // Reset

    try {
      const response = await axios.post(apiUrl,{
        note: written
      })
      if (response.status >= 200 && response.status < 300) {
        console.log("POST response:", response.data);
        // Fetch updated data after posting
        fetchData();
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      const data = response.data;
      const notes = data.map(item => item.note);

      if (typeof notes === typeof collection) {
        setCollection(notes);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);



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
