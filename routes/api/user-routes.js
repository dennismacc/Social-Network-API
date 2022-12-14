
const router = require('express').Router();
const { User } = require("../../models")

//TODO - ROUTE THAT GETS ALL THE USERS, include friends?
router.get('/', async (req, res) => {
    try {
        const userData = await User.find({});
        res.json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//TODO - ROUTE THAT CREATES A NEW USER
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//TODO - ROUTE THAT GETS A SINGLE USER BASED ON USER ID
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId });
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
})

//TODO - ROUTE THAT UPDATES A SINGLE USER
router.put('/:userId', async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
})

//TODO - ROUTE THAT DELETES A SINGLE USER BASED ON USER ID
router.delete('/:userId', async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });
        res.json(deletedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//TODO - ROUTE THAT ADDS A FRIEND TO A USER
router.put('/:userId/friends/:friendId', async (req, res) => {
    try {
        const addFriend = await User.findOneAndUpdate(
            { _id: req.params.userId },
            {$addToSet: {friends: req.params.friendId}},
            {runValidators: true, new: true});
        res.json(addFriend);
    } catch (err) {
        res.status(500).json(err);
    }
})

//TODO - ROUTE THAT DELETES A FRIEND FROM A USER'S FRIENDS, DONT DELETE THE FRIEND AS A USER THOUGH!
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const deleteFriend = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        );
        res.json(deleteFriend);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
