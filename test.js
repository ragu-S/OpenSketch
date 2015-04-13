module.exports = function() {
  console.log("calling test");
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var Message = mongoose.model('Message', new Schema({
    messageId : String,
    userId : String,
    messageContent: String,
    dateCreated: Date
  }));

  var User = mongoose.model('User', new Schema({
    //canvasRefId: { type: Schema.Types.ObjectId, ref: 'CanvasSession' },
    userId: String,
    username: String,
    userRank: Number,
    premissions: {
      canDraw: Boolean,
      canChat: Boolean
    }
  }));

  var CanvasSession = mongoose.model('CanvasSession', new Schema({
    canvasId : String,
    //users    : [{ type: Schema.Types.ObjectId, ref: 'User' }],
    users : [],
    dateCreated : Date,
    dateUpdated : Date,
    sessionProperties : {
      maxUsers: Number,
      chatEnabled: Boolean,
      drawEnabled: Boolean
    },
    canvasShapes: [],
    messages: []
    //messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
  }));

  function emit(err, result) {
    console.log(result);
    return result;
  }
  function callback() {
    console.log("Calling Callback");
    CanvasSession
      .find({ 'canvasId' : '1' }, { _id: 0, 'users' : 1 })//, '$.users', { users : 1, _id: 0 })
      .exec(function(err, result) {
        if(err) console.log("err", err);

        console.log("Results:", result);
      });
    //CanvasSession
    // User
    //   .find()
    //   //.populate('canvasRefId')
    //   .populate({
    //     path: 'users',
    //     match: { username: { $eq: "John0" }},
    //     select: 'username -_id'
    //   })
    //   .exec(function(err, result) {
    //     if(err) console.log("err", err);
    //     else {
    //       console.log("Results:", result);
    //       //console.log(docUsers);
    //       //console.log(result.users.username('John0'));
    //     }
    //   });
  }

  function callbackSet() {
    console.log("Calling Callback with $set");

    // CanvasSession
    //   .find({ 'canvasId' : '0' }, { _id: 0, users : { $elemMatch: { username: "John0" }}})
    //   .exec(function(err, result) {
    //     console.log(result);
    //     //console.log(result[0].users[0]);
    //   });
    // CanvasSession
    //   .aggregate(
    //     { $match: {
    //       "canvasId" : "0"
    //     }},
    //     { $unwind : "$users" },
    //     { $match : {
    //       "users.username" : 'John0'
    //     }},
    //     { $project :
    //       {
    //         users : 1,
    //         _id: 0 // suppress auto-id generation
    //       }
    //     }
    //   )
    //   .exec(function(err, result) {
    //     console.log(result);
    //   });

    // CanvasSession
    //   .update(
    //     {
    //       'canvasId' : '0',
    //       'users.username': "John0"
    //     },
    //     {
    //       $set: {
    //         'users.$.username' : 'John5'
    //       }
    //     }
    //   )
    //   .exec(function(err, result) {
    //     console.log(result);
    //   });

    CanvasSession
      .findOne({ 'canvasId' : '0' })
      .exec(function(err, res) {
        console.log(res);

        // res.users.push({
        //   userId: 'canvasSession0John0',
        //   username: 'John89',
        //   userRank: 3,
        //   premissions: {
        //     canDraw: true,
        //     canChat: false
        //   }
        // });

        //res.save(emit);
      });



    // users.push({
    //   userId: 'canvasSession0John0',
    //   username: 'John89',
    //   userRank: 3,
    //   premissions: {
    //     canDraw: true,
    //     canChat: false
    //   }
    // });

    /******* Map Reduce ******/
    // function map() {
    //   filteredUsers = [];

    //   this.users.forEach(function(user) {
    //     if(user.userRank > 0) {
    //       filteredUsers.push(user);
    //     }
    //   });

    //   emit(this._id, { users: filteredUsers });
    // }

    // function reduce(key, values) {
    //   return values[0];
    // }

    // CanvasSession.mapReduce(map, reduce, {
    //   out: "filtered_results"
    // });
    // res.find().exec(function(err, result) {
    //   console.log(result);
    // });
    //console.log(res);
    //CanvasSession[res.result].find();
  }
  /*userId: String,
    username: String,
    userRank: Number,
    premissions: {
      canDraw: Boolean,
      canChat: Boolean
    }*/
  // var userArray = [];
  // var TempUser = function(i) {
  //     // this.canvasRefId = '551c3a09a6e6e9d8d8da8b30';
  //     this.userId = i;
  //     this.username = "John" + i;
  //     this.userRank = i;
  //     this.premissions = {
  //       canDraw: userArray.length%2 === 0,
  //       canChat: userArray.length%2 !== 0
  //     };
  // };

  // for(var i = 0; i < 3; i++) {
  //   userArray.push(new TempUser(i));
  // }
  //   new User(new TempUser(i))
  //     .save(function(err, result) {
  //       if(err) console.log(err);
  //       else {
  //         console.log("result:",i,"is", result);
  //         if(i === 3) callback();
  //       }
  //     });
  // }

  //console.log(userArray);

  // var session1 = new CanvasSession({
  //   canvasId: 1,
  //   users: [],
  //   dateCreated: Date.now(),
  //   dateUpdated : Date.now(),
  //   sessionProperties : {
  //     maxUsers: 3,
  //     chatEnabled: true,
  //     drawEnabled: false
  //   },
  //   canvasShapes: [],
  //   messages: []
  // });

  // session1.save(function(err, result) {
  //   if(err) console.log("Err", err);
  //   else{
  //     //console.log("Result", result);

  //     userArray.forEach(function(user) {
  //       result.users.push(user);
  //     });

  //     result.save(function(err, result) {
  //       if(err) console.log(err);
  //       else
  //         console.log("Result", result);
  //         //callbackSet();
  //         callback();
  //     });
  //     //callback();
  //   }
  // });
  callback();
  //CanvasSession.
  //callbackSet();
};












