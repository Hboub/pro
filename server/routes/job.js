const { Router } = require('express');
const router = Router();
const isAuth = require('../middlewares/isAuth');
const isRegistered = require('../middlewares/isRegistered');
const formidable = require('express-formidable');

const jobController = require('../controllers/job');

// USER ROUTES
router.post('/job', isAuth, isRegistered, jobController.createJob);
router.get('/jobs', isAuth, isRegistered, jobController.getUserJobs);
router.post('/uploadimage', isAuth, isRegistered, formidable(), jobController.uploadImage);
router.get('/removeimage', isAuth, isRegistered, jobController.removeImage);
router.get('/getjobs', jobController.getJob);
router.delete('/job/:id', jobController.removeJob);


module.exports = router;