const { Router } = require('express');
const {
	handleCreateCheckoutSession,
	handleGetSessionStatus,
} = require('../controllers/gateways.controller');

const router = Router();

router.post('/create-checkout-session', handleCreateCheckoutSession);
router.get('/session-status', handleGetSessionStatus);

module.exports = router;
