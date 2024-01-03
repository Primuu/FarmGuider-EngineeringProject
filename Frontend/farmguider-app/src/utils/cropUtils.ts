import {FaWheatAwn} from "react-icons/fa6";
import {LuWheat} from "react-icons/lu";
import {GiBeet, GiCorn, GiFruitTree, GiPlantWatering, GiPotato} from "react-icons/gi";
import {IconType} from "react-icons/lib";

export const crops = [
    {value: 'WHEAT', icon: LuWheat as IconType, labelKey: 'addCropModal.wheat'},
    {value: 'TRITICALE', icon: FaWheatAwn as IconType, labelKey: 'addCropModal.triticale'},
    {value: 'BARLEY', icon: FaWheatAwn as IconType, labelKey: 'addCropModal.barley'},
    {value: 'RAPESEED', icon: GiFruitTree as IconType, labelKey: 'addCropModal.rapeseed'},
    {value: 'RYE', icon: FaWheatAwn as IconType, labelKey: 'addCropModal.rye'},
    {value: 'OATS', icon: GiPlantWatering as IconType, labelKey: 'addCropModal.oats'},
    {value: 'CORN', icon: GiCorn as IconType, labelKey: 'addCropModal.corn'},
    {value: 'POTATO', icon: GiPotato as IconType, labelKey: 'addCropModal.potato'},
    {value: 'SUGAR_BEET', icon: GiBeet as IconType, labelKey: 'addCropModal.sugarBeet'},
];

export const getCropIcon = (cropValue: string) => {
    const crop = crops.find(c => c.value === cropValue);
    return crop!.icon;
};