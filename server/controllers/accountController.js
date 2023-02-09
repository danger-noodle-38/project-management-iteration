const express = require('express');
const { Account, Cookie, Session } = require('../models/models');
const bcrypt = require('bcryptjs');
const accountController = {};

accountController.createAccount = (req, res, next) => {
  console.log('we are currently in account controller create account');
  const { firstName, lastName, email, password } = res.locals;
  // console.log(firstName, lastName, email, password, 'checking credentials');

  if (!firstName || !lastName || !email || !password) {
    return next('Missing credentials');
  }
  Account.create({ firstName, lastName, email, password })
    .then((data) => {
      console.log('We got into the account creation method');
      res.locals.newUser = data;
      console.log(data);
      next();
    })
    .catch((err) => {
      next({
        log: 'Error occurred in the accountController.createAccount middleware',
        status: 400,
        err: { err: 'Error occurred in creating your account' },
      });
    });
};

accountController.checkUserExists = (req, res, next) => {
  console.log('in checkUserExists');
  //user logs in with email and password

  const { email } = JSON.parse(req.body);
  // const { email } = res.locals;

  console.log('email: ', email);
  Account.find({ email })
    .exec()
    .then((data) => {
      console.log(data);
      //compare plaintext pw and encrypted
      if (data.length) {
        next();
      } else {
        next({
          log: 'Error occurred in the accountController.checkUserExists middleware',
          status: 400,
          err: { err: 'User does not exist' },
        });
      }
    })
    .catch((err) => {
      next({
        log: 'Error occurred in the accountController.verifyUser middleware',
        status: 400,
        err: { err: 'Unknown error' },
      });
    });
};

accountController.checkUserExistsFromResLocals = (req, res, next) => {
  console.log('in checkUserExistsFromResLocals');
  //user logs in with email and password

  // const { email } = JSON.parse(req.body);
  const { email } = res.locals;

  console.log('email in check user exists: ', email);
  Account.find({ email })
    .exec()
    .then((data) => {
      console.log(data);
      //compare plaintext pw and encrypted
      if (data.length) {
        console.log('found the account, checkUserExistsFromResLocals!');
        res.locals.accountExists = true;
        return next();
      } else {
        console.log('Did NOT find the account, checkUserExistsFromResLocals!');
        res.locals.accountExists = false;
        return next();
      }
    })
    .catch((err) => {
      next({
        log: 'Error occurred in the accountController.checkUserExistsFromResLocals middleware',
        status: 400,
        err: { err: 'Unknown error' },
      });
    });
};

accountController.verifyUser = async (req, res, next) => {
  //user logs in with email and password
  const { email, password: plaintextPassword } = res.locals;

  // Unclear if this does anything... I doubt it because it runs before the actual check
  // res.locals.response = {
  //   email: email,
  //   message: 'credentials are correct',
  // };

  try {
    const account = await Account.find({ email }, 'password').exec();

    if (!account.length)
      throw new Error('User not found in accountController.verifyUser');

    const hash = account[0].password;

    const isPasswordValid = await bcrypt.compare(
      // coerce to string in case it came from OAuth (Github id is a number)
      plaintextPassword.toString(),
      hash
    );

    if (isPasswordValid) {
      return next();
    } else {
      throw new Error(
        'Credentials are incorrect, from accountController.verifyUser'
      );
    }
  } catch (err) {
    return next({
      location: 'Error occurred in the accountController.verifyUser middleware',
      log: err.message,
      status: 400,
      err: { err: 'Incorrect username or password' },
    });
  }
};

//for auto-checking user exists based on browser cookie upon useEffect react hook
accountController.checkUser = (req, res, next) => {
  // console.log('testing');
  const ObjectId = require('mongodb').ObjectId;
  // console.log('ObjectID:', ObjectId);
  const id = req.cookies.ssid;
  const o_id = new ObjectId(id);

  Account.find({ _id: o_id })
    .exec()
    .then((data) => {
      console.log('we got into the check user method');
      //console.log(data);
      const { firstName, lastName, email } = data[0];
      res.locals.userSession = { firstName, lastName, email };
      next();
    })
    .catch((err) => {
      next({
        location:
          'Error occurred in the accountController.checkUser middleware',
        log: err.message,
        status: 400,
        err: { err: 'Unknown cookie error' },
      });
    });
};

//add project to account accountController.addProjectToAccount
accountController.addProjectToAccount = (req, res, next) => {
  const ObjectId = require('mongodb').ObjectId;
  const id = req.cookies.ssid;
  const o_id = new ObjectId(id);
  console.log('checking from add project to account');
  Account.findOneAndUpdate(
    { _id: o_id },
    { $push: { projectIds: res.locals.newEntry } }
  )
    .exec()
    .then((data) => {
      console.log('we successfully added a project id');
      //console.log(data);
      // const {firstName, lastName, email} = data[0];
      // res.locals.new = {firstName, lastName, email};
      console.log(data);
      next();
    })
    .catch((err) => {
      next({
        log: 'Error occurred in the accountController.checkUser middleware',
        status: 400,
        err: { err: 'Unknown cookie error' },
      });
    });
};

//get information for individuals on account
accountController.getUserProjectCreds = (req, res, next) => {
  console.log('checking from adding creds from project');
  for (let i = 0; i < res.locals.users.length; i++) {
    const { userid } = res.locals.users[i];
    console.log(userid);

    Account.find({ email: userid })
      .exec()
      .then((data) => {
        console.log('we got into the check individual user method');
        //console.log(data);
        const { firstName, lastName, email } = data[0];
        res.locals.users[i].firstName = firstName;
        res.locals.users[i].lastName = lastName;
        console.log(res.locals.users[i]);
      })
      .catch((err) => {
        next({
          log: 'Error occurred in the accountController.checkUser middleware',
          status: 400,
          err: { err: 'Unknown cookie error' },
        });
      });
  }
  next();
};

module.exports = accountController;
