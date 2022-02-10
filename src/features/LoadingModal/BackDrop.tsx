
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import {useState} from 'react';

export default function LoadingStatusBackdrop() {
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Backdrop
                sx={{ color: '#000000', backgroundColor: 'rgba(0, 0, 0, 0.3)'}}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}