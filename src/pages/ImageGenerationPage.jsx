import React, { useEffect, useRef } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';

const imageURLList = [
  {
    id: 1,
    name: 'Obliteration',
    url: 'https://ucs.piugame.com/data/song_img2/54480f352a3f0efb13d92bdf6cce022a.png',
  },
  {
    id: 2,
    name: 'Last Rebirth',
    url: 'https://ucs.piugame.com/data/song_img2/0b872960a24a9c72cae2050cb371c45c.png',
  },
  {
    id: 3,
    name: 'Horang Pungryuga',
    url: 'https://ucs.piugame.com/data/song_img2/ff5e51e70c41cfb7d92c5ee7a7f4dd9c.png',
  },
  {
    id: 4,
    name: 'Red Snow',
    url: 'https://ucs.piugame.com/data/song_img2/c985f90bafd86a343799244bd18aa7dc.png',
  },
];

export default function ImageGenerationPage() {
  const [imageObject, setImageObject] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasDrawer = canvas.getContext('2d');
  }, []);

  const handleImageSelection = (event, newValue) => {
    console.log('handleImageSelection', { event, newValue });
    setImageObject(newValue);

    const canvas = canvasRef.current;
    const canvasDrawer = canvas.getContext('2d');
  };

  const drawThumbnail = () => {

  };

  return (
    <div>
      <h1>{'Image Generation Page'}</h1>
      <canvas width={360} height={240} ref={canvasRef} />
      <Autocomplete
        sx={{ width: '300px' }}
        // options={imageURLList?.map(imageObject => imageObject?.name)}
        options={imageURLList}
        getOptionLabel={(option) => option?.name}
        isOptionEqualToValue={(option, value) => option?.id === value?.id}
        renderInput={(params) => <TextField {...params} label="Song Jacket" />}
        onChange={handleImageSelection}
      />
      <img src={imageObject?.url} alt={imageObject?.name} />
      <br />
      <img src="https://ucs.piugame.com/data/song_img2/a5cdeb1b546d6bbd592dd202c3a79345.png" alt="Alt Image" />
    </div>
  );
}
