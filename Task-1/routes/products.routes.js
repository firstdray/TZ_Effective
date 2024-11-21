const Router = require('express');
const router = new Router();
const ProductController = require('../controller/products.controller');

router.post("/shops", ProductController.createShop)

router.post('/products', ProductController.createProduct);
router.get("/products", ProductController.findProductsByFilters)

router.post('/inventory', ProductController.createInventory);
router.put('/inventory/increase', ProductController.increase);
router.put('/inventory/decrease', ProductController.decrease);
router.get("/inventory", ProductController.findInventoryByFilters);



module.exports = router;