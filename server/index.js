const express = require('express');
const { json } = require('body-parser');
const { passIssues, passSymptoms, passIssue, passSimilar } = require('./Controllers/externalController')

const app = express();

app.use(json());

app.get('/api/issues', passIssues);
app.get('/api/symptoms', passSymptoms);
app.get('/api/issue/:id', passIssue);
app.get('/api/symptom', passSimilar)

app.listen(3001, () => console.log('Listening on port 3001'));