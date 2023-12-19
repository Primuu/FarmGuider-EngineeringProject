import {Button, FormControl, InputLabel, Select, SelectChangeEvent, TextField} from "@mui/material";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";
import FieldSearchParams from "@/entities/FieldSearchParams.ts";
import MenuItem from "@mui/material/MenuItem";
import SoilClass from "@/entities/SoilClass.ts";
import AddIcon from "@mui/icons-material/Add";
import useMediaQuery from "@mui/material/useMediaQuery";
import theme from "@/styles/theme.ts";

type FieldBrowserProps = {
    updateSearchParams: (key: keyof FieldSearchParams, value: string | number | undefined) => void;
    fieldSearchParams: FieldSearchParams;
    onOpenAddFieldModal: () => void;
}

const FieldBrowser: React.FC<FieldBrowserProps> = ({updateSearchParams, fieldSearchParams, onOpenAddFieldModal}) => {
    const {t} = useTranslation('fieldBrowserPage');
    const [fieldName, setFieldName] = useState<string | undefined>(undefined);
    const [fieldAreaFrom, setFieldAreaFrom] = useState<number | undefined>(undefined);
    const [fieldAreaTo, setFieldAreaTo] = useState<number | undefined>(undefined);
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    const handleFieldNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldName(e.target.value === '' ? undefined : e.target.value);
    };

    const handleFieldAreaFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFieldAreaFrom(event.target.value === '' ? undefined : parseFloat(event.target.value));
    };

    const handleFieldAreaToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFieldAreaTo(event.target.value === '' ? undefined : parseFloat(event.target.value));
    };

    const handleSoilClassChange = (event: SelectChangeEvent) => {
        updateSearchParams('soilClass', event.target.value === ' ' ? undefined : event.target.value);
    };

    const handleSearch = () => {
        updateSearchParams('fieldName', fieldName);
        updateSearchParams('fieldAreaFrom', fieldAreaFrom);
        updateSearchParams('fieldAreaTo', fieldAreaTo);
    }

    return (
        <div className="field-browser-container">
            <TextField
                className="field-browser-input-1"
                size={isDesktop ? 'medium' : 'small'}
                label={t('fieldBrowser.fieldName')}
                type={"text"}
                value={fieldName || ''}
                onChange={handleFieldNameChange}
            />

            <TextField
                className="field-browser-input-2"
                size={isDesktop ? 'medium' : 'small'}
                label={t('fieldBrowser.fieldAreaFrom')}
                type="number"
                inputProps={{
                    step: "0.01",
                    min: "0.00",
                    max: "999.99"
                }}
                value={fieldAreaFrom || ''}
                placeholder={"0,00"}
                onChange={handleFieldAreaFromChange}
            />

            <TextField
                className="field-browser-input-3"
                size={isDesktop ? 'medium' : 'small'}
                label={t('fieldBrowser.fieldAreaTo')}
                type="number"
                inputProps={{
                    step: "0.01",
                    min: "0.00",
                    max: "999.99"
                }}
                value={fieldAreaTo || ''}
                placeholder={"0,00"}
                onChange={handleFieldAreaToChange}
            />

            <FormControl
                className="field-browser-input-4"
                size={isDesktop ? 'medium' : 'small'}
            >
                <InputLabel shrink>
                    {t('fieldBrowser.selectSoilClass')}
                </InputLabel>
                <Select
                    value={fieldSearchParams.soilClass || ' '}
                    label={t('fieldBrowser.selectSoilClass')}
                    onChange={handleSoilClassChange}
                    displayEmpty
                >
                    <MenuItem value=" ">
                        <em>{t('fieldBrowser.notSelected')}</em>
                    </MenuItem>
                    {Object.entries(SoilClass).map(([key, value]) => (
                        <MenuItem key={key} value={key}>
                            {value === SoilClass.Unknown ? t('fieldBrowser.unknownSoilClass') : value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <div className="field-browser-inputs-5">
                <Button
                    size={isDesktop ? 'medium' : 'small'}
                    variant="contained"
                    onClick={handleSearch}
                >
                    <SearchIcon/>
                    {t('fieldBrowser.search')}
                </Button>

                <Button
                    size={isDesktop ? 'medium' : 'small'}
                    variant="contained"
                    color="primary"
                    onClick={onOpenAddFieldModal}
                >
                    <AddIcon className="add-field-button-icon-content"/>
                    {t('fieldBrowser.addButton')}
                </Button>
            </div>
        </div>
    );
}

export default FieldBrowser;