const express = require('express');
const RSSParser = require('rss-parser');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = 4000;

const feedUrls = {
    yle: 'https://feeds.yle.fi/uutiset/v1/majorHeadlines/YLE_UUTISET.rss',
    hs: 'http://www.hs.fi/rss/tuoreimmat.xml',
    euro: 'https://europeannewsroom.com/feed/'
};

const parser = new RSSParser();

async function fetchFeed(feedUrl) {
    try {
        const feed = await parser.parseURL(feedUrl);
        return feed.items.map(item => ({
            title: item.title,
            link: item.link,
            description: item.description
        }));
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
        return []; // Palautetaan tyhjä lista, jos haku epäonnistuu
    }
}

// Asynkroninen reitti, joka odottaa `fetchFeed`-funktion valmistumista ennen vastaamista
app.get('/yle', async (req, res) => {
    const articles = await fetchFeed(feedUrls.yle);
    res.status(200).json(articles);
});

app.get('/articles', async (req, res) => {
  const articles = await fetchFeed(feedUrls.yle);
  res.status(200).json(articles);
});

app.get('/hs', async (req, res) => {
    const articles = await fetchFeed(feedUrls.hs);
    res.status(200).json(articles);
});

app.get('/euro', async (req, res) => {
    const articles = await fetchFeed(feedUrls.euro);
    res.status(200).json(articles);
});

app.get('/home', (req, res) => {
    res.status(200).json('Welcome, your app is maybe working well');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;
