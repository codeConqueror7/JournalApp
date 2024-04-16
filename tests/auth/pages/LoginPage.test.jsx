import { fireEvent, render, screen } from "@testing-library/react"
import { LoginPage } from "../../../src/auth/pages/LoginPage"
import { Provider, useDispatch } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { MemoryRouter } from "react-router-dom"
import { notAuthenticatedState } from "../../fixtures/authFixtures"
import { authSlice } from "../../../src/store/auth"
import { startGoogleSingIn, startLoginWithEmailPassoword } from "../../../src/store/auth/thunks"

const mockStartGoogleSingIn = jest.fn();
const mockStartLoginWithEmailPassoword = jest.fn()

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSingIn: () => mockStartGoogleSingIn,
    startLoginWithEmailPassoword: ({ email, password }) => {
        return () => mockStartLoginWithEmailPassoword({ email, password });
    },
}))

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn()
}))

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
    preloadedState: {
        auth: notAuthenticatedState,
    }
})


describe('Pruebas en el comonente LoginPage', () => {

    beforeEach(() => jest.clearAllMocks())
    test('should debe de mostrar el componente correctamente', () => {

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1)
        screen.debug()
    })

    test('should boton de google de llamar el startGoogleSingIn', () => {


        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        screen.debug()

        const googleBtn = screen.getByLabelText('google-btn')
        fireEvent.click(googleBtn);

        expect(mockStartGoogleSingIn).toHaveBeenCalled()

    })

    test('should debe de lllamar el startLoginWithEmailPassoword ', () => {

        const email = 'fernando@gmail.com';
        const password = '123456';

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        const emailField = screen.getByRole('textbox', { name: 'Correo' });
        fireEvent.change(emailField, { target: { name: 'email', value: email } })

        const passwordField = screen.getByTestId('password');
        fireEvent.change(passwordField, { target: { name: 'password', value: password } })

        const submitForm = screen.getByLabelText('submit-form')
        fireEvent.submit(submitForm)

        expect(mockStartLoginWithEmailPassoword).toHaveBeenCalledWith({ email, password })
    })
})