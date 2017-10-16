const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const url = 'http://www.omdbapi.com?apikey=8730e0e';
const app = express();
const cache = {};
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: 'af1ef0c8468d48d69e181f030dc46e08',
  clientSecret: '708cf34165ad41cd870cd20537e62b89'
});

app.use(morgan('combined'));

function findDrinks(data) {
  const drinks = data.drinks;

  const betterDrinks = drinks.map(drink => {
    return {
      Drink: drink.strDrink,
      Instructions: drink.strInstructions,
      DrinkThumb: drink.strDrinkThumb,
      Ingredients: [
        drink.strIngredient1,
        drink.strIngredient2,
        drink.strIngredient3,
        drink.strIngredient4,
        drink.strIngredient5,
        drink.strIngredient6,
        drink.strIngredient7,
        drink.strIngredient8,
        drink.strIngredient9,
        drink.strIngredient10,
        drink.strIngredient11,
        drink.strIngredient12,
        drink.strIngredient13,
        drink.strIngredient14,
        drink.strIngredient15
      ],
      Measure: [
        drink.strMeasure1,
        drink.strMeasure2,
        drink.strMeasure3,
        drink.strMeasure4,
        drink.strMeasure5,
        drink.strMeasure6,
        drink.strMeasure7,
        drink.strMeasure8,
        drink.strMeasure9,
        drink.strMeasure10,
        drink.strMeasure11,
        drink.strMeasure12,
        drink.strMeasure13,
        drink.strMeasure14,
        drink.strMeasure15
      ]
    };
  });
  function clean() {
    var cleanIngredients = [];
    var cleanMeasurements = [];

    betterDrinks.forEach(function(drink) {
      let ingredientArray = drink.Ingredients;
      let measureArray = drink.Measure;
      var cleanIngredients = [];
      var cleanMeasurements = [];

      for (var i = 0; i < ingredientArray.length; i++) {
        if (ingredientArray[i] !== '' && ingredientArray[i] !== ' ') {
          cleanIngredients.push(ingredientArray[i]);
        } else break;
      }
      for (var i = 0; i < measureArray.length; i++) {
        if (measureArray[i] !== '' && measureArray[i] !== ' ') {
          cleanMeasurements.push(measureArray[i]);
        } else break;
      }

      drink.Ingredients = cleanIngredients;
      drink.Measure = cleanMeasurements;
      // console.log(drink.Ingredients);
      // console.log(drink.Measure);
    });
    return betterDrinks[0];
  }
  clean();

  return betterDrinks[0];
}

app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(express.static('public'));

app.get('/token', function(req, res) {
  // Retrieve an access token
  spotifyApi.clientCredentialsGrant().then(
    function(data) {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
      res.json(data.body['access_token']);
    },
    function(err) {
      console.log(
        'Something went wrong when retrieving an access token',
        err.message
      );
    }
  );
});
app.get('/drinks', function(req, res) {
  axios
    .get('http://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(function(response) {
      const filteredData = findDrinks(response.data);
      res.json(filteredData);
    })
    .catch(function(error) {
      console.log(error);
      res.send(error.message);
    });
});

module.exports = app;
