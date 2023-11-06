import React, {useState} from 'react';
import {TextField, Button, Container, Typography, Box, Grid} from '@mui/material';
import { InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {register} from "@/services/authenticationService.ts";
import UserCreateDTO from "@/entities/UserCreateDTO.ts";
import useValidation from "@/hooks/useValidation.ts";
import {validateRegister} from "@/utils/validateRegister.ts";

type Names = {
    firstName: string;
    lastName: string;
};

const RegisterForm = () => {
    const [names, setNames] = useState<Names>({ firstName: '', lastName: '' });
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const {errors, validate, setErrors} = useValidation(validateRegister);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const invalidCharsRegex = /[^\p{L}-]/gu;
        const sanitizedValue = value.replace(invalidCharsRegex, '');

        setNames({
            ...names,
            [name]: sanitizedValue
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validate({ names, email, password, confirmPassword })) return;

        const userCreateDTO: UserCreateDTO = {
            email: email,
            password: password,
            firstName: names.firstName,
            lastName: names.lastName
        };

        try {
            await register(userCreateDTO);
            } catch (error) {
            setErrors(prevErrors => ({
                    ...prevErrors,
                    email: 'User with this email already exists.'
            }));
        }
    };

    return (
        <Container>
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
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
