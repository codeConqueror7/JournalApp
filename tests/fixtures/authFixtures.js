
export const initialState = {
    status: 'checking', // '',checking, 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const notAuthenticatedState = {
    status: 'not-authenticated', // '',checking, ''
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const authenticatedState = {
    status: 'authenticated', // '',checking, ''
    uid: 'ABC123',
    email: 'demo@google.com',
    displayName: 'Demo User',
    photoURL: 'https://foto.jpg',
    errorMessage: null,
}

export const demoUser = {
    uid: 'ABC123',
    email: 'demo@google.com',
    displayName: 'Demo User',
    photoURL: 'https://foto.jpg'
}