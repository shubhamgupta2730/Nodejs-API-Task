const shortid = require('shortid');
const URL = require('../models/urlModel');

async function generateShortURL(req, res) {
  try {
    const { redirectURL, baseURL } = req.body;
    const shortId = shortid.generate(); 
    const newUrl = await URL.create({
      shortId: shortId,
      redirectURL: redirectURL
    });

   
    const shortenedURL = `${baseURL}/${newUrl.shortId}`;

    res.status(201).json({
      message: 'Short URL created successfully',
      shortId: newUrl.shortId,
      shortenedURL: shortenedURL, 
      redirectURL: newUrl.redirectURL
    });
  } catch (error) {
    console.error('Error generating short URL:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { generateShortURL };
