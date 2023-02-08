const express = require('express');
const router = express.Router();

const accountController = require('../controllers/accountController');
const sessionController = require('../controllers/sessionController');
const cookieController = require('../controllers/cookieController');
const oauthController = require('../controllers/oauthController');

router.use(express.json());
//create a new account
router.post(
  '/',
  accountController.createAccount,
  cookieController.getSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    return res.status(201).json(res.locals.newUser);
  }
);

//check user is logged in using browser cookies in react useEffect hook
router.get('/', accountController.checkUser, (req, res) => {
  return res.status(200).json(res.locals.userSession);
});

//log in existing user
router.post(
  '/log',
  accountController.verifyUser,
  cookieController.getSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    //send status 200 and return ssid, equivalent to cookie set in browser
    return res.status(200).json(res.locals.response);
  }
);

//log out user and end session
router.get('/logout', sessionController.endSession, (req, res) => {
  res.clearCookie('ssid').json(res.locals.ssid);
});

/**
 * OAUTH
 */
router.get('/oauth/login', oauthController.loginWithGitHub, (req, res) => {
  res.status(200).end();
});

// router.get(
//   '/oauth/access_token',
//   //middleware will go here
//   (req, res) => {
//     console.table({ oauth: 'LOOK HERE FROM THE GET ROUTE' });
//     console.log('req.params:', req.params);
//     console.log('req.query:', req.query);
//     console.log('req.body:', req.body);

//     res.status(200).end('this oauth path is not really set up yet');
//   }
// );

// router.post(
//   '/oauth/access_token',
//   //middleware will go here
//   (req, res) => {
//     console.table({ oauth: 'LOOK HERE FROM THE POST ROUTER' });
//     console.log('req.params:', req.params);
//     console.log('req.query:', req.query);
//     console.log('req.body:', req.body);

//     res.status(200).end('this oauth path is not really set up yet');
//   }
// );

router.get(
  '/oauth/access_token/redirect',
  // get temporary "code" from Github (in req.query) in oauthController and AWAIT post request it back to exchange it for an access token (to Github API for user data)
  oauthController.requestGitHubIdentity,
  oauthController.queryGitHubAPIWithAccessToken,
  // get bearer token and AWAIT query api with it
  // Create account or login with MongoDB / Our Side Stuff / Chain together a bunch of other middleware

  (req, res) => {
    console.table({ oauth: 'LOOK HERE FROM THE GET ROUTE FOR REDIRECT' });
    console.log('req.params:', req.params);
    console.log('req.query:', req.query);
    console.log('req.body:', req.body);
    res.redirect('http://localhost:8080/homepage');
  }
);

module.exports = router;
