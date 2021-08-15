// add middlewares here related to projects
Project = require('./projects-model.js')


const validateProjectId = (req, res, next)=> {
      const {id} = req.params
      Project.get(id)
        .then(project =>{
          if(!project) {
            res.status(404).json({message: "project not found"})
          } else {
            req.project = project
            next()
          }
        })
        .catch(error =>{
          console.log(error)
          res.status(500).json({
            message: "Could not validate project id"
          })
        })
  }

  function validateProject(req, res, next) {
    if(!req.body.name) {
      res.status(400).json({message: "missing required name field"})
    } else {
      next()
    }
  }

module.exports = { validateProjectId, validateProject };