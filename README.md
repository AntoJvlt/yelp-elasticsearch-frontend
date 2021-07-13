# Yelp Elasticsearch project

Link to the deployed project: https://antonin-jolivat.com/yelp-elasticsearch/

The project has been constructed around the [Yelp dataset](https://www.yelp.com/dataset). Businesses and reviews were indexed in an Elasticsearch cluster and search queries were made. 

On the Responsive React Web App, you can search for businesses and filter results by city. For each business found, you can see its reviews and its position on the interactive map on the right of the screen. When you make a query, the businesses which match your query and which have the most stars and reviews count will be retrieved first.

The web app is fully responsive but the map is disabled on mobile devices.

I made this little project in very short period of time to learn more about Elasticsearch and React. This was the opportunity to make a croncrete project around these technologies.

## Backend infrastructure

I made a little Flask API that you can find there: https://github.com/AntoJvlt/yelp-elasticsearch-backend.

This Flask API is used as a proxy in order to secure connections to my Elasticsearch cluster in the cloud. It contains needed endpoints with the queries definition.

To access this Flask API with HTTPS, a reverse proxy has been set up with nginx on my personal server (the same server which serves the static React app).

## Elasticsearch Queries

The search query tries to match the query words in multiple fields of the business definition and it also searchs inside all of the reviews made by users. 
The businesses with the highest stars and reviews count are prioritized, this was done by boosting these values with a "function_score". 
The search query can also filter by city if one is given.

50 businesses are retrieved at most for each query, this value was set arbitrarily for this project.

## Map

The map was made with [OpenLayers](https://openlayers.org/) and it uses OpenStreetMap data. Note that the map is disabled on mobile devices.

## Demo video

A little demo video of the app was made, you can find it there: https://www.youtube.com/watch?v=0t2wYfeOaC0

## Possible evolutions

* Add fuzzy queries to allow typing mistakes.
* Use another analyzer like N-Gram in order to improve queries results.
* Improve the function score to prioterize the average rating value even more.
* Make a pagination system to not fetch all reviews at once for one business. The same could be applied to retrieve more than 50 businesses when making a search. 
