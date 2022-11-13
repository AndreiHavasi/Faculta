import express from 'express';
import UserController from '../controllers/user';
import CarController from '../controllers/car';
import OrderController from '../controllers/order';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/users/register', UserController.addUser);
router.post('/users/login', UserController.login);

router.get('/orders', auth, OrderController.getOrders);
router.post('/orders', auth, OrderController.addOrder);

router.get('/cars', auth, CarController.getCars);
router.put('/cars', auth, CarController.updateCar);

export = router;
