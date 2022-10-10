import express from 'express';
import AccountController from '../controllers/account';
import CarController from '../controllers/car';
import OrderController from '../controllers/order';

const router = express.Router();

router.get('/accounts', AccountController.getAccounts);
router.post('/accounts', AccountController.addAccount);
router.put('/accounts', AccountController.updateAccount);

router.get('/orders', OrderController.getOrders);
router.post('/orders', OrderController.addOrder);

router.get('/cars', CarController.getCars);
router.put('/cars', CarController.updateCar);

export = router;