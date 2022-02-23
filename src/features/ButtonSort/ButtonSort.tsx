import React, {useState} from 'react';
import {CardPackType, sortValues} from "../../dal/packs-api";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import IconButton from "@mui/material/IconButton";

type PropsType = {
    onChangeFilterPacks: (sortPacks: string) => void
    sortValue: string
}


export const ButtonSort = (props: PropsType) => {

    const [sort, setSort] = useState<'1' | '0'>('0');

    const onClickHandler = (sortValue: string) => {
        debugger
        sort === '0' ? setSort('1') : setSort('0')
        sort === '0' ? props.onChangeFilterPacks(`0${sortValue}`) : props.onChangeFilterPacks(`1${sortValue}`)
    }

    return (
        <>
            <IconButton size={'small'}
                        onClick={() => {
                            debugger
                            onClickHandler(props.sortValue)
                        }}>
                <ArrowDropUpIcon style={sort === '1' ? {transform: 'rotate(180deg)'} : {}}/>
            </IconButton>
        </>
    )
}

/*
import {
    SortButtonPropsType,
    SortValueType,
} from 'components/SortButton/SortButton/types';

export const SortButton: FC<SortButtonPropsType> = props => {
    const { onClick, defaultValue = '0updated' } = props;

    const [sort, setSort] = useState<SortValueType>(defaultValue);
    // стоит поиграться с логикой касаемо запроса...
    const onClickSortHandler = () => {
        if (sort === '0updated') {
            setSort('1updated');
            onClick && onClick('1updated');
        } else {
            setSort('0updated');
            onClick && onClick('0updated');
        }
    };

    return (
        <button className={styles.button} type="button" onClick={onClickSortHandler}>
            <img
                src={arrowIcon}
                alt="arrow"
                style={sort === '1updated' ? { transform: 'rotate(180deg)' } : {}}
            />
        </button>
    );
};*/
