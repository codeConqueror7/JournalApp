import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNotes, deleteNoteById, noteUpdated, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving } from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";

export const startNewNote = () => { //async
    return  (dispatch, getState) => {
        dispatch(savingNewNote())

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        setDoc(newDoc, newNote); //await

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNotes(newNote));
        dispatch(setActiveNote(newNote));


    }
};

export const startLoadingNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if (!uid) throw new Error('El UID del usuario no existe')

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes))
    }
};

export const startSaveNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFireStore, { merge: true })

        dispatch(noteUpdated(note))
    }
};


export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving())

        // await fileUpload(files[0])
        const fileUploadPromises = [];

        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }

        const photosUrls = await Promise.all(fileUploadPromises);
        dispatch(setPhotosToActiveNote(photosUrls))
    }
};

export const startDeletingNote = () => {
    return async (dispatch, getState) => {


        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id))
    }
};