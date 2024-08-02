const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

//For MenuItem
router.post('/', async (req, res) => {
    try{
        const data = req.body;
        const newMenuItem = new MenuItem(data);
        const response = await newMenuItem.save();
        console.log(' Menu Data Saved');
        res.status(200).json(response);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal server Error'});
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('Menu Item Fetched');
        res.status(200).json(data);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal server Error'});
    }
})

router.get('/:taste', async (req, res) => {
    try{
        const taste = req.params.taste;
        if(taste == 'sweet'|| taste == 'spicy' || taste == 'sour') {
            const response = await MenuItem.find({taste: taste});
            console.log("Menu taste Fetched");
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error: 'Invalid work type'});
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal server Error'});
    }
})

router.put('/:id', async (req, res) => {
    try{
        const menuId = req.params.id; // Extract the menu's Id

        const updatedMenuData = req.body;
        const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
            new: true,
            runValidators: true,
        })

        if(!response) {
            return res.status(404).json({error: 'Menu not Found'});
        }

        console.log('Data updated Successfully');
        res.status(200).json(response);
    }

    catch(err) {
        console.log(err);
        res.status(500).json({error : 'Internal Server Error'});
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const menuId = req.params.id; // Extract menu's Id

        const response = await MenuItem.findByIdAndDelete(menuId);

        if(!response) {
            return res.status(404).json({error: 'Menu Not Found'})
        }

        console.log('Data deleted');
        res.status(200).json({message: 'Menu Deleted Successfully'})
    }
    
    catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server error'});
    }
})

module.exports = router;