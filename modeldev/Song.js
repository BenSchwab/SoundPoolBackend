var songSchema = mongoose.Schema({
    id: String
});


var Kitten = mongoose.model('Kitten', kittySchema);


// var fluffy = new Kitten({ name: 'fluffy' });
// fluffy.speak() // "Meow name is fluffy"


// fluffy.save(function (err, fluffy) {
// if (err) return console.error(err);
// fluffy.speak();
// });

// Kitten.find(function (err, kittens) {
// if (err) return console.error(err);
// console.log(kittens)
// })