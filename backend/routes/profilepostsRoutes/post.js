const { check, validationResult } = require('express-validator');
const express = require('express');
const verify = require('../../verifytokenmw/verify_mv');
// const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

module.exports = (app) => {
  // @route    POST api/posts/setuppostinfo
  // @desc     Create a postinfo
  // @access   Private
  // app.post('/setuppostinfo', verify, async (req, res) => {
  //   const user = await User.findOneAndUpdate(
  //     { _id: req.user.id },
  //     { setuppostinfo: true }
  //   );
  //   // const user = User.findOne({ user: req.user.id });
  //   try {
  //     if (user) {
  //       const postinfo = new Postinfo({
  //         user: req.user.id,
  //         name: user.name,
  //         tag: user.tag,
  //       });
  //       await postinfo.save();
  //       // user.setuppostinfo = true;
  //       // user.save();
  //       return res.json({ msg: 'postinfo setup successfull' });
  //     } else {
  //       return res.status(404).json({ msg: 'User not found' });
  //     }
  //   } catch (err) {
  //     res.status(500).send('Server Error');
  //     console.error(err.message);
  //   }
  // });

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

        myprofile.myposts.push(post);

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
  app.put('/likehandling/:user_id/:post_id', verify, async (req, res) => {
    try {
      const postinfo = await Postinfo.findById(req.params.id);
      const user = await User.findById(req.user.id).select('-password');

      // Pull out post
      let post = postinfo.usersallposts.find(
        (post) => post.id === req.params.post_id
      );
      // Check if the post has already been liked
      if (
        post.likes.filter((like) => like.user.toString() === req.user.id)
          .length > 0
      ) {
        // return res.status(400).json({ msg: 'Post is already liked' });
        // Get remove index
        const removeIndex = post.likes
          .map((like) => like.user.toString())
          .indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        await post.save();

        return res.json(post.likes);
      }

      post.likes.push({ user: req.user.id, name: user.name });

      await post.save();

      res.json(post.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // @route    POST api/posts/comment/:id
  // @desc     Comment on a post
  // @access   Private
  app.post(
    '/comment/:user_id/:post_id',
    [verify, [check('text', 'Text is required').not().isEmpty()]],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const user = await User.findById(req.user.id).select('-password');
        const postinfo = await Postinfo.findById(req.params.user_id);
        // Pull out post
        let post = postinfo.usersallposts.find(
          (post) => post.id === req.params.post_id
        );
        const newComment = {
          text: req.body.text,
          name: user.name,
          // avatar: user.avatar,
          user: req.user.id,
        };

        post.comments.push(newComment);

        await postinfo.save();

        res.json(post.comments);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );

  // @route    DELETE api/posts/comment/:id/:comment_id
  // @desc     Delete comment
  // @access   Private
  app.delete(
    '/comment/:user_id/:post_id/:comment_id',
    verify,
    async (req, res) => {
      try {
        const postinfo = await Postinfo.findById(req.params.user_id);
        // Pull out post
        let post = postinfo.usersallposts.find(
          (post) => post.id === req.params.post_id
        );
        // Pull out comment
        const comment = post.comments.find(
          (comment) => comment.id === req.params.comment_id
        );
        // Make sure comment exists
        if (!comment) {
          return res.status(404).json({ msg: 'Comment does not exist' });
        }
        // Check user
        if (comment.user.toString() !== req.user.id) {
          return res.status(401).json({ msg: 'User not authorized' });
        }

        post.comments = post.comments.filter(
          ({ id }) => id !== req.params.comment_id
        );

        await post.save();

        return res.json(post.comments);
      } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
      }
    }
  );
};
