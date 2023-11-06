import React, {useState} from 'react';
import {TextField, Button, Container, Typography, Box, Grid} from '@mui/material';
import { InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {register} from "@/services/authenticationService.ts";
import UserCreateDTO from "@/entities/UserCreateDTO.ts";
import useValidation from "@/hooks/useValidation.ts";
import {validateRegister} from "@/utils/validateRegister.ts";
import '@/pages/NotLoggedPage/loginAndRegisterForm.css';
import LockIcon from '@mui/icons-material/Lock';

type Names = {
    firstName: string;
    lastName: string;
};

interface RegisterFormProps {
    cancel: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ cancel }) => {
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
        <Container className="form-container">
            <Box className="form-box">
                <Box className="form-icon">
                    <LockIcon/>
                </Box>
                <Typography className="form-header">
                    Register
                </Typography>
                {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                <Box component="form" onSubmit={handleSubmit} className="register-form">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoFocus
                                margin="normal"
                                required
                                fullWidth
                                id="firstName"
                                label="First name"
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
                                required
                                fullWidth
                                id="lastName"
                                label="Last name"
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
                        required
                        fullWidth
                        id="email"
                        label="Email address"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
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
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm password"
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
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box className="button-group">
                        <Button type="submit" fullWidth variant="contained">
                            Register
                        </Button>

                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={cancel}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default RegisterForm;
