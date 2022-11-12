import express from 'express';
import AccountController from '../controllers/account';
import CarController from '../controllers/car';
import OrderController from '../controllers/order';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/accounts', AccountController.getAccounts);
router.post('/accounts', AccountController.addAccount);
router.put('/accounts', AccountController.updateAccount);

router.get('/orders', auth, OrderController.getOrders);
router.post('/orders', auth, OrderController.addOrder);

router.get('/cars', auth, CarController.getCars);
router.put('/cars', auth, CarController.updateCar);

export = router;
