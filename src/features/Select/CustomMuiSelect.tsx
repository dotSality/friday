import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {FC} from "react";


type PropsType = {
    value: number
    onChangeOptions: (value: number) => void
}
const options = [4, 8, 12, 20]

export const CustomMuiSelect: FC<PropsType> = ({value, onChangeOptions}) => {


    const handleChange = (event: SelectChangeEvent) => {
        onChangeOptions(Number(event.target.value))
    }

    return (
        <div>
            <FormControl variant="standard" sx={{ minWidth: 40, mt: 2}} size={'small'}>
                <Select
                    value={value as unknown as string}
                    onChange={handleChange}
                >
                    {options.map(option => {
                        return <MenuItem value={option}>{option}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </div>
    )
}