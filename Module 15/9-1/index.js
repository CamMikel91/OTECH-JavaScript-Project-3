const mongoose = require('mongoose');
const { run } = require('node:test');

mongoose.connect('mongodb://127.0.0.1/otech-assignments')
    .then(() => console.log('Connected to MongoDB...\n'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const restaurantSchema = new mongoose.Schema({
    address: {
        building: String,
        coord: [Number],
        street: String,
        zipcode: String
    },
    borough: String,
    cuisine: String,
    grades: [{
        date: Date,
        grade: String,
        score: Number
    }],
    name: String,
    restaurant_id: String
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema, 'queryPractice');

// Query 1: Get all documents in the collection
async function query1() {
    return await Restaurant
        .find();
}
async function runQuery1() {
    const restaurants = await query1();
    console.log('--------------- Start of Query 1 ----------------- ')
    console.log('Get all documents in the collection')
    console.log(restaurants);
    console.log('--------------- End of Query 1 ----------------- ')
}

// Query 2: Get the first 5 restaurants that are in the borough Bronx.
async function query2() {
    return await Restaurant
        .find({borough: 'Bronx'})
        .limit(5);
}
async function runQuery2() {
    const restaurants = await query2();
    console.log('--------------- Start of Query 2 ----------------- ')
    console.log('Get the first 5 restaurants that are in the borough Bronx.\n')
    restaurants.forEach(restaurant => {
        console.log(`Restaurant Name: ${restaurant.name}`);
        console.log(`Address: ${restaurant.address.building} ${restaurant.address.street} ${restaurant.address.zipcode}\n`);
    });
    console.log('--------------- End of Query 2 ----------------- ')
}

// Query 3: Get all of the restaurants that scored more than 80, but less than 100.
async function query3() {
    return await Restaurant
        .find({grades: {$elemMatch: {score: {$gt: 80, $lt: 100}}}})
        .select({name: 1, grades: 1, _id: 0});
}
async function runQuery3() {
    const restaurants = await query3();
    console.log('--------------- Start of Query 3 ----------------- ')
    console.log('Get all of the restaurants that scored more than 80, but less than 100.')
    restaurants.forEach(restaurant => {
        console.log(`Restaurant Name: ${restaurant.name}`);
        restaurant.grades.forEach(grade => {
            if (grade.score > 80 && grade.score < 100) {
                console.log(`Grade: ${grade.score}`);
            }
        });
    });
    console.log('--------------- End of Query 3 ----------------- ')
}

// Query 4: Get the restaurant Id, Name, borough, and cuisine for all of the restaurants 
// that contain 'Wil' as the first three letters in its name.
async function query4() {
    return await Restaurant
        .find({name: /^Wil/})
        .select({restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id: 0});
}
async function runQuery4() {
    const restaurants = await query4();
    console.log('--------------- Start of Query 4 ----------------- ')
    console.log('Get the restaurant Id, Name, borough, and cuisine for all of the restaurants that contain "Wil" as the first three letters in its name.')
    console.log(restaurants);
    console.log('--------------- End of Query 4 ----------------- ')
}

// Query 5: Find all of the restaurants that are in latitude in the 70's range.
async function query5() {
    return await Restaurant
        .find({$or: [{'address.coord.0': {$gt: -80, $lte: -70}}, {'address.coord.0': {$gte: 70, $lt: 80}}]});
}
async function runQuery5() {
    const restaurants = await query5();
    console.log('--------------- Start of Query 5 ----------------- ')
    console.log('Find all of the restaurants that are in latitude in the 70\'s range.\n');       
    restaurants.forEach(restaurant => {
        console.log(`Restaurant Name: ${restaurant.name}`);
        console.log(`Address: ${restaurant.address.building} ${restaurant.address.street} ${restaurant.address.zipcode}`);
        console.log(`Latitude : ${restaurant.address.coord[0]}\n`)
    });
    console.log(`Total number of restaurants in the 70's range: ${restaurants.length}\n`);
    console.log('--------------- End of Query 5 ----------------- ')
}

// Query 6: Find all of the restaurants that are in zipcode 10014
async function query6() {
    return await Restaurant
        .find({'address.zipcode': '10014'});
}
async function runQuery6() {
    const restaurants = await query6();
    console.log('--------------- Start of Query 6 ----------------- ')
    console.log('Find all of the restaurants that are in zipcode 10014')
    restaurants.forEach(restaurant => {
        console.log(`Restaurant Name: ${restaurant.name}`);
        console.log(`Address: ${restaurant.address.building} ${restaurant.address.street} ${restaurant.address.zipcode}\n`);
    });
    console.log(`Total number of restaurants in zipcode 10014: ${restaurants.length}\n`);
    console.log('--------------- End of Query 6 ----------------- ')
}

// Query 7: Get all of the restaurants that have a grades of 6 or more.
async function query7() {
    return await Restaurant
        .find({'grades.5': {$exists: true}});
}
async function runQuery7() {
    const restaurants = await query7();
    console.log('--------------- Start of Query 7 ----------------- ')
    console.log('Get all of the restaurants that have a grades of 6 or more.')
    restaurants.forEach(restaurant => {
        console.log(`Restaurant Name: ${restaurant.name}`);
        console.log(`Number of Grades: ${restaurant.grades.length}\n`);
    });
    console.log(`Total number of restaurants with grades of 6 or more: ${restaurants.length}\n`);
    console.log('--------------- End of Query 7 ----------------- ')
}

// Query 8: Get the name and address of the restaurants that have a grade that is an 'A'.
async function query8() {
    return await Restaurant
        //.find({grades: {$elemMatch: {grade: /a/i }}})
        .find({'grades.grade': 'A'});
}
async function runQuery8() {
    const restaurants = await query8();
    console.log('--------------- Start of Query 8 ----------------- ')
    console.log('Get the name and address of the restaurants that have a grade that is an "A".')
    restaurants.forEach(restaurant => {
        console.log(`Restaurant Name: ${restaurant.name}`);
        console.log(`Address: ${restaurant.address.building} ${restaurant.address.street} ${restaurant.address.zipcode}\n`);
    });
    console.log(`Total number of restaurants with grade "A": ${restaurants.length}\n`);
    console.log('--------------- End of Query 8 ----------------- ')
}

// Query 9: Find all of the restaurants that are in building 220.
async function query9() {
    return await Restaurant
        .find({'address.building': '220'});
}
async function runQuery9() {
    const restaurants = await query9();
    console.log('--------------- Start of Query 9 ----------------- ')
    console.log('Find all of the restaurants that are in building 220.')
    restaurants.forEach(restaurant => {
        console.log(`Restaurant Name: ${restaurant.name}`);
        console.log(`Address: ${restaurant.address.building} ${restaurant.address.street} ${restaurant.address.zipcode}\n`);
    });
    console.log(`Total number of restaurants in building 220: ${restaurants.length}\n`);
    console.log('--------------- End of Query 9 ----------------- ')
}

runQuery1();
//runQuery2();
//runQuery3();
//runQuery4();
//runQuery5();
//runQuery6();
//runQuery7();
//runQuery8();
//runQuery9();