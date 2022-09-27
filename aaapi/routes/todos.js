const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// const Posts = require('../../NodderProjectFodder/models/Posts');
const Todos = require('../Models/TodoDataModel');
const verifyToken = require('./verifyToken');

router.get('/',verifyToken,async (req,res)=>{
    // console.log(req)
    try{ 
        const verified = jwt.verify(req.header('auth-token'),"tokenSecretkey");
        ID = JSON.stringify(verified._id)
        todo = await Todos.find({id:ID});
        // console.log("...................")
        // console.log(ID)

        res.send(todo)
    }catch(err){
        res.send(err);
        console.log(err)
    }
});

router.get('/:todoId',async (req,res)=>{
    
    try{
        const verified = jwt.verify(req.header('auth-token'),"tokenSecretkey");
        ID = JSON.stringify(verified._id)

        todo = await Todos.find({id:ID,_id:req.params.todoId});
        res.send(todo)
    }catch(err){
        res.send(err);
        console.log(err)
    }
});

router.delete("/:todoId",verifyToken,async (req,res)=>{

    console.log("deleting now ")
    console.log(req.params.todoId)
    const verified = jwt.verify(req.header('auth-token'),"tokenSecretkey");
    ID = JSON.stringify(verified._id)
    const removedPost = await Todos.remove({
        _id:req.params.todoId,id:ID
    });
    res.json(removedPost)

});

router.patch("/:todoId",async (req,res)=>{
    const updated = await Todos.updateOne(
        {_id:req.params.todoId,id:ID},
        {
            $set:{todo:req.body.title, done:req.body.done}
        }
    )
    res.send(updated)
})

router.post('/',async (req,res)=>{

    console.log("...............................")
    console.log(req.header('auth-token'))
    console.log(req.body.headers.lazyUpdate[0].value);
    console.log(req.body.todo)
    const verified = jwt.verify(req.body.headers.lazyUpdate[0].value,"tokenSecretkey");
    ID = JSON.stringify(verified._id)
    const todo = new Todos({
        id:ID,
        todo:req.body.todo
    });
    try{
        const savedTodo = await todo.save();
        res.send(savedTodo)
    }catch(err){
        console.log(err)
    }
});


module.exports = router;