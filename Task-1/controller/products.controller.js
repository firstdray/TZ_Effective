const db = require("../db");
const req = require("express/lib/request");
const res = require("express/lib/response");

class ProductController {

    async createShop(req, res) {
        try {
            const result = await db.query("INSERT INTO shops DEFAULT VALUES RETURNING id")
            res.status(200).json(result.rows[0])
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: "Ошибка при создании магазина",
            })
        }
    }

    async createProduct(req, res) {
        const {plu, name} = req.body;
        try {
            const result = await db.query("INSERT INTO products (plu, product_name) values ($1, $2) RETURNING id", [plu, name]);
            res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: "Ошибка при создании товара",
            })
        }
    }

    async findProductsByFilters(req, res) {
        const {plu, name} = req.body;
        let query = `SELECT * FROM products WHERE TRUE`;

        const params = []

        if (name) {
            query += ` AND product_name ILIKE $${params.length + 1}`;
            params.push(name);
        }

        if (plu) {
            query += ` AND plu = $${params.length + 1}`;
            params.push(plu);
        }

        try {
            const result = await db.query(query, params);


            if (result.rows.length === 0) {
                return res.status(404).json({error: "Нет товаров, соответствующих заданным фильтрам."})
            }

            res.status(200).json(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({error: "Ошибка при получении товаров"})
        }
    }

    async createInventory(req, res) {
        const {product_id, shop_id, shelf_quantity, order_quantity} = req.body;
        try {
            const result = await db.query("INSERT INTO inventory (product_id, shop_id, shelf_quantity, order_quantity) VALUES ($1, $2, $3, $4) RETURNING *",
                [product_id, shop_id, shelf_quantity, order_quantity]);
            res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: "Ошибка при создании остатка"
            })
        }
    }

    async increase(req, res) {
        const {product_id, shelf_quantity} = req.body;
        try {
            const result = await db.query("UPDATE inventory SET shelf_quantity = shelf_quantity + $1 WHERE product_id = $2 RETURNING *",
                [shelf_quantity, product_id]);
            if (result.rowCount === 0) {
                return res.status(404).json({error: "Остаток не найден"})
            }
            res.status(200).json(result.rows[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({error: "Ошибка при увеличении остатка"})
        }
    }

    async decrease(req, res) {
        const {product_id, shelf_quantity} = req.body;
        try {
            const result = await db.query("UPDATE inventory SET shelf_quantity = shelf_quantity - $1 WHERE product_id = $2 RETURNING *",
                [shelf_quantity, product_id]);
            if (result.rowCount === 0) {
                return res.status(404).json({error: "Остаток не найден"})
            }
            res.status(200).json(result.rows[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({error: "Ошибка при уменьшении остатка"})
        }
    }

    async findInventoryByFilters(req, res) {
        const {plu, shop_id, shelf_quantity_min, shelf_quantity_max, order_quantity_min, order_quantity_max} = req.body;
        let query = `SELECT i.*, p.plu FROM inventory i JOIN products p ON i.product_id = p.id WHERE TRUE`;

        const params = []

        if (plu) {
            query += ` AND p.plu = $${params.length + 1}`
            params.push(plu);
        }

        if (shop_id) {
            query += ` AND shop_id = $${params.length + 1}`;
            params.push(shop_id);
        }

        if (shelf_quantity_min !== undefined && shelf_quantity_max !== undefined) {
            query += ` AND i.shelf_quantity BETWEEN $${params.length + 1} AND $${params.length + 2}`;
            params.push(shelf_quantity_min, shelf_quantity_max);
        }

        if (order_quantity_min !== undefined && order_quantity_max !== undefined) {
            query += ` AND i.order_quantity BETWEEN $${params.length + 1} AND $${params.length + 2}`;
            params.push(order_quantity_min, order_quantity_max);
        }

        try {
            const result = await db.query(query, params);
            res.status(200).json(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({error: "Ошибка при получение остатка"});
        }
    }

}


module.exports = new ProductController();