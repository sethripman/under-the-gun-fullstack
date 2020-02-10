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
  let events;
  beforeEach(async() => {
    recipe = await Recipe.create(
      { name: 'cookies', directions: [
        'preheat oven to 375',
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'
      ], ingredients: [{ amount: 3, measurement: 'tablespoon', name: 'Brown Suger' }] });
    events = await Event.create([
      {
        recipe: recipe._id,
        dateOfEvent: new Date(),
        notes: 'Could have been better',
        rating: 3
      }
    ]);
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a recipe', () => {
    return request(app)
      .post('/api/v1/recipes')
      .send({
        name: 'cookies',
        directions: [
          'preheat oven to 375',
          'mix ingredients',
          'put dough on cookie sheet',
          'bake for 10 minutes'
        ],
        ingredients: [{ amount: 3, measurement: 'tablespoon', name: 'Brown Suger' }]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'cookies',
          directions: [
            'preheat oven to 375',
            'mix ingredients',
            'put dough on cookie sheet',
            'bake for 10 minutes'
          ],
          ingredients: [{ _id: expect.any(String), amount: 3, measurement: 'tablespoon', name: 'Brown Suger' }],
          __v: 0
        });
      });
  });

  it('gets all recipes', async() => {
    const recipes = await Recipe.create([
      { name: 'cookies', directions: [] },
      { name: 'cake', directions: [] },
      { name: 'pie', directions: [] }
    ]);

    return request(app)
      .get('/api/v1/recipes')
      .then(res => {
        recipes.forEach(recipe => {
          expect(res.body).toContainEqual({
            _id: recipe._id.toString(),
            name: recipe.name
          });
        });
      });
  });
  it('gets a recipe by id', async() => {
    return request(app)
      .get(`/api/v1/recipes/${recipe._id}`)
      .then(res => {
        expect(res.body).toMatchObject({
          _id: recipe._id.toString(),
          name: recipe.name,
          directions: [
            'preheat oven to 375',
            'mix ingredients',
            'put dough on cookie sheet',
            'bake for 10 minutes'
          ],
          ingredients: [{ _id: expect.any(String), amount: 3, measurement: 'tablespoon', name: 'Brown Suger' }],
          events: JSON.parse(JSON.stringify(events)),
          __v: recipe.__v
        });
      });
  });
      
 

  it('updates a recipe by id', async() => {
    return request(app)
      .patch(`/api/v1/recipes/${recipe._id}`)
      .send({ name: 'good cookies' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'good cookies',
          directions: [
            'preheat oven to 375',
            'mix ingredients',
            'put dough on cookie sheet',
            'bake for 10 minutes'
          ],
          ingredients: [{ _id: expect.any(String), amount: 3, measurement: 'tablespoon', name: 'Brown Suger' }],
          __v: 0
        });
      });
  });
  it('can delete a recipe with DELETE', async() => {
    return request(app)
      .delete(`/api/v1/recipes/${recipe._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: recipe._id.toString(),
          name: recipe.name,
          directions: [
            'preheat oven to 375',
            'mix ingredients',
            'put dough on cookie sheet',
            'bake for 10 minutes'
          ],
          ingredients: [{ _id: expect.any(String), amount: 3, measurement: 'tablespoon', name: 'Brown Suger' }],
          __v: recipe.__v
        });

        return Event.find();
      })
      .then(events => {
        expect(events).toHaveLength(0);
      });
  });
});
