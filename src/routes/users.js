const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
  });

router.post('/users/signin', passport.authenticate('local', {
  successRedirect: '/notes',
  failureRedirect: '/users/signin',
  failureFlash: true
}));   

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
  });

router.post('/users/signup', async (req, res) => {
    let errors = [];
    const {name, email, password, confirmPassword} = req.body;
    if(name.length<=0){
      errors.push({text: 'Please insert your Name.'});
    }
    if(email.length<=0){
      errors.push({text: 'Please insert your Email.'});
    }
    if(password != confirmPassword) {
      errors.push({text: 'Passwords do not match.'});
    }
    if(password.length < 4) {
      errors.push({text: 'Passwords must be at least 4 characters.'})
    }
    if(errors.length > 0){
      res.render('users/signup', {errors, name, email, password, confirmPassword});
    }else{
      const emailUser = await User.findOne({email: email});
      if(emailUser) {
        req.flash('error_msg', 'Email is already in use');
        res.redirect('/users/signup');
      }else{
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password)
        await newUser.save();
        req.flash('succes_msg', 'You are registered');
        res.redirect('/users/signin');
      }
    }    
});

router.get('/users/logout', (req,res)=>{
  req.logout();
  res.redirect('/');
});

module.exports = router;