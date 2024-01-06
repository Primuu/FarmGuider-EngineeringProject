import {FaWheatAwn} from "react-icons/fa6";
import {LuWheat} from "react-icons/lu";
import {GiBeet, GiCorn, GiFruitTree, GiPlantWatering, GiPotato} from "react-icons/gi";
import {IconType} from "react-icons/lib";
import {TbShovel} from "react-icons/tb";

export const crops = [
    {value: 'WHEAT', icon: LuWheat as IconType, labelKey: 'addCropModal.wheat', fill: '#F4E4A2'},
    {value: 'TRITICALE', icon: FaWheatAwn as IconType, labelKey: 'addCropModal.triticale', fill: '#E5C29F'},
    {value: 'BARLEY', icon: FaWheatAwn as IconType, labelKey: 'addCropModal.barley', fill: '#DBA159'},
    {value: 'RAPESEED', icon: GiFruitTree as IconType, labelKey: 'addCropModal.rapeseed', fill: '#251203'},
    {value: 'RYE', icon: FaWheatAwn as IconType, labelKey: 'addCropModal.rye', fill: '#C5B358'},
    {value: 'OATS', icon: GiPlantWatering as IconType, labelKey: 'addCropModal.oats', fill: '#F3CB6A'},
    {value: 'CORN', icon: GiCorn as IconType, labelKey: 'addCropModal.corn', fill: '#FFCC00'},
    {value: 'POTATO', icon: GiPotato as IconType, labelKey: 'addCropModal.potato', fill: '#B59A6A'},
    {value: 'SUGAR_BEET', icon: GiBeet as IconType, labelKey: 'addCropModal.sugarBeet', fill: '#D3A5BF'},
    {value: 'NOT_PLANTED', icon: TbShovel as IconType, labelKey: 'addCropModal.notPlanted', fill: '#406064'},
];

export const getCropIcon = (cropValue: string) => {
    const crop = crops.find(c => c.value === cropValue);
    return crop!.icon;
};