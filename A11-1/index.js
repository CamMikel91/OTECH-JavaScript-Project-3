const express = require('express');
const config = require('config');
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const story = config.get('story');

app.get('/', (req, res) => {
    res.render('index', {
        name: story.name,
        adjective1: story.adjective1,
        adjective2: story.adjective2,
        adjective3: story.adjective3,
        adjective4: story.adjective4,
        adjective5: story.adjective5,
        adjective6: story.adjective6,
        adjective7: story.adjective7,
        adjective8: story.adjective8,
        noun1: story.noun1,
        noun2: story.noun2,
        noun3: story.noun3,
        noun4: story.noun4,
        noun5: story.noun5,
        noun6: story.noun6,
        noun7: story.noun7,
        verb1: story.verb1,
    });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));