// const MongoClient = require('mongodb').MongoClient;

// require('dotenv').config();
// const url = process.env.DB_HOST;

// // MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
// //     console.log("Connected successfully to server", err);
// //     const db = client.db();

// //     const collection = db.collection('listingsAndReviews');

// //     collection.find({
// //         property_type: "House"
// //     }).limit(10).toArray((err, results) => {
// //         console.log('Propiedades', results);
// //         client.close();

// //     });
// // });

// function conectMongo(collectionName) {
//     return new Promise(function(resolve, reject) {
//         MongoClient.connect(url, {
//             useUnifiedTopology: true
//         }, function(err, client) {
//             if (err) {
//                 reject(err);

//             } else {
//                 const db = client.db();
//                 const collection = db.collection(collectionName);
//                 resolve({
//                     find: function(callback) {
//                         collection.find().limit(10).toArray(function(err, results) {
//                             callback(results);
//                             client.close();
//                         });
//                     }
//                 });
//             }
//         });
//     });

// }

// module.exports = conectMongo;

require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const url = process.env.DB_HOST;

module.exports = function(collectionName) {
    return new Promise((success, failure) => {
        MongoClient.connect(url, {
            useUnifiedTopology: true
        }, function(err, client) {

            if (err) {
                console.log('Failed to connect to the database');
                failure(err);
                return;
            }

            const db = client.db();

            const collection = db.collection(collectionName);

            success({
                find: (filters, limit) => {
                    filters = filters || {};
                    limit = limit || 25;

                    return new Promise((resolve, reject) => {
                        collection.find(filters).limit(limit).toArray((err, results) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(results);
                            }
                            client.close();
                        })
                    });
                },
                findOne: (filters) => {
                    filters = filters || {};
                    return new Promise((resolve, reject) => {
                        collection.findOne(filters).then((results) => {
                            resolve(results);
                            client.close();
                        }).catch(err => {
                            reject(err);
                        })
                    });
                },
                insertOne: (filters) => {
                    filters = filters || {};
                    return new Promise((resolve, reject) => {
                        collection.insertOne(filters).then((result) => {
                            resolve(result);
                            client.close();
                        }).catch(err => {
                            reject(err);
                        })
                    });
                }
            });

        });
    })
};