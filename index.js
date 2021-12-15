const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const users = require('./db/user.json');
const PORT = 8030;
let api_users = [...users];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send(api_users);
});

app.post('/', (req, res) => {  
  if(req.body) 
  {
    if(req.body.password && req.body.login)
    {
      let data = {id: Date.now(), ...req.body}
      api_users.push(data);
    } 
    else
    {
      return res.status(502).send({"message": "No keys"})
    }
  }
  res.send(api_users);
});

app.get('/:id', (req, res) => {
  const userId = req.params.id;
  
    for(i in api_users)
    {
      (api_users[i].id == userId) ? res.status(200).send(api_users[i]): res.status(405).send({'message': 'Not info in base'});
    }
});

app.put('/:id', (req, res) => {
    const userId = req.params.id;

    if(req.body){
        for(let i in api_users){
            
            if(api_users[i].id == userId){
                api_users[i] = {...api_users[i], ...req.body};
                console.log(api_users[i]);
                return res.send(api_users[i]);
            }
        
        }
    }else{
        return res.status(502).send({"message": "Empty atribute for PUT request"})
    }
    res.send({"message": "Not Writes in base"});
})


app.delete( '/:id', (req, res) => {
    let userId = req.params.id;

    api_users = api_users.filter(user => user.id != userId);
    res.send({"message": "GG"});
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })