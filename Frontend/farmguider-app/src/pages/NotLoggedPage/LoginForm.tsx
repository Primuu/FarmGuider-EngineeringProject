import React, {useState} from 'react';
import {TextField, Button, Container, Typography, Box} from '@mui/material';
import AuthenticationRequestDTO from "@/entities/AuthenticationRequestDTO.ts";
import {authenticate} from "@/services/authenticationService.ts";

const LoginForm = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginError, setLoginError] = useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>)=> {
        event.preventDefault();
        const authenticationRequestDTO: AuthenticationRequestDTO = { email, password };

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
        <Container>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
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
                        onChange={(e) => setEmail(e.target.value)}
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
                        onChange={(e) => setPassword(e.target.value)}
                        error={loginError}
                    />
                    {loginError && (
                        <Typography color="error" align="center">
                            Invalid credentials
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default LoginForm;