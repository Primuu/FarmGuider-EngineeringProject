import React, {useState} from 'react';
import {Box, Button, Container, TextField, Typography} from '@mui/material';
import AuthenticationRequestDTO from "@/entities/AuthenticationRequestDTO.ts";
import {authenticate} from "@/services/authenticationService.ts";
import '@/pages/NotLoggedPage/loginForm.css';
import LockIcon from '@mui/icons-material/Lock';

const LoginForm = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginError, setLoginError] = useState<boolean>(false);

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
            } catch (error) {
                setLoginError(true);
            }
        })();
    };

    return (
        <Container className="login-container">
            <Box className="login-box">
                <Box className="login-icon">
                    <LockIcon/>
                </Box>
                <Typography className="login-header">
                    Sign in
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
                        label="Email Address"
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
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={handlePasswordChange}
                        error={loginError}
                    />
                    {loginError && (
                        <Typography color="error" className="login-error-message">
                            Invalid credentials
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className="login-button"
                    >
                        Sign in
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default LoginForm;