const mongoose = require('mongoose'); 

const schema = new mongoose.Schema({
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true
  },
  dateOfEvent: {
    type: Date,
    required: true
  },
  notes: {
    type: String,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  }
});

schema.virtual('day')
  .get(function() {
    return this.dateOfEvent.getDay();
  })
  .set(function(day) {
    this.dateOfEvent.setDate(day);
  });

schema.virtual('month')
  .get(function() {
    return this.dateOfEvent.getMonth();
  })
  .set(function(month) {
    this.dateOfEvent.setMonth(month);
  });

schema.virtual('year')
  .get(function() {
    return this.dateOfEvent.getFullYear();
  })
  .set(function(year) {
    this.dateOfEvent.setYear(year);
  });


module.exports = mongoose.model('Event', schema);
