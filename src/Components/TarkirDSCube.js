import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './CardDisplay.css';
import axios from 'axios';
import TextDisplay from './TextDisplay';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const TarkirDSCube = () => {
  const [cardData, setCardData] = useState(null);
  const [discordName, setDiscordName] = useState('');
  const [collectedFilter, setCollectedFilter] = useState(false);
  const [cardsToBeAdded, setCardsToBeAdded] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('https://hovel-backend-648542156002.us-central1.run.app/api/cards');
            const filteredCards = response.data.filter(card => card.setCode === "tdm");
            setCardData(filteredCards);
        } catch (error) {
            console.error('Error fetching card data:', error);
        }
    };
    fetchData();
}, []);

  //This is the loading page until card data is retrieved.
  if (!cardData) {return <div>Building the best cube ever...one second please!</div>;}
  //Sorts the card data alphabetically.
  cardData.sort((a, b) => a.name.localeCompare(b.name));

  const discordNameSetter = (event) => { setDiscordName(event.target.value); };

  const discordNamesArray = [
    "Captainspazam (Struggles)",
    "CombatWombat (Kyle)",
    "Cwwisch (Chad)",
    "Droopsnout (Grey)",
    "EtheriumSculptor (Jake)",
    "TheDragonsFang (Iris)",
    "Trax (Mateo)",
    "MrMaps (Corey)",
    "Freakbro5 (Christan)",
    "JustUnbearable (Nick)",
    "DLung7 (David)",
    "Dwarf (Jon)",
    "Strexco (EJ)",
    "Eldritch_Butts (Tyler)",
    "Jondre (Jack)",
    "KingSMH (Shawn)",
    "McDonaldsSprite (Hailey <3)",
    "Meggplant (Egg)",
    "Thesageknight (Nick)"
  ];
  discordNamesArray.sort((a, b) => a.localeCompare(b));


const addCard = (cardId) =>{

  if (!discordName) {
    alert("Please select a Discord name before adding a card.");
    return;}
 
  const updatedCardData = cardData.map(card => {
      
    if (card.id === cardId && card.numberNeeded > 0) {
      cardsToBeAdded.push(cardId);
      return { ...card, numberNeeded: card.numberNeeded - 1 };
    }
    return card;
  });

  setCardData(updatedCardData);
}

const uploadToCube = async (cardsToBeAdded) => {

  if (cardsToBeAdded.length === 0) {
    window.alert("You don't have any cards to upload! Click 'Add Card' buttons to get a list of cards going.");
    return;
  }

  const userConfirmed = window.confirm(`You are uploading this many cards to the cube: ${cardsToBeAdded.length}\nIs that okay?`);
  
  if (userConfirmed) {

    let compactUploadList = [];

    for (let i = 0; i < cardsToBeAdded.length; i++) {
      const cardIndex = compactUploadList.findIndex(item => item.cardId === cardsToBeAdded[i]);

      if (cardIndex !== -1) {
        compactUploadList[cardIndex].count++;
      } 
      else {
        compactUploadList.push({ cardId: cardsToBeAdded[i], count: 1 });
      }
    }


    try {
      const response = await axios.post('https://hovel-backend-648542156002.us-central1.run.app/api/cards/uploadCards', {
        cardList: compactUploadList.map(item => ({ cardId: item.cardId, count: item.count })),
        username: encodeURIComponent(discordName)
      });
      

      const uploadedCount = response.data;

      alert(`Upload successful! You uploaded ${uploadedCount} card(s)!`);
      setCardsToBeAdded([]); 

    } catch (error) {
      console.error('Error adding card:', error);
      alert('There was an error uploading your cards. Please try again.');
    }
  } else {
    alert('Upload canceled.');
  }
};


  const removeCard = async (cardId) => {
    if (!discordName) {
      alert("Please select a Discord name before removing a card.");
      return;
    }

    const updatedCardData = cardData.map(card => {
      
      if (card.id === cardId && cardsToBeAdded.includes(cardId)) {
        cardsToBeAdded.splice(cardsToBeAdded.indexOf(cardId),1);
        return { ...card, numberNeeded: card.numberNeeded+1 };
      }
      return card;
    });

    setCardData(updatedCardData);

  };

  const totalCardsNeeded = cardData.reduce((total, card) => total + card.numberNeeded, 0);
  const filteredCardData = collectedFilter
  ? cardData.filter(card => card.numberNeeded > 0)
  : cardData;

  const toggleCollectedCardFilter = () => {setCollectedFilter(!collectedFilter);}

  return (
    <div>
      <TextDisplay />
      <h2>Total Cards Needed: {totalCardsNeeded}</h2>
      <Box sx={{ minWidth: 800 }}>
        <FormControl sx={{ m: 1, minWidth: 300 }}>
          <InputLabel id="discord-name-select-label">Discord Name</InputLabel>
          <Select
            labelId="discord-name-select-label"
            id="discord-name-select"
            value={discordName}
            label="Discord Name"
            onChange={discordNameSetter}
          >
            {discordNamesArray.map((name, index) => (
              <MenuItem key={index} value={name}>{name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={<Checkbox
                    checked={collectedFilter}
                    onChange={toggleCollectedCardFilter}
                    inputProps={{ 'aria-label': 'controlled' }}
                    />}
          label="Show Only Cards Still Needed"
        />
        <Button 
        variant="contained" 
        size="large" 
        className="card-button" 
        onClick={() => uploadToCube(cardsToBeAdded)}>
          Upload All Selected Cards to the Cube</Button>
      </Box>
      <div className="card-container">
        {filteredCardData.map(card => {

          const canRemove = cardsToBeAdded.includes(card.id);
          const cardBackgroundColor = card.numberNeeded === 0 ? '#b0eaa0' : 'white';

          return (
            <div key={card.id} className="card" style={{ backgroundColor: cardBackgroundColor }}>
              <Stack
                spacing={2}
                direction="column"
                alignItems="center"
                className="card-stack"
              >
                <img src={card.imageUri} alt={card.name} className="card-image" />
                <p className="card-name">{card.name}</p>
                <p className="amount-needed">Amount Needed: {card.numberNeeded}</p>
                <Stack
                  direction="row"
                  spacing={2}
                  className="button-stack"
                >
                  {canRemove && (
                    <Button 
                    variant="outlined" size="small" className="card-button" onClick={() => removeCard(card.id)}>
                      Remove -</Button>)}
                  <Button 
                  variant="contained" size="small" className="card-button" onClick={() => addCard(card.id)}>
                    Add +</Button>
                </Stack>
              </Stack>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TarkirDSCube;
