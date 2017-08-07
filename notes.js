const fs = require('fs');

let fetchNotes = () => {
  try {
    let notesStr = fs.readFileSync('notes-data.json');
    return JSON.parse(notesStr);
  } catch (e) {
    return [];
  }
};

let saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

let logNote = (note) => {
  console.log('-----------------');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

let createNote = (title, body) => {
  let note = {
    title,
    body
  };

  let notes = fetchNotes();

  let duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

let getNote = (title) => {
  let notes = fetchNotes();

  let filteredNotes = notes.filter((note) => note.title === title);

  return filteredNotes[0];
};

let removeNote = (title) => {
  let notes = fetchNotes();

  let filteredNotes = notes.filter((note) => note.title !== title);

  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
};

let getAllNotes = () => {
  return fetchNotes();
};

module.exports = {
  createNote,
  getNote,
  removeNote,
  getAllNotes,
  logNote
};