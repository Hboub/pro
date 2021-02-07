const { Router } = require('express');
const router = Router();
const isAuth = require('../middlewares/isAuth');
const isRegistered = require('../middlewares/isRegistered');

const offerController = require('../controllers/offer');

// USER ROUTES
// router.post('/offer', isAuth, isRegistered, offerController.createOffer);
router.get('/offers/:jobId', isAuth, isRegistered, offerController.getJobOffers);
router.post('/search', offerController.searchForOffers);
router.post('/filter', offerController.filterOffers);
router.get('/offer/:id', offerController.getOffer);
// router.delete('/offer/:id', offerController.removeOffer);

module.exports = router;