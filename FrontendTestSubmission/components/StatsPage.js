import React from 'react';
import { getStats } from '../services/api';
import { Card, Typography } from '@mui/material';

const StatsPage = () => {
  const stats = getStats();

  return (
    <Card sx={{ p: 2, m: 2 }}>
      <Typography variant="h5">Shortened URL Stats</Typography>
      {stats.map((url, i) => (
        <Card key={i} sx={{ p: 1, m: 1 }}>
          <Typography>Short: {url.shortCode}</Typography>
          <Typography>Long: {url.longURL}</Typography>
          <Typography>Created At: {url.createdAt.toString()}</Typography>
          <Typography>Expires At: {url.expiresAt.toString()}</Typography>
          <Typography>Total Clicks: {url.clicks}</Typography>
          {url.clickDetails.map((c, j) => (
            <div key={j}>
              <Typography>Click: {c.timestamp.toString()} | {c.source} | {c.location}</Typography>
            </div>
          ))}
        </Card>
      ))}
    </Card>
  );
};

export default StatsPage;
