import { collection, deleteDoc, getDocs } from "firebase/firestore";
import { addNewEmptyNotes, savingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";
import { FirebaseDB } from "../../../src/firebase/config";

describe('first', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => jest.clearAllMocks())

    //ESTA PRUEBA ESTA DAÑADA, PORQUE FIREBASE NO FUNCIONA EN ESTA PREUBA
    // CORRECTAMENTE
    
    // test('debe de crear una nueva nota en blanco', async () => {

    //     const uid = 'TEST-UID';
    //     getState.mockReturnValue({ auth: { uid: uid } })

    //     await startNewNote()(dispatch, getState)

    //     expect(dispatch).toHaveBeenCalledWith(savingNewNote())
    //     expect(dispatch).toHaveBeenCalledWith(addNewEmptyNotes({
    //         body: '',
    //         title: '',
    //         id: expect.any(String),
    //         date: expect.any(Number)
    //     }))

    //     expect(dispatch).toHaveBeenCalledWith(setActiveNote({
    //         body: '',
    //         title: '',
    //         id: expect.any(String),
    //         date: expect.any(Number)
    //     }))

    //     const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    //     const docs = await getDocs(collectionRef);
    //     console.log(docs)

    //     const deletePromises = [];
    //     docs.forEach(doc => deletePromises.push(deleteDoc(doc.ref)))
    //     await Promise.all(deletePromises)
    // })
})