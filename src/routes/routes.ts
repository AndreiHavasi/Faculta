import express from 'express';
import UserController from '../controllers/user';
import CarController from '../controllers/car';
import OrderController from '../controllers/order';
import verifyAccessToken from '../middleware/verifyAccessToken';

const router = express.Router();

router.post('/users/register', UserController.addUser);
router.post('/users/login', UserController.login);
router.post('/users/logout', UserController.logout);
router.post('/users/refresh-token', UserController.handleRefreshToken);

router.get('/orders', verifyAccessToken, OrderController.getOrders);
router.post('/orders', verifyAccessToken, OrderController.addOrder);
router.patch('/orders', verifyAccessToken, OrderController.updateOrder);
router.delete('/orders', verifyAccessToken, OrderController.deleteOrder);

router.get('/cars', verifyAccessToken, CarController.getCars);
router.put('/cars', verifyAccessToken, CarController.updateCar);

export = router;
