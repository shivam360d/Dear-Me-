console.log('starting notes');

fs = require('fs');

const fetchNotes = () => {
    try{
        //read the data
        var notesString= fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
        }
        catch(er){};
};

const saveNotes = notes => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

const addNote = (title,body) => {
console.log('adding note', title, body);
var notes=fetchNotes();
var note={
    title,
    body
};
//check the duplicity
var duplicateNotes= notes.filter(note => note.title === title );
//add the new data to json as well as notes
if( duplicateNotes.length === 0){
    notes.push(note);
    saveNotes(notes);
    return note;
}

}

const listAll = () => {console.log('listing all notes');
        var allnotes = fetchNotes();
        return allnotes; 
}
const readNote = title => {console.log('reading a note', title);
var notes = fetchNotes();
var notesRequired = notes.filter(note=> note.title === title);
return notesRequired[0];
}
const removeNote = title => {
    var notes=fetchNotes();

var filteredNotes= notes.filter(note => note.title !== title );

saveNotes(filteredNotes);

return filteredNotes.length !== notes.length ;
};

var logNote = (note) => {
    console.log('-----');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};

module.exports = {
    addNote,
    listAll,
    readNote,
    removeNote,
    logNote
};

