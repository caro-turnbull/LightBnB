const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

const properties = require("./json/properties.json");
const users = require("./json/users.json");


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = (email, password) => {
  return pool.query(`SELECT * FROM users WHERE email LIKE $1`, [email])
    .then((res) => {
      return res.rows[0]
    })
    .catch((err) => {console.log("get users", err.message);})
  }
  
//   let resolvedUser = null;
//   for (const userId in users) {
//     const user = users[userId];
//     if (user?.email.toLowerCase() === email?.toLowerCase()) {
//       resolvedUser = user;
//     }
//   }
//   return Promise.resolve(resolvedUser);
// };

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return pool.query('SELECT * FROM users where id LIKE $1', [id])
  .then((res)=> {
    console.log("----------------response---------------------",res.rows);
      return res.rows[0]
  })
  .catch((err) => {console.log("get users", err.message);})
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  return pool.query (`INSERT INTO users
                    (name, email, password)
                    VALUES ($1, $2, $3)
                    RETURNING *`
                    ,[user.name, user.email, user.password])
  .then((res) => {
    console.log("----------------insert info---------------------",res);
      return res
  })
  .catch((err) => {console.log("add user error", err.message);})
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return getAllProperties(null, 2);
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) =>  {

  return pool
    .query(`SELECT * FROM properties LIMIT $1;`, [limit])
    .then((response) => {
      console.log(response.rows)
      return response.rows;
    })
    .catch((err) => {console.log(err.message)})
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
