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
/* import cardList from './card-list.json'; */
import TextField from '@mui/material/TextField';

const CardDisplay = () => {
  const [cardData, setCardData] = useState(null);
  const [discordName, setDiscordName] = useState('');
  const [specificCardName, setSpecificCardName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/cards');
        setCardData(response.data);
      } catch (error) {
        console.error('Error fetching card data:', error);
      }
    };

    fetchData();
  }, []);

  if (!cardData) {
    return <div>Building the best cube ever...one second please!</div>;
  }

  cardData.sort((a, b) => a.name.localeCompare(b.name));

  const handleChange = (event) => { setDiscordName(event.target.value); };

  const discordNamesArray = [
    "Captainspazam (Struggles)",
    "CombatWombat (Kyle)",
    "Cwwisch (Chad)",
    "Droopsnout (Grey)",
    "EtheriumSculptor (Jake)",
    "TheDragonsFang (Iris)",
    "Trax (Mateo)",
    "MrMaps (Corey)",
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

  const addCard = async (cardId) => {
    if (!discordName) {
      alert("Please select a Discord name before adding a card.");
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/cards/add', null, {
        params: {
          cardId: encodeURIComponent(cardId),
          username: encodeURIComponent(discordName)
        }
      });
      const response = await axios.get('http://localhost:8080/api/cards');
      setCardData(response.data);
    } catch (error) {
      console.error('Error adding card:', error);
    }
  };

  const removeCard = async (cardId) => {
    if (!discordName) {
      alert("Please select a Discord name before removing a card.");
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/cards/remove', null, {
        params: {
          cardId: encodeURIComponent(cardId),
          username: encodeURIComponent(discordName)
        }
      });
      const response = await axios.get('http://localhost:8080/api/cards');
      setCardData(response.data);
    } catch (error) {
      console.error('Error removing card:', error);
    }
  };

 /*  const addSpecificCards = async () => {
    const specificCard = cardList.find(card => card.name === specificCardName);
    if (!specificCard) {
      alert("Card not found in the JSON file.");
      return;
    }

    const cardDetails = {
      name: specificCard.name,
      rarity: specificCard.rarity,
      cardNumber: specificCard.collector_number,
      colors: specificCard.colors,
      manaValue: specificCard.cmc,
      imageUri: specificCard.image_uris.normal,
      setCode: specificCard.set,
      usernames: [],
    };

    try {
      await axios.post('http://localhost:8080/api/cards', cardDetails);
      const response = await axios.get('http://localhost:8080/api/cards');
      setCardData(response.data);
    } catch (error) {
      console.error('Error adding card:', error);
    }
  }; */

  const totalCardsNeeded = cardData.reduce((total, card) => total + card.numberNeeded, 0);

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
            onChange={handleChange}
          >
            {discordNamesArray.map((name, index) => (
              <MenuItem key={index} value={name}>{name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ m: 2 }}>
        <TextField
          id="specific-card-name"
          label="Specific Card Name"
          variant="outlined"
          fullWidth
          value={specificCardName}
          onChange={(e) => setSpecificCardName(e.target.value)}
        />
      </Box>
      <div className="card-container">
        {cardData.map(card => {
          const decodedUsernames = card.usernames.map(username => decodeURIComponent(username));
          const decodedDiscordName = decodeURIComponent(discordName);

          const canRemove = decodedUsernames.includes(decodedDiscordName);
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
                  <Button variant="contained" size="small" className="card-button" onClick={() => addCard(card.id)}>Add Card</Button>
                  {canRemove && (
                    <Button variant="outlined" size="small" className="card-button" onClick={() => removeCard(card.id)}>Remove Card</Button>
                  )}
                </Stack>
              </Stack>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardDisplay;
