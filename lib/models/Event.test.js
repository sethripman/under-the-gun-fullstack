const Event = require('./Event');

describe('Event model', () => {
  it('has a required recipeId', () => {
    const event = new Event();
    const { errors } = event.validateSync();

    expect(errors.recipe.message).toEqual('Path `recipe` is required.');
  });

  it('has a required dateOfEvent', () => {
    const event = new Event();
    const { errors } = event.validateSync();

    expect(errors.dateOfEvent.message).toEqual('Path `dateOfEvent` is required.');
  });
  it('has a required rating', () => {
    const event = new Event();
    const { errors } = event.validateSync();

    expect(errors.rating.message).toEqual('Path `rating` is required.');
  });
  it('has a required a rating of 0 or above', () => {
    const event = new Event({ rating: -1 });
    const { errors } = event.validateSync();

    expect(errors.rating.message).toEqual('Path `rating` (-1) is less than minimum allowed value (0).');
  });
  it('has a required rating a rating of 5 or lower', () => {
    const event = new Event({ rating: 6 });
    const { errors } = event.validateSync();

    expect(errors.rating.message).toEqual('Path `rating` (6) is more than maximum allowed value (5).');
  });
  it('returns the day based on the date', () => {
    const event = new Event({
      dateOfEvent: new Date('December 12, 2019')
    });


    expect(event.day).toEqual(4);
  });
  it('returns the month based on the date', () => {
    const event = new Event({
      dateOfEvent: new Date('December 12, 2019')
    });


    expect(event.month).toEqual(11);
  });
  it('returns the year based on the date', () => {
    const event = new Event({
      dateOfEvent: new Date('December 12, 2019')
    });


    expect(event.year).toEqual(2019);
  });
});
