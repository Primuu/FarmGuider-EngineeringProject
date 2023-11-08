import React, {useState} from 'react';
import {Box, Button, Container, Grid, IconButton, InputAdornment, TextField, Typography} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {fetchUserAuthData, register} from "@/services/authenticationService.ts";
import UserCreateDTO from "@/entities/UserCreateDTO.ts";
import useValidation from "@/hooks/useValidation.ts";
import {validateRegister} from "@/utils/validateRegister.ts";
import '@/pages/NotLoggedPage/loginAndRegisterForm.css';
import LockIcon from '@mui/icons-material/Lock';
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {HOME_PAGE_URL} from "@/constants/ROUTER_URLS.ts";
import {useAuth} from "@/contexts/AuthContext/AuthContext.tsx";
import UserAuthDTO from "@/entities/UserAuthDTO.ts";
import UserRoles from "@/contexts/AuthContext/UserRoles.ts";

type Names = {
    firstName: string;
    lastName: string;
};

interface RegisterFormProps {
    cancel: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({cancel}) => {
    const [names, setNames] = useState<Names>({firstName: '', lastName: ''});
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { setUserAuthData } = useAuth();
    const navigate = useNavigate();

    const {errors, validate, setErrors} = useValidation(validateRegister);

    const {t} = useTranslation('authForms');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        const invalidCharsRegex = /[^\p{L}-]/gu;
        const sanitizedValue = value.replace(invalidCharsRegex, '');

        setNames({
            ...names,
            [name]: sanitizedValue
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validate({names, email, password, confirmPassword}, t)) return;

        const userCreateDTO: UserCreateDTO = {
            email: email,
            password: password,
            firstName: names.firstName,
            lastName: names.lastName
        };

        try {
            await register(userCreateDTO);

            const userAuthData: UserAuthDTO = await fetchUserAuthData();
            setUserAuthData(userAuthData.userId, userAuthData.userRole as UserRoles);

            navigate(HOME_PAGE_URL);
        } catch (error) {
            setErrors(prevErrors => ({
                ...prevErrors,
                email: t('register.error')
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
                    {t('register.header')}
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
                                label={t('register.firstNameLabel')}
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
                                label={t('register.lastNameLabel')}
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
                        label={t('register.emailLabel')}
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={t('register.passwordLabel')}
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
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
                        label={t('register.confirmPasswordLabel')}
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box className="button-group">
                        <Button type="submit" fullWidth variant="contained">
                            {t('register.registerButton')}
                        </Button>

                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={cancel}
                        >
                            {t('register.cancelButton')}
                        </Button>
                    </Box>
                    <Typography className="password-text">
                        {t('register.passwordRequirements')}
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}

export default RegisterForm;
