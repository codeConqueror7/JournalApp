import { useMemo, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks"
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingUserWithEmailPassword } from '../../store/auth'

const formData = {
    email: '',
    password: '',
    displayName: '',
}

const formValidations = {
    email: [(value) => value.includes('@'), 'El correo debe de tener una @.'],
    password: [(value) => value.length >= 6, 'El password debe de tener más de 6 letras.'],
    displayName: [(value) => value.length >= 1, 'El nombre es obligatorio.'],
}

export const RegisterPage = () => {

    const dispatch = useDispatch();
    const [formSubmitted, setFormSubmitted] = useState(false);

    const { status, errorMessage } = useSelector(state => state.auth);

    const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);


    const { displayName, email, password, onInputChange, formState,
        isFormValid, displayNameValid, emailValid, passwordValid } = useForm(formData, formValidations);

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true)
        
        if (!isFormValid) return;
        dispatch(startCreatingUserWithEmailPassword(formState));
        // console.log('si se activo el startCreatingUserWithEmailPassword')
    };

    return (

        <AuthLayout title="Crear cuenta">
            <form
                onSubmit={onSubmit}
                aria-label='submit-form'
                className="animate__animated animate__fadeIn animate__faster"
            >
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Nombre'
                            type="text"
                            placeholder="Agregar nombre"
                            fullWidth
                            name='displayName'
                            inputProps={{
                                "data-testid": 'input-name'
                            }}
                            value={displayName}
                            onChange={onInputChange}
                            error={!!displayNameValid && formSubmitted}
                            helperText={displayNameValid}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Correo'
                            type="email"
                            placeholder="correo@gmail.com"
                            fullWidth
                            name='email'
                            value={email}
                            onChange={onInputChange}
                            error={!!emailValid && formSubmitted}
                            helperText={emailValid}
                        />
                    </Grid>


                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Contraseña'
                            type="password"
                            placeholder="Contraseña"
                            inputProps={{
                                'data-testid': 'password'
                            }}
                            fullWidth
                            props
                            name='password'
                            value={password}
                            onChange={onInputChange}
                            error={!!passwordValid && formSubmitted}
                            helperText={passwordValid}
                        />

                        <Grid
                            item
                            xs={12}
                            sm={6}
                            display={!!errorMessage ? '' : 'none'}
                        >
                            <Alert severity='error'>
                                {errorMessage}
                            </Alert>
                        </Grid>

                        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    type='submit'
                                    variant="contained"
                                    fullWidth
                                    disabled={isCheckingAuthentication}
                                >
                                    Crear Cuenta
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container direction='row' justifyContent='end' >
                        <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
                        <Link component={RouterLink} color='inherit' to='/auth/login'>
                            Ingresar
                        </Link>
                    </Grid>

                </Grid>
            </form>
        </AuthLayout>


    )
}
