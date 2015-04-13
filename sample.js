var personSchema = Schema({
    _id     : Number,
    name    : String,
    age     : Number,
    stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
  });

  var storySchema = Schema({
    _creator : { type: Number, ref: 'Person' },
    title    : String,
    fans     : [{ type: Number, ref: 'Person' }]
  });

  var Story  = mongoose.model('Story', storySchema);
  var Person = mongoose.model('Person', personSchema);


  var arron = new Person({ _id: 0, name: 'Araon', age: 100 });

  arron.save(function(err, result) {
    if(err) console.log(err);

    var story1 = new Story({
      title: "Once upon a timex",
      _creator: arron._id
    });

    story1.save(function(err, storyResult) {
      if(err) console.log(err);

      console.log("Story result:", storyResult);
    });

    arron.stories.push(story1);
    console.log("People result:", result);
  });
