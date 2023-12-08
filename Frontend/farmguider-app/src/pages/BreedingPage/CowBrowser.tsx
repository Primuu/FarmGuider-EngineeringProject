import CowSearchParams from "@/entities/CowSearchParams.ts";
import React, {useEffect, useState} from "react";
import {Button, FormControl, InputLabel, Select, SelectChangeEvent, TextField} from "@mui/material";
import {useTranslation} from "react-i18next";
import MenuItem from "@mui/material/MenuItem";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import {CowSortBy} from "@/utils/cowBrowserUtils.ts";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers";
import i18n from "i18next";
import plLocale from "date-fns/locale/pl";
import enLocale from "date-fns/locale/en-US";
import SearchIcon from '@mui/icons-material/Search';
import '@/pages/BreedingPage/cowBrowser.css';

type CowBrowserProps = {
    updateSearchParams: (key: keyof CowSearchParams, value: string | number | boolean | Date | undefined) => void;
    cowSearchParams: CowSearchParams;
}

const CowBrowser: React.FC<CowBrowserProps> = ({updateSearchParams, cowSearchParams}) => {
    const {t} = useTranslation('breedingPage');
    const [earTagNumber, setEarTagNumber] = useState<string | undefined>(undefined);
    const [cowName, setCowName] = useState<string | undefined>(undefined);
    const [minDateOfBirth, setMinDateOfBirth] = useState<Date | null>(null);
    const [maxDateOfBirth, setMaxDateOfBirth] = useState<Date | null>(null);
    const [minWeight, setMinWeight] = useState<number | undefined>(undefined);
    const [maxWeight, setMaxWeight] = useState<number | undefined>(undefined);
    const [minMilkingQuantity, setMinMilkingQuantity] = useState<number | undefined>(undefined);
    const [maxMilkingQuantity, setMaxMilkingQuantity] = useState<number | undefined>(undefined);
    const [locale, setLocale] = useState(enLocale);

    useEffect(() => {
        if (i18n.language === 'pl') setLocale(plLocale);
        if (i18n.language === 'en') setLocale(enLocale);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.language]);

    const handleEarTagNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEarTagNumber(e.target.value.toUpperCase());
    };

    const handleCowNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCowName(e.target.value === '' ? undefined : e.target.value);
    };

    const handleGenderChange = (event: SelectChangeEvent) => {
        updateSearchParams('gender', event.target.value === ' ' ? undefined : event.target.value);
    };

    const handleSortByChange = (event: SelectChangeEvent) => {
        updateSearchParams('sortBy', event.target.value as CowSortBy);
    };

    const handleSortDescChange = (event: SelectChangeEvent) => {
        updateSearchParams('sortDesc', event.target.value === 'true');
    };

    const handleMinDateOfBirthChange = (date: Date | null) => {
        setMinDateOfBirth(date);
    };

    const handleMaxDateOfBirthChange = (date: Date | null) => {
        setMaxDateOfBirth(date);
    };

    const handleMinWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMinWeight(event.target.value === '' ? undefined : parseFloat(event.target.value));
    };

    const handleMaxWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaxWeight(event.target.value === '' ? undefined : parseFloat(event.target.value));
    };

    const handleMinMilkingQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMinMilkingQuantity(event.target.value === '' ? undefined : parseFloat(event.target.value));
    };

    const handleMaxMilkingQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaxMilkingQuantity(event.target.value === '' ? undefined : parseFloat(event.target.value));
    };

    const search = () => {
        updateSearchParams('earTagNumber', earTagNumber);
        updateSearchParams('cowName', cowName);
        updateSearchParams('minDateOfBirth', minDateOfBirth ? minDateOfBirth : undefined);
        updateSearchParams('maxDateOfBirth', maxDateOfBirth ? maxDateOfBirth : undefined);
        updateSearchParams('minWeight', minWeight);
        updateSearchParams('maxWeight', maxWeight);
        updateSearchParams('minMilkingQuantity', minMilkingQuantity);
        updateSearchParams('maxMilkingQuantity', maxMilkingQuantity);
    }

    return (
        <div className="cow-browser-container">
            <div className="column-group g1">
                <TextField
                    size={"small"}
                    label={t('cowBrowser.earTagNumber')}
                    placeholder={"XX000123456789"}
                    type={"text"}
                    value={earTagNumber || ''}
                    onChange={handleEarTagNumberChange}
                    inputProps={{
                        maxLength: 14
                    }}
                />

                <TextField
                    size={"small"}
                    label={t('cowBrowser.cowName')}
                    type={"text"}
                    value={cowName || ''}
                    onChange={handleCowNameChange}
                />
            </div>

            <div className="column-group g2">
                <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    adapterLocale={locale}
                >
                    <DatePicker
                        className="date-picker"
                        label={t('cowBrowser.minDateOfBirth')}
                        value={minDateOfBirth}
                        onChange={handleMinDateOfBirthChange}
                        disableFuture
                        openTo="year"
                        views={['year', 'month', 'day']}
                        desktopModeMediaQuery="@media (min-width:600px)"
                        slotProps={{
                            field: {
                                clearable: true
                            },
                            textField:
                                {
                                    size: 'small'
                                }
                        }}
                    />

                    <DatePicker
                        className="date-picker"
                        label={t('cowBrowser.maxDateOfBirth')}
                        value={maxDateOfBirth}
                        onChange={handleMaxDateOfBirthChange}
                        disableFuture
                        openTo="year"
                        views={['year', 'month', 'day']}
                        desktopModeMediaQuery="@media (min-width:600px)"
                        slotProps={{
                            field: {
                                clearable: true
                            },
                            textField:
                                {
                                    size: 'small'
                                }
                        }}
                    />
                </LocalizationProvider>
            </div>

            <div className="column-group g3">
                <TextField
                    size={"small"}
                    label={t('cowBrowser.minWeight')}
                    type="number"
                    inputProps={{
                        step: "0.001",
                        min: "0.000",
                        max: "9999.999"
                    }}
                    value={minWeight || ''}
                    placeholder={"0,000"}
                    onChange={handleMinWeightChange}
                />

                <TextField
                    size={"small"}
                    label={t('cowBrowser.maxWeight')}
                    type="number"
                    inputProps={{
                        step: "0.001",
                        min: "0.000",
                        max: "9999.999"
                    }}
                    value={maxWeight || ''}
                    placeholder={"0,000"}
                    onChange={handleMaxWeightChange}
                />
            </div>

            <div className="column-group g4">
                <TextField
                    size={"small"}
                    label={t('cowBrowser.minMilkQuantity')}
                    type="number"
                    inputProps={{
                        step: "0.001",
                        min: "0.000",
                        max: "999.999"
                    }}
                    value={minMilkingQuantity || ''}
                    placeholder={"0,000"}
                    onChange={handleMinMilkingQuantity}
                />

                <TextField
                    size={"small"}
                    label={t('cowBrowser.maxMilkQuantity')}
                    type="number"
                    inputProps={{
                        step: "0.001",
                        min: "0.000",
                        max: "999.999"
                    }}
                    value={maxMilkingQuantity || ''}
                    placeholder={"0,000"}
                    onChange={handleMaxMilkingQuantity}
                />
            </div>

            <div className="column-group g5">
                <FormControl
                    size={"small"}
                >
                    <InputLabel>
                        {t('cowBrowser.sortBy')}
                    </InputLabel>
                    <Select
                        value={cowSearchParams.sortBy}
                        label={t('cowBrowser.sortBy')}
                        onChange={handleSortByChange}
                    >
                        {Object.values(CowSortBy).map((value) => (
                            <MenuItem key={value} value={value}>
                                {t(`cowBrowser.cowSortBy.${value}`)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl
                    size={"small"}
                >
                    <InputLabel>
                        {t('cowBrowser.sortDesc')}
                    </InputLabel>
                    <Select
                        value={String(cowSearchParams.sortDesc)}
                        label={t('cowBrowser.sortDesc')}
                        onChange={handleSortDescChange}
                    >
                        <MenuItem value="false">
                            {t('cowBrowser.ascending')}
                        </MenuItem>
                        <MenuItem value="true">
                            {t('cowBrowser.descending')}
                        </MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div className="column-group g6">
                <FormControl
                    size={"small"}
                >
                    <InputLabel shrink>
                        {t('cowBrowser.selectGender')}
                    </InputLabel>
                    <Select
                        value={cowSearchParams.gender || ' '}
                        label={t('cowBrowser.selectGender')}
                        onChange={handleGenderChange}
                        displayEmpty
                    >
                        <MenuItem value=" ">
                            <em>{t('cowBrowser.notSelected')}</em>
                        </MenuItem>
                        <MenuItem value="FEMALE">
                            <FemaleIcon className="gender-icon"/>
                            {t('cowBrowser.female')}
                        </MenuItem>
                        <MenuItem value="MALE">
                            <MaleIcon className="gender-icon"/>
                            {t('cowBrowser.male')}
                        </MenuItem>
                    </Select>
                </FormControl>

                <Button
                    variant="contained"
                    onClick={search}
                >
                    <SearchIcon/>
                    {t('cowBrowser.search')}
                </Button>
            </div>
        </div>
    )
}

export default CowBrowser;