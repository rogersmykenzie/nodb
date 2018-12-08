const axios = require('axios');
let issues = ['No Data Found'];
let symptoms = ['No Data Found'];
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im15a2Vuemllcm9nZXJzQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiNDMzOSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiI5OTk5OTk5OTkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJQcmVtaXVtIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAxOC0xMi0wNiIsImlzcyI6Imh0dHBzOi8vc2FuZGJveC1hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNTQ0Mjg4MDk1LCJuYmYiOjE1NDQyODA4OTV9.Q94JtXAmx2Ezg2oJlZKTIoyXERUhkZY8BU_Oew-YLjY'

const passSymptoms = (req, res, next) => {
    axios.get(`https://sandbox-healthservice.priaid.ch/symptoms?token=${token}&format=json&language=en-gb`)
    .then(response => {
        symptoms = response.data;
        res.json(symptoms);
    }).catch(err => console.log(err));
}

const passIssues = (req, res, next) => {
    axios.get(`https://sandbox-healthservice.priaid.ch/issues?token=${token}&format=json&language=en-gb`)
    .then(response => {
        issues = response.data;
        res.json(issues);
    }).catch(err => console.log(err));
}

const passIssue = (req, res, next) => {
    // console.log(req.params.id)
    // axios.get(`https://sandbox-healthservice.priaid.ch/symptoms/proposed?symptoms=[${req.query.symptoms}]&gender=${req.query.gender}&year_of_birth=${req.query.year}&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im15a2Vuemllcm9nZXJzQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiNDMzOSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiI5OTk5OTk5OTkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJQcmVtaXVtIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAxOC0xMi0wNiIsImlzcyI6Imh0dHBzOi8vc2FuZGJveC1hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNTQ0MjI2ODc2LCJuYmYiOjE1NDQyMTk2NzZ9.XB7D6XoGSGNKTRsYpLhp5WDwb3qvTEDQ5IA2j2tkZQw&format=json&language=en-gb`)
    // .then(response => {
    //     console.log(response.data);
    //     res.json(response.data)
    // }).catch(err => console.log(err));
    console.log(req.params.id);
    axios.get(`https://sandbox-healthservice.priaid.ch/issues/${req.params.id}/info?token=${token}&format=json&language=en-gb`)
        .then(response => {
            res.json(response.data.MedicalCondition)
        })
}

const passSimilar = (req, res, next) => {
    axios.get(`https://sandbox-healthservice.priaid.ch/symptoms/proposed?symptoms=[${req.query.symptoms}]&gender=${req.query.gender}&year_of_birth=${req.query.year}&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im15a2Vuemllcm9nZXJzQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiNDMzOSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiI5OTk5OTk5OTkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJQcmVtaXVtIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAxOC0xMi0wNiIsImlzcyI6Imh0dHBzOi8vc2FuZGJveC1hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNTQ0MjkzMTU3LCJuYmYiOjE1NDQyODU5NTd9.Ld0d7ZrEiDVJj2aD4bdemQH-0QR3hMt0vsQyJLSyXKk&format=json&language=en-gb`)
        .then(response => {
        res.json(response.data)
        })
}

module.exports = {
    passIssues,
    passSymptoms,
    passIssue,
    passSimilar
}