import * as express from 'express';
import {DatabaseService} from "./database/DatabaseService";

const app = express();
const port = process.env.PORT || 3000;
const database = new DatabaseService();

app.get('/', (req, res) => res.send('I\'m alive!'));

app.get('/country', (req, res) => {
    let filters = JSON.parse(req.query['filters']);

    console.log(`Processing country rest point with filters: ${filters}`);
    database.findCountry(filters)
        .then( countries => {
            res.send(countries);
        })
        .catch( err => console.error(err));
});

database.init().then( () => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}!`);
    })
});