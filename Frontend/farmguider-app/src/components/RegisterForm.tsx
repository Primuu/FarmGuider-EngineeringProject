import React, {useState} from 'react';
import {TextField, Button, Container, Typography, Box, Grid} from '@mui/material';
import { InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {register} from "@/services/authenticationService.ts";
import UserCreateDTO from "@/entities/UserCreateDTO.ts";

type Names = {
    firstName: string;
    lastName: string;
};

type Errors = {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
};

const RegisterForm = () => {
    const [names, setNames] = useState<Names>({ firstName: '', lastName: '' });
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errors, setErrors] = useState<Errors>({});
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const invalidCharsRegex = /[^\p{L}]/gu;
        const sanitizedValue = value.replace(invalidCharsRegex, '');

        setNames({
            ...names,
            [name]: sanitizedValue
        });
    };

    const validate = () => {
        const emailRegex = /^[A-Za-z0-9+_.-]+@(.+\.)+[A-Za-z]{2,}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+{}[\]<>?~])[A-Za-z\d!@#$%^&*()-_=+{}[\]<>?~]{8,}$/;
        const tempErrors: Errors = {};

        tempErrors.firstName = names.firstName ? '' : 'First name must be filled in.';
        if (names.firstName && names.firstName.length > 45) {
            tempErrors.firstName = 'First name can contain a maximum of 45 characters.';
        }

        tempErrors.lastName = names.lastName ? '' : 'Last name must be filled in.';
        if (names.lastName && names.lastName.length > 45) {
            tempErrors.lastName = 'Last name can contain a maximum of 45 characters.';
        }

        if (!email) {
            tempErrors.email = 'Email must be filled in.';
        } else if (!emailRegex.test(email)) {
            tempErrors.email = 'Invalid email format.';
        } else {
            tempErrors.email = '';
        }

        tempErrors.password = password.length >= 8 ? '' : 'Password must contain at least 8 characters.';
        if (!passwordRegex.test(password)) {
            tempErrors.password = 'Password must meet the complexity requirements.';
        }

        tempErrors.confirmPassword = password === confirmPassword ? '' : 'Passwords do not match.';

        if (password !== confirmPassword) {
            tempErrors.password = tempErrors.password || 'Passwords do not match.';
        }

        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validate()) return;

        const userCreateDTO: UserCreateDTO = {
            email: email,
            password: password,
            firstName: names.firstName,
            lastName: names.lastName };

        void (async () => {
            try {
                await register(userCreateDTO);
            //
            } catch (error) {
                setErrors({
                    firstName: '',
                    lastName: '',
                    email: 'User with this email already exists.',
                    password: '',
                    confirmPassword: ''
                });
            }
        })();
    };

    return (
        <Container>
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoFocus
                                margin="normal"
                                fullWidth
                                id="firstName"
                                label="First name *"
                                name="firstName"
                                value={names.firstName}
                                onChange={handleNameChange}
                                error={!!errors.firstName}
                                helperText={errors.firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="lastName"
                                label="Last name *"
                                name="lastName"
                                value={names.lastName}
                                onChange={handleNameChange}
                                error={!!errors.lastName}
                                helperText={errors.lastName}
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email address *"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password *"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!errors.password}
                        helperText={errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="confirmPassword"
                        label="Confirm password *"
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button type="submit" fullWidth variant="contained">
                        Register
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default RegisterForm;
