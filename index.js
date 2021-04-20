// Start your es6 scripts here
import express from 'express';
import resolvers from './resolvers';
import schema from './schema';

import { graphqlHTTP } from 'express-graphql';
const axios = require('axios');
// axios.defaults.baseURL = 'http://localhost:8082';
// axios.defaults.headers.post['Content-Type'] = 'application/json';

const app = express();

const path = require('path');

app.use(express.static(__dirname + ''));
app.use(express.static(path.join(__dirname, '')));

const root = resolvers;

app.get("/", function (request, response){
  //show this file when the "/" is requested
  response.sendFile(__dirname+"/index.html");
});

app.get('/l/:sid', async (req, res) => {
  try {
    console.log('req.params.sid: ', req.params.sid);
    const data = { ...req.params }
    console.log('data: ', data);
    console.log('data.sid: ', data.sid);
    console.log(typeof data.sid);
    // await axios.post('http://localhost:8082/graphiql?',
    await axios.post(`http://localhost:8082/graphiql?query=query%7B%0A%20%20getShortenURL(sid%3A%20%22${data.sid}%22)%7B%0A%20%20%20%20url%0A%20%20%7D%0A%7D`,
     {
        // query: `query{getShortenURL(sid: ${data.sid}){url}}`,
        // variables: null
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(function (response) {
        // console.log('response: ', response);
        console.log('response.data: ', response.data);
        console.log('response.data.data.getShortenURL: ', response.data.data.getShortenURL);
        res.redirect(response.data.data.getShortenURL.url);
      })
      .catch(function (error) {
        console.log('error: ', error);
      });
    // const href = root.getShortenURL({sid: data.sid});
    // console.log('href: ', href);
    // res.redirect(`https://www.${req.params.id}.com`);
    // res.redirect(href);
  } catch (e) {
    console.log('error: ', e);
  }
});


app.use('/graphiql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))

app.listen(8082, () => console.log('Running on port 8082'));