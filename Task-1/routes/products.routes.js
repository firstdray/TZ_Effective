import {Router} from 'express';
const router = new Router();
import ProductController from '../controller/products.controller.js';

router.post("/shops", ProductController.createShop)

router.post('/products', ProductController.createProduct);
router.get("/products", ProductController.findProductsByFilters)

router.post('/inventory', ProductController.createInventory);
router.put('/inventory/increase', ProductController.increase);
router.put('/inventory/decrease', ProductController.decrease);
router.get("/inventory", ProductController.findInventoryByFilters);



export default router;