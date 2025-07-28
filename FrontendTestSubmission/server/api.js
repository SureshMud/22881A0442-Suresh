// src/services/api.js
let urlDB = [];
let clicksDB = [];

export const createShortURL = ({ longURL, validity, customCode }) => {
  const shortCode = customCode || Math.random().toString(36).substring(2, 8);
  const existing = urlDB.find(u => u.shortCode === shortCode);
  if (existing && !customCode) return { error: 'Short code already exists' };

  const createdAt = new Date();
  const expiresAt = new Date(createdAt.getTime() + (validity || 30) * 60000);
  const newURL = {
    longURL, shortCode, createdAt, expiresAt, clicks: 0
  };

  urlDB.push(newURL);
  return newURL;
};

export const getStats = () => {
  return urlDB.map(url => ({
    ...url,
    clickDetails: clicksDB.filter(c => c.shortCode === url.shortCode)
  }));
};

export const registerClick = (shortCode) => {
  const click = {
    shortCode,
    timestamp: new Date(),
    source: window.location.href,
    location: "India"
  };
  clicksDB.push(click);

  const url = urlDB.find(u => u.shortCode === shortCode);
  if (url) url.clicks += 1;

  return url ? url.longURL : null;
};
