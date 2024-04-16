import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth"
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures"

describe('first', () => {

    test('should first', () => {


        expect(authSlice.name).toBe('auth')
        const state = authSlice.reducer(initialState, {});
        console.log(state)

        expect(state).toEqual(initialState)

    });

    test('debe de realizar la autenticación', () => {

        // console.log())
        const state = authSlice.reducer(initialState, login(demoUser));
        // console.log(state)
        expect(state).toEqual({
            status: 'authenticated',
            uid: 'ABC123',
            email: 'demo@google.com',
            displayName: 'Demo User',
            photoURL: 'https://foto.jpg',
            errorMessage: null
        })

    })

    test('debe de realizar la autenticación', () => {

        // console.log())
        const state = authSlice.reducer(authenticatedState, logout(demoUser));

        expect(state).toEqual({
            status: 'not-authenticated', // '',checking, ''
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined,
        })

        // expect( state ).toEqual({
        //     status: 'authenticated',
        //     uid: 'ABC123',
        //     email: 'demo@google.com',
        //     displayName: 'Demo User',
        //     photoURL: 'https://foto.jpg',
        //     errorMessage: null
        //   })

    })

    test('debe de realizar la autenticación', () => {

        const demoUserError = {
            uid: 'ABC123no',
            email: 'demogoogle.com',
            displayName: 'a',
            photoURL: 'https://foto.pg',
            errorMessage: 'Credenciales no son correctas'
        }

        // console.log())
        const state = authSlice.reducer(authenticatedState, logout(demoUserError));

        expect(state).toEqual({
            status: 'not-authenticated', // '',checking, ''
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: 'Credenciales no son correctas',
        })

        

    })

    test('debe de realizar la autentdicación', () => {

        const state = authSlice.reducer(authenticatedState, checkingCredentials());
        expect( state.status ).toBe('checking')

        // expect(state).toEqual({
        //     status: 'not-authenticated', // '',checking, ''
        //     uid: null,
        //     email: null,
        //     displayName: null,
        //     photoURL: null,
        //     errorMessage: undefined,
        // })
    })
})