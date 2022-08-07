import React, { useState,useEffect } from "react";
import "./App.css";
import NotesList from "./components/Noteslist";
import { nanoid } from "nanoid";
import Search from "./components/Search";
import Header from "./components/Header";

function App() {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "This is my first Note",
      date: "04/08/2022",
    },
    {
      id: nanoid(),
      text: "This is my second Note",
      date: "05/08/2022",
    },
    {
      id: nanoid(),
      text: "This is my third Note",
      date: "06/08/2022",
    },
    {
      id: nanoid(),
      text: "This is my fourth Note",
      date: "07/08/2022",
    },
  ]);

  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(()=>{
     localStorage.setItem('react-notes-app-data',JSON.stringify(notes))
  },[notes])

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };
  return (
    <div className={`${darkMode && 'dark-mode'}`}>
       <div className="container">
      <Header handleToggleDarkMode={setDarkMode} />
      <Search handleSearchText={setSearchText} />
      <NotesList
        notes={notes.filter((note) =>
          note.text.toLowerCase().includes(searchText)
        )}
        handleAddNote={addNote}
        handleDeleteNote={deleteNote}
      />
    </div>
    </div>
  );
}

export default App;
