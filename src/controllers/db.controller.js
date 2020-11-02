const MongoClient = require('mongodb').MongoClient;

require('dotenv').config();
const url = process.env.DB_HOST;

// MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
//     console.log("Connected successfully to server", err);
//     const db = client.db();

//     const collection = db.collection('listingsAndReviews');

//     collection.find({
//         property_type: "House"
//     }).limit(10).toArray((err, results) => {
//         console.log('Propiedades', results);
//         client.close();

//     });
// });

function conectMongo(collectionName) {
    return new Promise(function(resolve, reject) {
        MongoClient.connect(url, {
            useUnifiedTopology: true
        }, function(err, client) {
            if (err) {
                reject(err);

            } else {
                const db = client.db();
                const collection = db.collection(collectionName);
                resolve({
                    find: function(callback) {
                        collection.find().limit(10).toArray(function(err, results) {
                            callback(results);
                            client.close();
                        });
                    }
                });
            }
        });
    });

}

module.exports = conectMongo;