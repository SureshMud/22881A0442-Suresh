import React, { useState } from 'react';
import { TextField, Button, Card, Typography } from '@mui/material';
import logger from '../loggerMiddleware';
import { createShortURL } from '../services/api';

const URLShortener = ({ onNewShortened }) => {
  const [urls, setUrls] = useState([{ longURL: '', validity: 30, customCode: '' }]);

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const addMore = () => {
    if (urls.length < 5) setUrls([...urls, { longURL: '', validity: 30, customCode: '' }]);
  };

  const handleSubmit = () => {
    urls.forEach((url) => {
      const res = createShortURL(url);
      if (res?.error) {
        logger("ERROR", res.error);
        alert(res.error);
      } else {
        logger("INFO", `Short URL created for ${url.longURL}`);
        onNewShortened(res);
      }
    });
  };

  return (
    <Card sx={{ p: 2, m: 2 }}>
      <Typography variant="h5">URL Shortener</Typography>
      {urls.map((url, idx) => (
        <div key={idx}>
          <TextField fullWidth label="Long URL" value={url.longURL}
            onChange={(e) => handleChange(idx, 'longURL', e.target.value)} />
          <TextField label="Validity (mins)" type="number" value={url.validity}
            onChange={(e) => handleChange(idx, 'validity', e.target.value)} />
          <TextField label="Custom Short Code" value={url.customCode}
            onChange={(e) => handleChange(idx, 'customCode', e.target.value)} />
        </div>
      ))}
      <Button onClick={addMore}>Add More</Button>
      <Button onClick={handleSubmit} variant="contained">Shorten</Button>
    </Card>
  );
};

export default URLShortener;
