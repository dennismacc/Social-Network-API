
const router = require('express').Router();
const { Thought, Reaction } = require('../../models')

//TODO: ROUTE TO GET ALL THOUGHTS
router.get('/', async (req, res) => {
    try {
        const thoughtsData = await Thought.find({})
        res.json(thoughtsData)
    } catch (err) {
        res.status(500).json(err)
    }
});

//TODO: ROUTE TO CREATE A NEW THOUGHT
router.post('/', async (req, res) => {
    try {
        const newThought = await Thought.create(req.body)
        res.status(201).json(newThought)
    } catch (err) {
        res.status(500).json(err)
    }
});

//TODO: ROUTE TO GET SINGLE THOUGHT BASED ON THOUGHT ID
router.get('/:thoughtId', async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });
        res.json(thought)
    } catch (err) {
        res.status(500).json(err)
    }
});

//TODO: ROUTE TO UPDATE A THOUGHT
router.put('/', async (req, res) => {
    try {
        const updatedThought = await Thought.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
        res.json(updatedThought)
    } catch (err) {
        res.status(500).json(err)
    }
});

//TODO: ROUTE TO DELETE A THOUGHT BASED ON THOUGHT ID
router.delete('/:thoughtId', async (req, res) => {
    try {
        const deletedThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId })
        res.json(deletedThought)
    } catch (err) {
        res.status(500).json(err)
    }
});

//TODO: ROUTE TO ADD REACTION TO A THOUGHT
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const newReaction = await Reaction.create(req.body)
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $push: { reactions: newReaction._id } }, { new: true })
        res.json(newReaction && thought)
    } catch (err) {
        res.status(500).json(err)
    }
});

//TODO: ROUTE TO DELETE A REACTION ON A THOUGHT
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const deletedReaction = await Reaction.findOneAndDelete({ _id: req.params.reactionId })
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: req.params.reactionId } }, { new: true })
        res.json(deletedReaction && thought)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;
