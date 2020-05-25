const express = require('express');
const { check, validationResult } = require('express-validator');
const Event = require('../models/Event');
const Profile = require('../models/Profile');
const verify = require('../verifytokenmw/verify_mv');

module.exports = (app) => {
  app.get('/api/event/allevents', verify, async (req, res) => {
    try {
      const events = await Event.find().sort({ date: -1 });
      res.json(events);
    } catch (err) {
      // console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  app.post(
    '/api/event/addevent',
    [
      verify,
      [
        check('game', 'You have to tell your game name to players')
          .not()
          .isEmpty(),
        check('description', 'Hey please tell ur players about this event')
          .not()
          .isEmpty(),
      ],
      // check('image', 'Image or poster of your event is required').not().isEmpty(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
      }
      let {
        description,
        game,
        gamelink,
        title,
        teamsize,
        poolprize,
        from,
        to,
        hours,
      } = req.body;
      // build eventitems object
      let eventitems = {};
      eventitems.user = req.user.id;
      if (game) eventitems.game = game;
      if (description) eventitems.description = description;
      if (title) eventitems.title = title;
      if (gamelink) eventitems.gamelink = gamelink;
      if (teamsize) eventitems.teamsize = teamsize;
      if (poolprize) eventitems.poolprize = poolprize;
      if (from) eventitems.from = from;
      if (to) eventitems.to = to;
      if (hours) eventitems.hours = hours;

      try {
        let event = new Event(eventitems);

        let eventsuccess = await event.save();

        if (!eventsuccess) {
          return res.json({
            errors: [{ msg: 'Sorry ur event was not posted' }],
          });
        }

        let profile = await Profile.findOne({ user: req.user.id });

        profile.myevents.push(event);

        await profile.save();

        if (!profile) {
          return res.json({
            errors: [{ msg: 'Sorry ur event was not saved in your profile' }],
          });
        }

        res.json(profile.myevents);
      } catch (err) {
        res.status(500).send('Server Error');
        // console.error(err.message);
      }
    }
  );
};
