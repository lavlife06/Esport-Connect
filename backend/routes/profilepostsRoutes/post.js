const { check, validationResult } = require('express-validator');
const express = require('express');
const verify = require('../../verifytokenmw/verify_mv');
// const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

module.exports = (app) => {
  // @route    POST api/posts/mypost
  // @desc     Create a post
  // @access   Private

  app.post(
    '/api/post/addmypost',
    [verify, [check('text', 'Text is required').not().isEmpty()]],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        let myprofile = await Profile.findOne({ user: req.user.id });

        if (!myprofile) {
          return res.status(400).json({
            errors: [
              { msg: 'Sorry ur profile was not found so u cant add post' },
            ],
          });
        }

        let postitems = {
          user: req.user.id,
          name: myprofile.name,
          text: req.body.text,
        };

        let post = new Post(postitems);

        let postsuccess = await post.save();

        if (!postsuccess) {
          return res.json({
            errors: [{ msg: 'Sorry ur post was not posted' }],
          });
        }

        console.log(postsuccess);
        console.log(post);

        myprofile.myposts.push({
          user: req.user.id,
          name: myprofile.name,
          text: req.body.text,
          postid: postsuccess.id,
        });

        await myprofile.save();

        if (!myprofile) {
          return res.json({
            errors: [
              { msg: 'Sorry ur post was not saved in your yourprofile' },
            ],
          });
        }

        res.json(myprofile.myposts);
      } catch (err) {
        res.status(500).send('Server Error');
        console.error(err.message);
      }
    }
  );

  // @route    GET api/posts/allposts/:user_id
  // @desc     Get all posts of a particular person
  // @access   private
  app.get('/api/post/allposts', verify, async (req, res) => {
    try {
      const posts = await Post.find().sort({
        date: -1,
      });
      res.json(posts);
    } catch (err) {
      console.error(err.message);

      res.status(500).send('Server Error');
    }
  });

  // @route    DELETE api/posts/:id
  // @desc     Delete a post
  // @access   Private
  app.delete('/api/post/deletepost/:post_id', verify, async (req, res) => {
    try {
      let myprofile = await Profile.findOne({ user: req.user.id });

      if (!myprofile) {
        return res.status(400).json({
          errors: [
            { msg: 'Sorry ur profile was not found so u cant delete post' },
          ],
        });
      }

      // // // for Global (1)
      let mypostatglobal = await Post.findById(req.params.post_id);

      // Check for post
      if (!mypostatglobal)
        return res.status(400).json({ msg: 'Post not found at Global' });

      // Check user that is deleting his own post or others
      if (mypostatglobal.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      //  Deleted Globally
      await mypostatglobal.remove();

      // i have kept some same things verification in 1 and 2 like check for post and user not authorized wala thing
      //  because we will give users both option to delete from home and from his profile

      // // // mypost from myprofile (2)
      // Pull out mypost
      let mypost = myprofile.myposts.find(
        (post) => post.id === req.params.post_id
      );

      // Check for post
      if (!mypost) return res.status(400).json({ msg: 'Post not found' });

      // Check user that is deleting his own post or others
      if (myprofile.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      myprofile.myposts = myprofile.myposts.filter((post) => {
        post.id !== req.params.post_id;
      });

      await myprofile.save();

      // res.json({ msg: 'Post removed' });
      res.json(myprofile.myposts);
    } catch (err) {
      console.error(err.message);

      if (err.kind == 'ObjectId') {
        return res.status(400).json({ msg: 'Post not found' });
      }
      res.status(500).send('Server Error');
    }
  });

  // @route    PUT api/posts/like/:id
  // @desc     Like a post
  // @access   Private
  app.put(
    '/api/post/likehandling/:user_id/:post_id',
    verify,
    async (req, res) => {
      try {
        let post = await Post.findById(req.params.post_id);
        let user = await User.findById(req.user.id).select('-password');
        let userprofile = await Profile.findOne({ user: req.params.user_id });
        //  Userprofile is the profile of the user whose post we are giving likes

        // Getting the index of the post to add likes to that exact post
        const postIndex = userprofile.myposts.findIndex(
          (item) => item.postid === req.params.post_id
        );

        // Check if the post has already been liked
        if (
          post.likes.filter((like) => like.user.toString() === req.user.id)
            .length > 0
        ) {
          post.likes = post.likes.filter((like) => {
            like.user.toString() !== req.user.id;
          });

          // Save in our global post
          await post.save();

          // // Save in our profile
          userprofile.myposts[postIndex].likes = post.likes;
          await userprofile.save();

          return res.json(post.likes);
        }

        // else
        post.likes.push({ user: req.user.id, name: user.name });

        userprofile.myposts[postIndex].likes.push({
          user: req.user.id,
          name: user.name,
        });

        // Save in global post
        await post.save();

        // // Save in our profile
        await userprofile.save();

        res.json(post.likes);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );
};
