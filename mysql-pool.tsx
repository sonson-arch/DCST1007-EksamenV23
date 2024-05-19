//Brukes ikke for eksamen da det kjøres i SEB
// Eventuell for testing - purpose
// Endre til egen database oppkobling!!!

import mysql from 'mysql2';

// Create a cache of connections to the mysql server.
// Read more about connection pools here: https://en.wikipedia.org/wiki/Connection_pool
export let pool = mysql.createPool({
  host: 'namox.idi.ntnu.no',
  connectionLimit: 1, // Limit the number of simultaneous connections to avoid overloading the mysql server
  user: '####', // Replace "username" with your namox.idi.ntnu.no username
  password: '####', // Replae "password" with your namox.idi.ntnu.no password
  database: '####', // Replace "username" with your namox.idi.ntnu.no username
});

