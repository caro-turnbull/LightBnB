SELECT properties.id, title, city cost_per_night, avg(property_reviews.rating)
FROM properties
LEFT JOIN property_reviews ON properties.id = property_id
WHERE city LIKE '%ancouv%'
GROUP BY properties.id
HAVING avg(property_reviews.rating) >= 4
ORDER BY cost_per_night 
LIMIT 10