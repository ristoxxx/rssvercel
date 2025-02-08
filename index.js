const express = require('express');
const RSSParser = require('rss-parser');
const app = express();
const PORT = 4000;

const feedUrl = 'https://feeds.yle.fi/uutiset/v1/majorHeadlines/YLE_UUTISET.rss';
const parser = new RSSParser();
let articles = [];

async function fetchFeed() {
    try {
        const feed = await parser.parseURL(feedUrl);
        articles = feed.items.map(item => ({
            title: item.title,
            link: item.link,
            description: item.description
        }));
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
        articles = []; // Fallback to empty array in case of failure
    }
}

fetchFeed();

app.get('/home', (req, res) => {
  res.status(200).json('Welcome, your app is working well');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;
