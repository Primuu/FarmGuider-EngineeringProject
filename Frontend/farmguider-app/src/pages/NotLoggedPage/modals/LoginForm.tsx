import React, {useState} from 'react';
import {Box, Button, Container, TextField, Typography} from '@mui/material';
import AuthenticationRequestDTO from "@/entities/AuthenticationRequestDTO.ts";
import {authenticate} from "@/services/authenticationService.ts";
import '@/pages/NotLoggedPage/modals/forms.css';
import LoginIcon from '@mui/icons-material/Login';
import {useTranslation} from "react-i18next";
import {useSnackbar} from "notistack";
import {SnackbarSuccess} from "@/utils/snackbarVariants.ts";

interface LoginFormProps {
    cancel: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({cancel}) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginError, setLoginError] = useState<boolean>(false);
    const {enqueueSnackbar} = useSnackbar();

    const {t} = useTranslation('authForms');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const authenticationRequestDTO: AuthenticationRequestDTO = {email, password};

        void (async () => {
            try {
                await authenticate(authenticationRequestDTO);
                setLoginError(false);
                enqueueSnackbar(t('login.snackbar'), SnackbarSuccess);
            } catch (error) {
                setLoginError(true);
            }
        })();
    };

    return (
        <Container className="form-container">
            <Box className="form-box">
                <Box className="form-icon">
                    <LoginIcon/>
                </Box>
                <Typography className="form-header">
                    {t('login.header')}
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    className="login-form"
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label={t('login.emailLabel')}
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={handleEmailChange}
                        error={loginError}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={t('login.passwordLabel')}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={handlePasswordChange}
                        error={loginError}
                    />
                    {loginError && (
                        <Typography color="error" className="login-error-message">
                            {t('login.error')}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className="login-button"
                    >
                        {t('login.loginButton')}
                    </Button>

                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={cancel}
                        className="cancel-button"
                    >
                        {t('login.cancelButton')}
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default LoginForm;