import React from 'react';

export const Card = () => {

    return (
        <div style={{display: 'flex', justifyContent: 'space-between', maxWidth: '670px', width: '100%'}}>
            <div style={{width: '140px', marginRight: '10px'}}>{}</div>
            <div style={{width: '40px', marginRight: '10px'}}>{}</div>
            <div style={{width: '100px', marginRight: '10px'}}>{}</div>
            <div style={{width: '100px', marginRight: '10px', overflow: 'hidden'}}>{}</div>
        </div>
    )
}