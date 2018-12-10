const express = require('express');
const { json } = require('body-parser');
const { getLocation, passIssues, passSymptoms, passIssue, passComments, postComment, getCauses} = require('./Controllers/externalController')

const app = express();

app.use(json());

app.get('/api/issues', passIssues);
app.get('/api/symptoms', passSymptoms);
app.get('/api/issue/:id', passIssue);
app.get('/api/diagnosis', getCauses)
app.get('/api/location/:id', getLocation)

app.get('/api/comment/:id', passComments);
app.post('/api/comment', postComment);

app.listen(3001, () => console.log('Listening on port 3001'));