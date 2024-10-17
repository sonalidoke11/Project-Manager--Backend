import { Router } from "express";
import Project from "../models/Project.js";
import Task from "../models/Task.js";

const router = new Router();

/**
 * GET /
 * @description fetches all projects
 */
router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.find();

    if (projects) {
      res.json({ projects });
    } else {
      res.json({ message: "No projects found" });
    }

  } catch (error) {
    next(error)
  }
});


/**
 * GET /
 * @description fetche project with id
 */
router.get("/:id", async (req, res, next) => {
    try {
      const project = await Project.findById(req.params.id);
  
      if (project) {
        res.json({ project });
      } else {
        res.json({ message: `No projects found with id : ${req.params.id}` });
      }
  
    } catch (error) {
      next(error)
    }
  });

/**
 * POST /api/projects/
 * @description create a new project document
 */
router.post("/", async (req, res, next) => {
    try {
      console.log(req.body);
  
      const newProject = await Project.create(req.body);
  
      if (newProject) {
        res.status(201).json({ project: newProject });
      } else {
        res.status(400).json({ message: "Error creating new project" });
      }
    } catch (error) {
      next(error);
    }
  });

/**
 * DELETE /api/projects/:id
 */
router.delete("/:id", async (req, res, next) => {
    try {
      const deletedProject = await Project.findByIdAndDelete(req.params.id);
  
      if (deletedProject) {
          res.json({ message: `Project deleted: ${req.params.id}`, deletedProject });
      } else {
          res.json({message: `Error deleting project: ${req.params.id}`})
      }
  
    } catch (error) {
      next(error);
    }
  });


  /**
 * PUT /api/projects/:id
 * @description Update a document by id
 */

  router.put('/:id', async(req, res, next)=>{
    try {
        const {id} = req.params;
        const {body} = req;
        const updateProject = await Project.findByIdAndUpdate(id, body,{
            new: true,
        })
        res.json({updateProject});
    } catch (error) {
        next(error)
    }
  })


/**
 * POST /api/projects/:id/tasks
 * @description create a new task for a specific project
 */
router.post("/:id/tasks", async (req, res, next) => {
    try {
      const project = await Project.findById(req.params.id);
      console.log(project);
      
      if (!project) {
        res.status(404).json({ message: `Project not found: ${req.params.id}` });
        return;
      }
  
      // create a new task
      const task = await Task.create(req.body);
  
      //TODO: check if task was created
  
      // add the task to the tasks array of the project
      project.tasks.push(task);
  
      // save the project
      await project.save();
  
      res.status(201).json({project});
  
  
    } catch (error) {
      next(error);
    }
  });

export default router;