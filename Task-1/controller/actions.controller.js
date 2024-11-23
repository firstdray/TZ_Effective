import db from "../db.js"

class ActionsController {
    async getActionsProduct(req, res) {
        const { shop_id, plu, startDate, endDate, action, page = 1, limit = 10 } = req.query;

        let query = `SELECT * FROM product_actions WHERE TRUE`;
        const params = [];

        // Фильтрация по shop_id
        if (shop_id) {
            query += ` AND shop_id = $${params.length + 1}`;
            params.push(shop_id);
        }

        // Фильтрация по plu
        if (plu) {
            query += ` AND plu = $${params.length + 1}`;
            params.push(plu);
        }

        // Фильтрация по дате
        if (startDate) {
            query += ` AND created_at >= $${params.length + 1}`;
            params.push(startDate);
        }

        if (endDate) {
            query += ` AND created_at <= $${params.length + 1}`;
            params.push(endDate);
        }

        if (action) {
            query += ` AND action = $${params.length + 1}`;
            params.push(action);
        }

        const offset = (Number(page) - 1) * Number(limit);
        query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
        params.push(limit, offset);

        try {
            const result = await db.query(query, params);

            const countQuery = `SELECT COUNT(*) FROM product_actions WHERE TRUE`;
            const countResult = await db.query(countQuery);
            const totalCount = countResult.rows[0].count;

            res.status(200).json({
                totalPages: Math.ceil(totalCount / limit),
                currentPage: Number(page),
                actions: result.rows,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Ошибка при получении истории действий" });
        }
    };
}

export default new ActionsController()