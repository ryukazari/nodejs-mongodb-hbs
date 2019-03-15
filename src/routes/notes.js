const express = require('express');
const router = express.Router();

router.get('/notes/note', (req,res)=>{
    res.send({message: 'Note'})
});

module.exports = router;