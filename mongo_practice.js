// create collection movies
db.createCollection("movies");

// Insert Documents
db.movies.insertMany([
  {
    title: "Fight Club",
    writer: "Chuck Palahniuk",
    year: 1999,
    actors: ["Brad Pitt", "Edward Norton"]
  },
  {
    title: "Pulp Fiction",
    writer: "Quentin Tarantino",
    year: 1994,
    actors: ["John Travolta", "Uma Thurman"]
  },
  {
    title : "Inglorious Basterds",
    writer : "Quentin Tarantino",
    year : 2009,
    actors : ["Brad Pitt", "Diane Kruger", "Eli Roth"]
  },
  {
    title : "The Hobbit: An Unexpected Journey",
    writer : "J.R.R. Tolkein",
    year : 2012,
    franchise : "The Hobbit"
  },
  {
    title : "The Hobbit: The Desolation of Smaug",
    writer : "J.R.R. Tolkein",
    year : 2013,
    franchise : "The Hobbit"
  },
  {
    title : "The Hobbit: The Battle of the Five Armies",
    writer : "J.R.R. Tolkein",
    year : 2012,
    franchise : "The Hobbit",
    synopsis : "Bilbo and Company are forced to engage in a war against an array of combatants and keep the Lonely Mountain from falling into the hands of a rising darkness."
  }
]);

db.movies.insertMany([
  {
    title: "Pee Wee Herman's Big Adventure"
  },
  {
    title : "Avatar"
  }
]);

// Query/Find Documents
// 1. Get all documents
db.movies.find();
// 2. Get all documents with writer set to "Quentin Tarantino"
db.movies.find({"writer": "Quentin Tarantino"});
// 3. Get all documents where actors include "Brad Pitt"
db.movies.find({"actors": "Brad Pitt"});
// 4. Get all documents with franchise set to "The Hobbit"
db.movies.find({"franchise": "The Hobbit"});
// 5. Get all movies released in the 90s
db.movies.find({"year": {$gt: 1989, $lte: 1999}});
// 6. Get all movies released before the year 2000 or after 2010
db.movies.find({$or: [{ "year": {$lt: 2000} }, { "year": {$gt: 2010}}]});

// Update Documents
// 1. add a synopsis to "The Hobbit: An Unexpected Journey".
db.movies.update(
  { "title": "The Hobbit: An Unexpected Journey"},
  {
    $set: {"synopsis": "A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it - from the dragon Smaug."}
  }
);
// 2. add a synopsis to "The Hobbit: The Desolation of Smaug".
db.movies.update(
  { "title": "The Hobbit: The Desolation of Smaug"},
  {
    $set: {"synopsis": "The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring."}
  }
);
// 3. add an actor named "Samuel L. Jackson" to the movie "Pulp Fiction"
db.movies.update(
  { "title": "Pulp Fiction"},
  {
    $push: {"actors": "Samuel L. Jackson"}
  }
);

// Text Search
// 1. find all movies that have a synopsis that contains the word "Bilbo"
db.movies.find({ "synopsis": /Bilbo/});
// 2. find all movies that have a synopsis that contains the word "Gandalf"
db.movies.find({ "synopsis": /Gandalf/});
// 3. find all movies that have a synopsis that contains the word "Bilbo" and not the word "Gandalf"
db.movies.find({$and: [{"synopsis": /Bilbo/ }, {"synopsis": {$not: /Gandalf/}}]});
// 4. find all movies that have a synopsis that contains the word "dwarves" or "hobbit"
db.movies.find({$or: [{"synopsis": /dwarves/}, {"synopsis": /hobbit/}]});
// 5. find all movies that have a synopsis that contains the word "gold" and "dragon"
db.movies.find({$and: [{"synopsis": /gold/}, {"synopsis": /dragon/}]});

// Delete Documents
// 1. delete the movie "Pee Wee Herman's Big Adventure"
db.movies.remove(
  {"title": "Pee Wee Herman's Big Adventure"}
);
// 2. delete the movie "Avatar"
db.movies.remove(
  {"title": "Avatar"}
);

// Relationships
// Insert into a users collection
db.createCollection("users");

db.users.insertMany([
  {
    username: "GoodGuyGreg",
    title: "Passes out at party",
    body: "Wakes up early and cleans house"
  },
  {
    username: "ScumbagSteve",
    full_name:
      {
        first : "Scumbag",
        last : "Steve"
      }
  }
]);

// Insert into a posts collection
db.createCollection("posts");

db.posts.insertMany([
  {
    username : "GoodGuyGreg",
    title : "Passes out at party",
    body : "Wakes up early and cleans house"
  },
  {
    username : "GoodGuyGreg",
    title : "Steals your identity",
    body : "Raises your credit score"
  },
  {
    username : "GoodGuyGreg",
    title : "Reports a bug in your code",
    body : "Sends you a Pull Request"
  },
  {
    username : "ScumbagSteve",
    title : "Borrows something",
    body : "Sells it"
  },
  {
    username : "ScumbagSteve",
    title : "Borrows everything",
    body : "The end"
  },
  {
    username : "ScumbagSteve",
    title : "Forks your repo on github",
    body : "Sets to private"
  }
]);

// Insert into a comments collection
db.createCollection("comments");

var post1 = db.posts.findOne(
  {
    "title": "Borrows something"
  }
);

db.comments.insert([
  {
    username : "GoodGuyGreg",
    comment : "Hope you got a good deal!",
    post : post1._id
  }
]);

var post2 = db.posts.findOne(
  {
    "title": "Borrows everything"
  }
);

db.comments.insert(
  {
    username : "GoodGuyGreg",
    comment : "What's mine is yours!",
    post : post2._id
  }
);

var post3 = db.posts.findOne(
  {
    "title": "Forks your repo on github"
  }
);

db.comments.insert(
  {
    username : "GoodGuyGreg",
    comment : "Don't violate the licensing agreement!",
    post : post3._id
  }
);

var post4 = db.posts.findOne(
  {
    "title": "Passes out at party"
  }
);

db.comments.insert(
  {
    username : "ScumbagSteve",
    comment : "It still isn't clean",
    post : post4._id
  }
);

var post5 = db.posts.findOne(
  {
    "title": "Reports a bug in your code"
  }
);

db.comments.insert(
  {
    username : "ScumbagSteve",
    comment : "Denied your PR cause I found a hack",
    post : post5._id
  }
);

// Querying related collections
// 1. find all users
db.users.find();
// 2. find all posts
db.posts.find();
// 3. find all posts that was authored by "GoodGuyGreg"
db.posts.find(
  {
    "username": "GoodGuyGreg"
  }
);
// 4. find all posts that was authored by "ScumbagSteve"
db.posts.find(
  {
    "username": "ScumbagSteve"
  }
);
// 5. find all comments
db.comments.find();
// 6. find all comments that was authored by "GoodGuyGreg"

