import { Router } from 'express';
import auth from '../../middleware/auth';
// Item Model
import Poll from '../../models/Poll';

const router = Router();

/**
 * @route   GET api/polls
 * @desc    Get All Polls
 * @access  Public
 */

router.get('/', async (req, res) => {
  try {
    const polls = await Poll.find();
    if (!polls) throw Error('No polls');

    res.status(200).json(polls);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   POST api/polls
 * @desc    Create An Poll
 * @access  Private
 */

router.post('/', auth, async (req, res) => {
  const newPoll = new Poll({
    title: req.body.title,
    options : req.body.options
  });

  try {
    const poll = await newPoll.save();
    if (!poll) throw Error('Something went wrong saving the poll');

    res.status(200).json(poll);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   DELETE api/polls/:id
 * @desc    Delete A Poll
 * @access  Private
 */

router.delete('/:id', auth, async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) throw Error('No poll found');

    const removed = await poll.remove();
    if (!removed)
      throw Error('Something went wrong while trying to delete the poll');

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

/**
 * @route   GET api/polls/:id
 * @desc    Find A Poll
 * @access  Private
 */
router.get('/:id', auth, async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) throw Error('No poll found');

    res.status(200).json(poll);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   PUT api/polls/:id
 * @desc    Update A Poll
 * @access  Private
 */
router.put('/:id', auth, async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) throw Error('No poll found');

    poll.title = req.body.title;
    poll.options = req.body.options;

    const newPoll = await poll.save();
    if (!newPoll) throw Error('Something went wrong saving the poll');

    res.status(200).json(newPoll);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

export default router;
