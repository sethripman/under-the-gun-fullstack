require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Recipe = require('../lib/models/Recipe');
const Event = require('../lib/models/Event');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let recipe;
  let event;
  beforeEach(async() => {
    recipe = await Recipe.create(
      { name: 'cookies', directions: [
        'preheat oven to 375',
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'
      ], ingredients: [{ amount: 3, measurement: 'tablespoon', name: 'Brown Suger' }] });
    event = await Event.create(
      {
        recipe: recipe._id,
        dateOfEvent: new Date(),
        notes: 'Could have been better',
        rating: 3
      },
    );
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates an event', () => {
    return request(app)
      .post('/api/v1/events')
      .send({
        recipe: recipe._id,
        dateOfEvent: Date.now(),
        notes: 'Could have been better',
        rating: 3
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          recipe: recipe._id.toString(),
          dateOfEvent: expect.any(String),
          notes: 'Could have been better',
          rating: 3,
          __v: 0
        });
      });
  });

  it('gets all events', async() => {
    const events = await Event.create([
      { recipe: recipe._id, dateOfEvent: Date.now(), rating: 4 },
      { recipe: recipe._id, dateOfEvent: Date.now(), rating: 3 },
      { recipe: recipe._id, dateOfEvent: Date.now(), rating: 2 },
      { recipe: recipe._id, dateOfEvent: Date.now(), rating: 1 },
    ]);
  

    return request(app)
      .get('/api/v1/events')
      .then(res => {
        events.forEach(event => {
          expect(res.body).toContainEqual(JSON.parse(JSON.stringify(event)));
        });
      });
  });
  it('gets a event by id', async() => {
    return request(app)
      .get(`/api/v1/events/${event._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          recipe: JSON.parse(JSON.stringify(recipe)),
          dateOfEvent: expect.any(String),
          notes: 'Could have been better',
          rating: 3,
          __v: 0
        });
      });
  });
      
 

  it('updates a event by id', async() => {
    return request(app)
      .patch(`/api/v1/events/${event._id}`)
      .send({ rating: 5 })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          recipe: recipe._id.toString(),
          dateOfEvent: expect.any(String),
          notes: 'Could have been better',
          rating: 5,
          __v: 0
        });
      });
  });
  it('can delete a recipe with DELETE', async() => {
    return request(app)
      .delete(`/api/v1/events/${event._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          recipe: recipe._id.toString(),
          dateOfEvent: expect.any(String),
          notes: 'Could have been better',
          rating: 3,
          __v: 0
        });
      });
  });
});
