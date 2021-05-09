const https = require('https');
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'backup');
const axios = require('axios')

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
            fs.writeFileSync('backup/users.json', data);
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
            fs.writeFileSync('backup/infos.json', data);
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
            fs.writeFileSync('backup/jobs.json', data);
        } catch (error) {
            console.error(error.message);
        };
    });

}).on("error", (error) => {
    console.error(error.message);
});

function sanitize(final,fill){
   for(let i in final){
       let clean = final[i]
       for(let j in fill){ // on compare les deux objets et on remplace les champs par ordre de priorité     
        let verify = fill[j]
        //comparatif des id
        if(i == j){

            //replacement
            if((clean.name == "#ERROR" || !clean.name) && verify.name) clean.name = verify.name               
            if(verify.city) clean.city = verify.city
            if(verify.age && !clean.age) clean.age = verify.age        
            if(verify.job) clean.job = verify.job


        }
       }
    //clean format
    if(clean.name) clean.name = formatString(clean.name)
    if(clean.city) clean.city = formatString(clean.city)
   }
   return final
}

function formatString(name){ //pour formatter les string correctement
    if(name=="#ERROR"){
        return name
    }
    let cleared = Array.from(name)
    for(let j = 0;j<cleared.length;j++){
        let letter = cleared[j]
        if(letter=='3') cleared[j] = "e"
        if(letter=='4') cleared[j] = "a"
        if(letter=='1') cleared[j] = "i"
        if(letter=='0') cleared[j] = "o"
        if(j==0){
            cleared[j] = cleared[j].toUpperCase()
        }else{
            cleared[j] = cleared[j].toLowerCase()
        }
    }
    return cleared.join("")
}

let infos = require(path.join(dir, "infos.json"));
let users = require(path.join(dir, "users.json"));
let jobs = require(path.join(dir, "jobs.json"));
let finalContent = sanitize(users,infos)
finalContent = sanitize(finalContent,jobs)

axios
  .post('https://jsonbox.io/box_f3942e369bc1946b1c10', {
    finalContent
  })
  .then(res => {
    console.log(`statusCode: ${res.statusCode}`)
    console.log(res)
  })
  .catch(error => {
    console.error(error)
  })