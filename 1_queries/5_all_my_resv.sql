SELECT reservations.id as id, title, start_date, cost_per_night, avg(rating)
FROM properties
JOIN reservations on properties.id = reservations.property_id
JOIN property_reviews on properties.id = property_reviews.property_id
WHERE reservations.guest_id = 1
Group BY properties.id, reservations.id
ORDER BY start_date