import { loginWithEmailAndPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice";
import { clearNotesLogout } from "../journal";

export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())

    }
};

export const startGoogleSingIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());


        const result = await singInWithGoogle()
        if (!result.ok) return dispatch(logout(result.errorMessage))
        console.log({ result })

        dispatch(login(result))
    }
};

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {

        dispatch(checkingCredentials())

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });

        if (!ok) return dispatch(logout({ errorMessage }))  

        dispatch(login({ uid, displayName, email, photoURL }))
    }
};

export const startLoginWithEmailPassoword = ({ email, password }) => {
    return async (dispatch) => {

        dispatch(checkingCredentials())

        const { ok, errorMessage, displayName, photoURL, uid } = await loginWithEmailAndPassword({ email, password });

        if (!ok) return dispatch(logout({ errorMessage }));

        dispatch(login({ uid, photoURL, displayName, email }));
    }
};

export const startLogout = () => {
    return async (dispatch) => {

        await logoutFirebase();

        dispatch(clearNotesLogout())
        dispatch(logout({ errorMessage: null }))
    }
};