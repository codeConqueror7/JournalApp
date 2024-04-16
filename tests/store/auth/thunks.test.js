import { loginWithEmailAndPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth"
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSingIn, startLoginWithEmailPassoword, startLogout } from "../../../src/store/auth/thunks"
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";
jest.mock('../../../src/firebase/providers')

describe('first', () => {
    const dispatch = jest.fn();
    beforeEach(() => jest.clearAllMocks())

    test('should first', async () => {

        await checkingAuthentication()(dispatch)
        expect(dispatch).toHaveBeenCalledWith({ type: 'auth/checkingCredentials', payload: undefined })

    })

    test('startGoogleSingIn', async () => {

        const loginData = { ok: true, ...demoUser };

        await singInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSingIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(loginData));

    })

    test('startGoogleSingIn', async () => {

        const loginData = { ok: false, errorMessage: 'Un error en Google' };



        await singInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSingIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));

    })

    test('startGoogleSingIn', async () => {

        const loginData = { ok: true, ...demoUser };
        const formData = { password: '123456', email: demoUser.email };

        await loginWithEmailAndPassword.mockResolvedValue(loginData);

        await startLoginWithEmailPassoword(formData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(demoUser))

    })

    test('should first', async () => {

        await startLogout()(dispatch)

        expect(logoutFirebase).toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout())
        expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: null }))
    })

    test('should first', async () => {

        const loginData = {  ok: false, uid: 'ABC123', photoURL: 'https://foto.jpg', errorMessage: 'alahuacva' };
        const formData = { password: '123456', email: demoUser.email, displayName: demoUser.displayName };

        await registerUserWithEmailPassword.mockResolvedValue( loginData )

        await startCreatingUserWithEmailPassword( formData )(dispatch)

        expect( dispatch ).toHaveBeenCalledWith(checkingCredentials())  
        expect( dispatch ).toHaveBeenCalledWith( logout({errorMessage: "alahuacva"}))


    })
})
