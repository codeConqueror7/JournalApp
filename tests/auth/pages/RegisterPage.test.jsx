import { fireEvent, render, screen } from "@testing-library/react"
import { RegisterPage } from "../../../src/auth/pages/RegisterPage"
import { MemoryRouter } from "react-router-dom"
import { Provider, useDispatch } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "../../../src/store/auth"
import { startCreatingUserWithEmailPassword } from "../../../src/store/auth/thunks"
import { useForm } from "../../../src/hooks/useForm"
import { initialState } from "../../fixtures/authFixtures"

const mockStartCreatingUserWithEmailPassword = jest.fn()

jest.mock('../../../src/store/auth/thunks', () => ({
    startCreatingUserWithEmailPassword: ({ displayName, password, email,  }) => {
        return () => mockStartCreatingUserWithEmailPassword({ password, email, displayName })
    }
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
        auth: initialState
    }
})

describe('Pruebas en RegisterPage', () => {



    beforeEach(() => jest.clearAllMocks())

    test('should debe de mostrar el comoponente correctamente', () => {

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterPage />
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getByText('Crear cuenta')).toBeTruthy();
        // screen.debug()
    })

    test('should debe de dar submit al formulario y llevar los argumentos a startregisterwithemailpassowrd', () => {

        const displayName = 'fernando'
        const email = 'fernando@gmail.com';
        const password = '12345611';

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterPage />
                </MemoryRouter>
            </Provider>
        )

        const nameField = screen.getByRole('textbox', { name: 'Nombre' })
        fireEvent.change(nameField, { target: { name: 'displayName', value: displayName } })

        const emailField = screen.getByRole('textbox', { name: 'Correo' })
        fireEvent.change(emailField, { target: { name: 'email', value: email } })

        const passwordField = screen.getByTestId('password');
        fireEvent.change(passwordField, { target: { name: 'password', value: password } })

        const submitForm = screen.getByLabelText('submit-form');
        fireEvent.submit(submitForm);

        expect(mockStartCreatingUserWithEmailPassword).toHaveBeenCalledWith({ password, email, displayName })

    })
})