"use client";
import { useState, useEffect} from "react";
import "./homeStyle.css";

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
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          note: written}),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Optionally, handle the response data if needed
      const responseData = await response.json();
      console.log("POST response:", responseData);
      // Fetch updated data after posting
      fetchData();
    } catch (error) {
      console.error("Error posting data:", error);
    }
  }

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // const data = JSON.stringify(await response.json()); //utk liat data dalam, harus di-stringify
      const data = await response.json();
      //ingat selalu untuk .map() dalam objects of array
      const notes = data.map(item => item.note)
      if(typeof notes === typeof collection) {
        setCollection(notes)
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
