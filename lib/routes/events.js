const express = require('express');
const Router = express.Router();
const Event = require('../models/Event');

Router.use(express.json());

Router.post('/api/v1/events', (req, res) => {
  Event
    .create(req.body)
    .then(event => res.send(event));
});

Router.get('/api/v1/events', (req, res) => {
  Event
    .find()
    .select({ notes: false })
    .then(events => res.send(events));
});

Router.get('/api/v1/events/:id', (req, res) => {
  Event
    .findById(req.params.id)
    .populate('recipe')
    .then(event => res.send(event));
});

Router.patch('/api/v1/events/:id', (req, res) => {
  Event
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(event => res.send(event));
});

Router.delete('/api/v1/events/:id', (req, res) => {
  Event
    .findByIdAndDelete(req.params.id)
    .then(event => res.send(event));
});
module.exports = Router;
