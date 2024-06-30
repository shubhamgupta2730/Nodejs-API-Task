const shortid = require('shortid');
const URL = require('../models/urlModel');

const generateShortURL = async (req, res) => {
  const { redirectURL } = req.body;

  if (!redirectURL) {
    return res.status(400).json({
      error: "URL is required"
    });
  }

  try {
    const shortID = shortid.generate();
    const newUrl = await URL.create({
      shortId: shortID,
      redirectURL
    });

    const shortURL = `${req.protocol}://${req.get('host')}/api/v1/${newUrl.shortId}`;

    res.status(201).json({
      message: 'Short URL created successfully',
      shortURL,
      redirectURL: newUrl.redirectURL
    });
  } catch (error) {
    console.error('Error generating short URL:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};

const handleRedirect = async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await URL.findOne({ shortId });

    if (!url) {
      return res.status(404).json({
        error: 'Short URL not found'
      });
    }

    res.redirect(url.redirectURL);
  } catch (error) {
    console.error('Error handling redirect:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};

module.exports = { generateShortURL, handleRedirect };
