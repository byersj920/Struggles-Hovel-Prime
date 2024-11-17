import { Button } from '@mui/material';
import React from 'react';


const HomePage = () =>{



    const introText = "Welcome to Struggle's Hovel! Click on the cube you'd like to see.";





    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <br />
            <p>{introText}</p>
            <Button variant="contained" >Outlaws of Thunder Junction</Button>
            <p></p>
            <Button variant="contained" color="green">Bloomburrow</Button>
        </div>
    )
}

export default HomePage;