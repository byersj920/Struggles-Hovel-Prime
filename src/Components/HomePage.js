import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';


const HomePage = () =>{
    const navigate = useNavigate();

    const introText = "Welcome to Struggle's Hovel! Click on the cube you'd like to see.";
    const loadOutlawsCube = () => {navigate('/outlaws');}
    const loadBloomburrowCube = () => {navigate('/bloomburrow')}
    const loadTarkirDragonstormCube = () => {navigate('/tarkirDragonstorm')}

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <br />
            <p>{introText}</p>
            <Button variant="contained" onClick={loadOutlawsCube}>Outlaws of Thunder Junction</Button>
            <p></p>
            <Button variant="contained" onClick={loadBloomburrowCube}>Bloomburrow</Button>
            <p></p>
            <Button variant="contained" onClick={loadTarkirDragonstormCube}>Tarkir Dragonstorm</Button>
        </div>
    )
}

export default HomePage;