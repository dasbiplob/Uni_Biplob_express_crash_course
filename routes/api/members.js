const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../members');

//Get all memebers
router.get('/', (req,res) => {
    res.json(members);
    });
    
    //Get all members by Id
    router.get('/:id', (req,res) => {
        //res.send(req.params.id);
        const found = members.some(member => member.id === parseInt(req.params.id));
        if(found){
            res.json(members.filter(member => member.id === parseInt(req.params.id))) ;
        }else{
            res.status(400).json({msg: `no member of id with ${req.params.id}`});
        }
        
    });


    //Create Member
    router.post('/', (req, res) =>{

        //res.send(req.body);
        const newMember = {
            id: uuid.v4(),
            name: req.body.name,
            email: req.body.email,
            status: 'active'
        }

        if(!newMember.name || !newMember.email){
           return res.status(400).json({ msg: 'Please include a name and email' });
        }
        members.push(newMember);
        //res.json(members);
        res.redirect('/');

    }); 

    //Update Member
    router.put('/:id', (req,res) => {
        //res.send(req.params.id);
        const found = members.some(member => member.id === parseInt(req.params.id));
        if(found){
            const updateMember = req.body;
            members.forEach(members => {
                if(members.id === parseInt(req.params.id)){
                    members.name = updateMember.name ? updateMember.name : members.name;
                    members.email = updateMember.email ? updateMember.email : members.email;

                    res.json({ msg : 'Member Updated', members});
                }
            });
        } else {
            res.status(400).json({msg: `no member of id with ${req.params.id}` });
        }
    });

//Delete Member

router.delete('/:id', (req,res) => {
    //res.send(req.params.id);
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        res.json({ msg : 'Member Deleted', members: members.filter(member => member.id !== parseInt(req.params.id))}) ;
    } else {
        res.status(400).json({msg: `no member of id with ${req.params.id}` });
    }
});

    module.exports = router;
