const Router = require('express').Router; 


const userDb = require('../db/user.json');
let Users = [...userDb];

const UserRouter = Router();

UserRouter.get('/', (req, res) => {
    res.send(Users);
});

UserRouter.post('/', (req, res) => {  
  if(req.body) 
  {
    if(req.body.password && req.body.login)
    {
      Users.push({id: Date.now(), ...req.body});
    } 
    else
    {
      return res.status(502).send({"message": "No keys"})
    }
  }
  res.send(Users);
});

UserRouter.get('/:id', (req, res) => {
    
    const userId = req.params.id;

    for(let i in Users)
    {
      (Users[i].id == userId) && res.status(200).send(Users[i]);
    }
    res.status(405).send({'message': 'Not info in base'});
        
});

UserRouter.put('/:id', (req, res) => {
    const userId = req.params.id;

    if(req.body){
        
        for(let i in Users)
        {
            if(Users[i].id == userId)
            {
                Users[i] = {...Users[i], ...req.body};
                return res.send(Users[i]);
            }
        }
    }
    else
    {
        return res.status(502).send({"message": "Empty atribute for PUT request"})
    }
    res.send({"message": "Not Writes in base"});
});


UserRouter.delete( '/:id', (req, res) => {
    let userId = req.params.id;
    Users = Users.filter(user => user.id != userId);
    res.send(Users);
});

module.exports = UserRouter;