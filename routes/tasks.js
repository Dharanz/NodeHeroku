const express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://dharanz:Dharan123@ds133632.mlab.com:33632/samplemeanapp', ['tasks'])

router.get('/tasks', (req, res) => {
    db.tasks.find((err, tasks) => {
        if (err) {
            res.send(err);
        }

        res.json(tasks);
    });
});

router.get('/tasks/:id', (req, res) => {
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)},(err, task) => {
        if (err) {
            res.send(err);
        }

        res.json(task);
    });
});

router.post('/tasks/add', (req, res) => {
    var task = req.body;
    if(!task.title || (task.isDone = '')) {
        res.status(400);
        res.json({"error": "Bad data"});
    } else {
        db.tasks.save(task, (err, task) => {
            if (err) {
                res.send(err);
            }    
            res.json(task);
        });
    }
});

router.put('/tasks/update/:id', (req, res) => {
    var task = req.body;
    var updTask = {};

    if (task.isDone) {
        updTask.isDone = task.isDone; 
    }

    if (task.title) {
        updTask.title = task.title; 
    }

    if (!updTask) {
        res.status(400);
        res.json({"error": "Bad data"});
    } else {
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updTask, {}, (err, task) => {
            if (err) {
                res.send(err);
            }
    
            res.json(task);
        });
    }
    
});

router.delete('/tasks/delete/:id', (req, res) => {
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)},(err, task) => {
        if (err) {
            res.send(err);
        }

        res.json(task);
    });
});

module.exports = router;   