import React, {FC, useEffect, useState} from "react";
import Box from "@mui/material/Box/Box";
import {Slider} from "@mui/material";
import { useAppSelector} from "../../bll/store";




type DoubleRangePropsType = {
    value: number[]
    setValue: (value: number[]) => void
    onchangeSliderValue: (value1: number, value2: number) => void
}



export const DoubleRangeInput: FC<DoubleRangePropsType> = React.memo((props) => {
    const { value, setValue, onchangeSliderValue} = props

    const {minCardsCount, maxCardsCount} = useAppSelector(state => state.packs.packs)

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const handler = () => {
        onchangeSliderValue (value[0],value[1])
    }

    return (
        <Box>
            <Slider min={minCardsCount}
                    max={maxCardsCount}
                    size='small'
                    value={value}
                    onChange={handleChange}
                    disableSwap
                    sx={{width: ' 300px'}}
                    onMouseUp={handler}
            />
        </Box>
    )
})