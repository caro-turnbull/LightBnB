DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS properties CASCADE;
DROP TABLE IF EXISTS reservations CASCADE;
DROP TABLE IF EXISTS property_reviews CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL
);

CREATE TABLE properties ( 
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,

  title varchar(255) NOT NULL,
  description TEXT,
  thumbnail_photo_url VARCHAR(255) NOT NULL,
  cover_photo_url VARCHAR(255) NOT NULL,
  cost_per_night INTEGER DEFAULT 0,
  parking_spaces INTEGER DEFAULT 0,
  number_of_bathrooms INTEGER DEFAULT 0,
  number_of_bedrooms INTEGER DEFAULT 0,
  
  street varchar(255) NOT NULL,
  city varchar(255) NOT NULL,
  province varchar(255) NOT NULL,
  post_code varchar(255) NOT NULL,
  country varchar(255) NOT NULL,

  active BOOLEAN
);

 CREATE TABLE reservations (
  id SERIAL PRIMARY KEY NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
  guest_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE property_reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  guest_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
  reservation_id INTEGER REFERENCES reservations(id) ON DELETE CASCADE,
  rating SMALLINT NOT NULL DEFAULT 0,
  message TEXT
);

-- CREATE TABLE photos (
--   id SERIAL PRIMARY KEY INTEGER,
--   is_thumbanil BOOLEAN,
--   is_ cover BOOLEAN,
--   url varchar(255) NOT NULL,
--   property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
--)