import React, {FC, useEffect} from "react";
import Box from "@mui/material/Box/Box";
import {Slider} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../bll/store";



type DoubleRangePropsType = {
    value1: number
    value2: number
    value3: number[]
    setValue1: (value1: number) => void
    setValue2: (value2: number) => void
    setValue3: (value3: number[]) => void
    onchangeSliderValue: (value1: number, value2: number) => void
}

const minDistance = 1

export const DoubleRangeInput: FC<DoubleRangePropsType> = React.memo((props) => {
    const {value1, value2, value3, setValue1, setValue2, setValue3, onchangeSliderValue} = props

    const {minCardsCount, maxCardsCount} = useAppSelector(state => state.packs.packs)


    const handleChange1 = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        if (activeThumb === 0) {
            setValue3([Math.min(newValue[0], value2 - minDistance), value2]);
            setValue1(Math.min(newValue[0], value2 - minDistance));
        } else {
            setValue3([value3[0], Math.max(newValue[1], value1 + minDistance)]);
            setValue2(value3[1])
        }
    };


    useEffect(() => {
        //let searchTimer = setTimeout(() => dispatch(setCardsCount({value1, value2})), 1500)
        let searchTimer = setTimeout( () => onchangeSliderValue (value1, value2), 1500)
        return () => clearTimeout(searchTimer)
    }, [value1, value2])

    return (
        <Box>
            <Slider min={minCardsCount}
                    max={maxCardsCount}
                    step={1}
                    size='medium'
                    value={value3}
                    onChange={handleChange1}
                    disableSwap
            />
        </Box>
    )
})