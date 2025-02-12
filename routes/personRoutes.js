const express = require('express');
const router = express.Router();


const Person = require('../models/Person');

//POST route to add a person - will work
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log('Data saved');
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.get('/', async (req, res) => {
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


router.get('/:workType', async (req, res) => {
    try{
       const workType = req.params.workType;
       if(workType == 'chef'|| workType == 'manager' || workType == 'waiter') {
            const response = await Person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(response);
       }
       else{
        res.status(404).json({error: 'Invalid work type'});
       }
    }

    catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});    
    }
    
})

router.put('/:id', async(req, res) => {
    try{
        const personId = req.params.id; //Extract the id from URL paramenter
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, //Return the updated document
            runValidators: true, //Run mongoose validation
        })

        if(!response) {
            return res.status(404).json({error: 'Person not found' });
        }
        console.log("Data updated");
        res.status(200).json(response);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const personId = req.params.id; // Extract the person's ID from the URL parameter

        //Assuming you have a Person model
        const response = await Person.findByIdAndDelete(personId);

        if(!response) {
            return res.status(404).json({error: 'Person not found'})
        }

        console.log('data deleted');
        res.status(200).json({message:  'Person Deleted Successfully'})
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


module.exports = router;