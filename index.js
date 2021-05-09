const https = require('https');
const fs = require('fs');

let usersUrl = "https://recrutement-practice-default-rtdb.firebaseio.com/users.json";
let infosUrl = "https://recrutement-practice-default-rtdb.firebaseio.com/informations.json";
let jobsUrl = "https://recrutement-practice-default-rtdb.firebaseio.com/jobs.json";

https.get(usersUrl,(res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            let json = JSON.parse(body);
            let data = JSON.stringify(json);
            fs.writeFileSync('users.json', data);
        } catch (error) {
            console.error(error.message);
        };
    });

}).on("error", (error) => {
    console.error(error.message);
});

https.get(infosUrl,(res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            let json = JSON.parse(body);
            let data = JSON.stringify(json);
            fs.writeFileSync('infos.json', data);
        } catch (error) {
            console.error(error.message);
        };
    });

}).on("error", (error) => {
    console.error(error.message);
});

https.get(jobsUrl,(res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            let json = JSON.parse(body);
            let data = JSON.stringify(json);
            fs.writeFileSync('jobs.json', data);
        } catch (error) {
            console.error(error.message);
        };
    });

}).on("error", (error) => {
    console.error(error.message);
});

