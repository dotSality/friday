import SuperInputText from '../../../Components/Super/SuperInputText/SuperInputText';
import SuperButton from '../../../Components/Super/SuperButton/SuperButton';
import SuperSelect from '../../../Components/Super/SuperSelect/SuperSelect';
import SuperRadio from '../../../Components/Super/SuperRadio/SuperRadio';
import SuperCheckbox from '../../../Components/Super/SuperCheckbox/SuperCheckbox';
import {useState} from 'react';

const values = ['1','2','3']

export const Test = () => {
    const [span, setSpan] = useState('')
    const [input, setInput] = useState('')
    const [value, setValue] = useState(values[0])
    const [check, setCheck] = useState(false)
    return <div>
        <SuperInputText value={input} onChangeText={setInput}/>
        <SuperButton>Button</SuperButton>
        <SuperSelect value={value} options={values} onChangeOption={setValue}/>
        <SuperRadio value={value} options={values} onChangeOption={setValue}/>
        <SuperCheckbox checked={check} onChangeChecked={setCheck}>
            Checkbox
        </SuperCheckbox>
    </div>
}