var express = require('express');
var router = express.Router();

const {
  registerClient,
  loginClient,
  logoutClient,
  authToken
} = require('../controllers/clients_controller')

router.post('/register', registerClient);
router.post('/login', loginClient);
router.post('/logout', logoutClient);
router.get('/auth', authToken);


module.exports = router;
