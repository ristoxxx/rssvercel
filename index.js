/*
 * File: index.js
 * Created Date: Tuesday February 4th 2025 12:08:37
 * Author: ristoxxx@github.com
 * -----
 * Last Modified: Saturday February 8th 2025 01:43:02
 * Modified By: ristoxxx@github.com
 * -----
 * Copyright (c) 2025 ristoxxx@github.com
 */
import express from 'express'
import cors from 'cors'
import RSSParser from 'rss-parser'


const feedUrl = 'https://feeds.yle.fi/uutiset/v1/majorHeadlines/YLE_UUTISET.rss'

const parser = new RSSParser();
let articles = [];

const feed = await parser.parseURL(feedUrl);

feed.items.forEach(item => {
    articles.push({
        title: item.title,
        link: item.link,
        description: item.description
    });
  });

const app = express();

app.use(cors());

app.get('/articles', (req, res) => {
    res.json(articles);
});

const server = app.listen("4000", () => {
    console.log("Server is running on ort 4000");
})

export default server;
//hello