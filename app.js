const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
//imported from notes
const notes = require('./notes.js');

const titleOption = {
    description: 'title of a note',
        demand: true,
        alias: 't' 
};
const bodyOption = {
    description: 'body of a note',
        demand: true,
        alias: 'b' 
};

const argv = yargs
.command( 'add', 'add a new note', {
    title: titleOption,
    body: bodyOption
}
)
.command( 'read', 'read a node', {
    title: titleOption
})
.command( 'remove', 'remove a note', {
    title: titleOption
})
.command('list', 'lists all notes', {
    title: titleOption
})
.argv ;

console.log(yargs.argv);
const command = argv._[0];

if(command === 'add') {
 var note= notes.addNote(argv.title, argv.body);
 if(note){
   notes.logNote(note);
}
 else{
     console.log('title seems to be repeated!')
}
}

else if (command === 'list'){
    notes.listAll();
    var allnotes = notes.listAll();
    console.log(`Total number of notes are: ${allnotes.length}`);
    allnotes.forEach(note => note.logNote(note));
}

else if (command === 'read'){
    var note = notes.readNote(argv.title);
    if(note){
        console.log("note found");
    notes.logNote(note);
    }else{
console.log('note not found');
    }
}

else if (command === 'remove'){
    var noteRemoved=notes.removeNote(argv.title);
    let message = noteRemoved ? 'Note removed' : "Note doesn't exists" ;
    console.log(message);
    
}else{
    console.log('command not recognized');
}
