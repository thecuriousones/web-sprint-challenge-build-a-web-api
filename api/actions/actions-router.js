// Write your "actions" router here!
const express = require('express');
const Action = require('./actions-model.js')
const router = express.Router();
const {validateActionId, validateAction} = require('./actions-middlware.js')


// Endpoints 
router.get('/', (req,res)=>{
    Action.get()
        .then(action =>{
            console.log(action)
            res.status(200).json(action)
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({message: "The project's actions could not be retrieved"})
        })
})

router.get('/:id',validateActionId, (req,res)=>{
    Action.get(req.params.id)
        .then(action =>{
            if (action) {
                console.log(action)
                res.status(200).json(action);
            }else(
                res.status(404).json({message: "The action with the specified ID does not exist"})
            )
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
              message: "These actions could not be retrieved",
            });
          });
})

router.post('/', validateAction, (req,res)=>{
    const newAction = req.body
    if(!newAction.description ||!newAction.notes ||!newAction.project_id ){
        res.status(400).json({message: "Please provide a description, notes, and project id for new action"})
    }else{
        Action.insert(newAction)
            .then(action =>{
                console.log("New Action created", action)
                res.status(201).json(action)
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({
                  message: "There was an error while saving the action to the database",
                });
              });
    }   
})

router.put('/:id', validateActionId, async (req,res)=>{
    const changes = req.body
    const {id} = req.params
    try{
        if(!changes.description || !changes.notes){
            res.status(400).json({message: "Please provide a description and notes for  updated action"})
        }else{
            const updatedAction = await Action.update(id,changes)
            if(!updatedAction){
                res.status(404).json({message: "The action with the specified ID does not exist"})
            }else{
                console.log('Action updated!')
                res.status(200).json(updatedAction)
            }
        }        
    }catch(err){
        console.log(err)
        res.status(500).json({message: "That action could not be modified"})
    }
})

router.delete('/:id', validateActionId, async (req,res)=>{
    try{
        const {id} = req.params
        const deletedAction = await Action.remove(id)
        if(!deletedAction){
            res.status(404).json({message: "The action with the specified ID does not exist"})
        }else{
            console.log('Action deleted!')
            res.status(200).json(deletedAction)
        }
    }catch(err){
        console.log(err)
        res.status(500).json({message: "The action could not be removed"})
    }
})



module.exports = router;