// add middlewares here related to actions
Action = require('./actions-model.js')


const validateActionId = (req, res, next)=> {
      const {id} = req.params
      Action.get(id)
        .then(action =>{
          if(!action) {
            res.status(404).json({message: "action not found"})
          } else {
            req.action = action
            next()
          }
        })
        .catch(error =>{
          console.log(error)
          res.status(500).json({
            message: "Could not validate action id"
          })
        })
  }

  function validateAction(req, res, next) {
    if(!req.body.description || !req.body.notes || !req.body.project_id) {
      res.status(400).json({message: "missing required name, notes, and project id fields"})
    } else {
      next()
    }
  }

module.exports = { validateActionId, validateAction };
