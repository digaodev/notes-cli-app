const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const titleOptions = {
      describe: 'Title of the note',
      demand: true,
      alias: 't'
    };

const bodyOptions = {
      describe: 'The description of the note',
      demand: true,
      alias: 'b'
    };

const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('read', 'Read a specific note', {
    title: titleOptions
  })
  .command('list', 'List all notes')
  .command('remove', 'Remove a specific note', {
    title: titleOptions
  })
  .help()
  .argv;

const command = argv._[0];

if (command === 'add') {
  let addedNote = notes.createNote(argv.title, argv.body);

  if (addedNote) {
    console.log('Note added: ');
    notes.logNote(addedNote);
  } else {
    console.log('Note was not added. Note title already exists: ', argv.title);
  }

} else if (command === 'read') {
  let readNote = notes.getNote(argv.title);

  if (readNote) {
    console.log('Note found: ');
    notes.logNote(readNote);
  } else {
    console.log('Note not found: ', argv.title);
  }
} else if (command === 'remove') {

  let noteRemoved = notes.removeNote(argv.title);

  if (noteRemoved) {
    console.log('Note was removed: ', argv.title);
  } else {
    console.log('Note was not found: ', argv.title);
  }
} else if (command === 'list') {
  let listNotes = notes.getAllNotes();
  console.log(`Listing ${listNotes.length} note(s)...`);
  listNotes.map((note) => notes.logNote(note));
} else {
  console.log('command not recognized');
}
