import {useTranslation} from "react-i18next";
import {CowSummaryDTO} from "@/entities/CowSummaryDTO.ts";
import React from "react";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent.tsx";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import {Button} from "@mui/material";
import {BREEDING_PAGE_URL} from "@/constants/ROUTER_URLS.ts";
import {useNavigate} from "react-router-dom";
import {GiCow} from 'react-icons/gi';

type AnimalsComponentProps = {
    loading: boolean;
    cowSummaryDTO: CowSummaryDTO | null;
}

const AnimalsComponent: React.FC<AnimalsComponentProps> = ({loading, cowSummaryDTO}) => {
    const {t} = useTranslation('homePage');
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(BREEDING_PAGE_URL);
    };

    return (
        <div className="row-component">
            <div className="row-component-header">
                {t('animals.header')}
            </div>

            {loading ? (
                <LoadingComponent/>
            ) : (
                cowSummaryDTO && cowSummaryDTO.totalCowsNumber == 0 ? (
                    <div className="no-cows-container">
                        <div className="no-cows">
                            {t('animals.noCows')}
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClick}
                        >
                            <GiCow className="cow-icon"/>
                            {t('animals.breedingButton')}
                        </Button>
                    </div>
                ) : (cowSummaryDTO &&
                    <div>
                        <div className="row-component-text">
                            <div className="small-margin">
                                {t('animals.count')}:
                            </div>
                            <div>
                                {cowSummaryDTO.totalCowsNumber}
                            </div>
                        </div>

                        <div className="row-component-text">
                            <div className="medium-margin">
                                {t('animals.bulls')}:
                            </div>
                            <div>
                                {cowSummaryDTO.bullsNumber}
                            </div>
                        </div>

                        <div className="row-component-text">
                            <div className="medium-margin">
                                {t('animals.cows')}:
                            </div>
                            <div>
                                {cowSummaryDTO.cowsNumber}
                            </div>
                        </div>

                        <div className="row-component-text">
                            <div className="big-margin">
                                {t('animals.milkingCows')}:
                            </div>
                            <div>
                                {cowSummaryDTO.totalMilkingCowsNumber}
                            </div>
                        </div>

                        <div className="row-component-text">
                            <div className="big-margin">
                                {t('animals.currentMilkingCows')}:
                            </div>
                            <div>
                                {cowSummaryDTO.currentlyMilkingCowsNumber}
                            </div>
                        </div>

                        <div className="yesterday-summary small-margin">
                            {t('animals.yesterdaySummary')}: {cowSummaryDTO.yesterdayMilkingSum.toFixed(2)} l
                        </div>

                        <div className="summary small-margin">
                            {t('animals.todaySummary')}: {cowSummaryDTO.todayMilkingSum.toFixed(2)} l
                            {cowSummaryDTO.yesterdayMilkingSum > cowSummaryDTO.todayMilkingSum ? (
                                <TrendingDownIcon className="trending-icon red"/>
                            ) : (
                                <TrendingUpIcon className="trending-icon green"/>
                            )}
                        </div>
                    </div>
                )
            )}
        </div>
    )
}

export default AnimalsComponent;