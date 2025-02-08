const express = require('express');
const cors = require('cors');
const RSSParser = require('rss-parser');

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

// Fetch the feed at startup
//fetchFeed();

const app = express();
app.use(cors());

// app.get('/articles', (req, res) => {
//     res.json(articles);
// });
app.get('/home', (req, res) => {
    res.status(200).json('Welcome, your app is working well');
  });

const port = 4004;
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = server;
