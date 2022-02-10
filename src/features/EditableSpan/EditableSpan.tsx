import React, {ChangeEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton/IconButton';

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
    onBlur: (newValue: string) => void

}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
    console.log('EditableSpan called');
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
        props.onBlur(title)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField value={title}
                     onChange={changeTitle}
                     autoFocus onBlur={activateViewMode}
                     variant='standard'
                     sx={{
                         input: {
                             height: '30px',
                             padding: '5px 10px'
                         }
                     }}
        />
        : <span onDoubleClick={activateEditMode}

        >{props.value}
            <IconButton onClick={activateEditMode}>
                <EditIcon/>
            </IconButton>
    </span>

});