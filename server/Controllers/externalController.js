const axios = require('axios');
let issues = ['No Data Found'];
let symptoms = ['No Data Found'];
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im15a2Vuemllcm9nZXJzQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiNDMzOSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiI5OTk5OTk5OTkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJQcmVtaXVtIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAxOC0xMi0wNiIsImlzcyI6Imh0dHBzOi8vc2FuZGJveC1hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNTQ0NDgwNDUxLCJuYmYiOjE1NDQ0NzMyNTF9.Z_yePUE160wqxajaUV4W5k_JKtuHQkpkGYdBHTu-AOM'
const comments = [];

axios.get('http://api.flutrack.org/?s=feverANDcoughORfever')
    .then(response => {
        for(let i = 0; i < response.data.length; i++) {
            comments.push({id: 11, user: response.data[i].user_name, comment: response.data[i].tweet_text, lat: response.data[i].latitude, long: response.data[i].longitude})
        }
        console.log('finished 1')
    })

axios.get('http://api.flutrack.org?s=headache')
    .then(response => {
        for(let i = 0; i < response.data.length; i++) {
            comments.push({id: 104, user: response.data[i].user_name, comment: response.data[i].tweet_text, lat: response.data[i].latitude, long: response.data[i].longitude});
        }
        console.log('finished 3')
    })
axios.get(`http://api.flutrack.org?s=sore%20throat`)
    .then(response => {
        for(let i = 0; i < response.data.length; i++) {
            comments.push({id: 44, user: response.data[i].user_name, comment: response.data[i].tweet_text, lat: response.data[i].latitude, long: response.data[i].longitude});
        }
        console.log('finished 4')
    })
axios.get(`http://api.flutrack.org?s=nose`)
    .then(response => {
        for(let i = 0; i < response.data.length; i++) {
            comments.push({id: 11, user: response.data[i].user_name, comment: response.data[i].tweet_text, lat: response.data[i].latitude, long: response.data[i].longitude});
        }
        console.log('finished 5');
    })
axios.get(`http://api.flutrack.org?s=cough`)
    .then(response => {
        for(let i = 0; i < response.data.length; i++) {
            comments.push({id: 113, user: response.data[i].user_name, comment: response.data[i].tweet_text, lat: response.data[i].latitude, long: response.data[i].longitude});
        }
        console.log('finished 2');
    })

//********** ^^API calls started at boot. Gets Comments.
//********** vvAPI calls fired when requested


const getLocation = (req, res, next) => {
    axios.get(`http://open.mapquestapi.com/geocoding/v1/address?key=PtniwW4uG6IcOwIjKhJ5ocJP1ylbRm91&location=${req.params.id}`)
    .then(response => {
        res.json(response.data.results[0].locations)
    })
}

const getCauses = (req, res, next) => {
    axios.get(`https://sandbox-healthservice.priaid.ch/diagnosis?symptoms=[${req.query.symptoms}]&gender=${req.query.gender}&year_of_birth=${req.query.year}&token=${token}&format=json&language=en-gb`)
    .then(response => {
        res.json(response.data)
    })
}

const postComment = (req, res, next) => {
    comments.push(req.body);
    let arr = comments.filter(val => {
        return val.id === req.body.id;
    })
    res.json(arr);
}

const passComments = (req, res, next) => {
    let arr = comments.filter(val => {
        return val.id==req.params.id;
    })
    res.json(arr);
}

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
    axios.get(`https://sandbox-healthservice.priaid.ch/issues/${req.params.id}/info?token=${token}&format=json&language=en-gb`)
        .then(response => {
            res.json(response.data.MedicalCondition)
        })
}

module.exports = {
    passIssues,
    passSymptoms,
    passIssue,
    getCauses,
    getLocation,

    passComments,
    postComment
}