import React, {useEffect, useState} from "react";

import Box from "@mui/material/Box/Box";
import {Slider} from "@mui/material";

import {useAppSelector} from "../../bll/store";


type DoubleRangePropsType = {
    onchangeSliderValue: (value: number[]) => void
}

export const DoubleRangeInput = React.memo(({onchangeSliderValue}:DoubleRangePropsType) => {

    const {minCardsCount, maxCardsCount} = useAppSelector(state => state.packs.packs)
    const [rangeValue, setRangeValue] = useState<number[]>([minCardsCount, maxCardsCount])

    useEffect(() => {
        setRangeValue([minCardsCount, maxCardsCount]);
    }, [minCardsCount, maxCardsCount])

    const handleChange = (event: Event, newValue: number | number[]) => setRangeValue(newValue as number[]);
    const onMouseUpHandler = () => onchangeSliderValue(rangeValue)


    return (<>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <span style={{color: 'black', marginLeft: '-10px'}}>{rangeValue[0]}</span>
                <span style={{color: 'black', marginRight: '-5px'}}>{rangeValue[1]}</span>
            </div>
            <Box>
                <Slider min={minCardsCount}
                        max={maxCardsCount}
                        size='medium'
                        value={rangeValue}
                        onChange={handleChange}
                        disableSwap
                        onMouseUp={onMouseUpHandler}
                />
            </Box>
        </>

    )
})