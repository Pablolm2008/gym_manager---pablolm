const pool = require("../config/database");

class PagoRepository {
    async crear(pago, db = pool) {
        const sql = `INSERT INTO pago (id_contrato, monto, fecha, metodo_pago)
                     VALUES (?, ?, ?, ?)`;
        const [resultado] = await db.execute(sql, [
            pago.id_contrato, pago.monto, pago.fecha, pago.metodo_pago
        ]);
        return resultado.insertId;
    }

    async buscarPorId(id_pago) {
        const sql = `
            SELECT pg.id_pago, pg.id_contrato, pg.monto, pg.fecha, pg.metodo_pago,
                   ct.id_cliente_plan, CONCAT(c.nombre, ' ', c.apellido) AS cliente
            FROM pago pg
            INNER JOIN contrato ct ON pg.id_contrato = ct.id_contrato
            INNER JOIN cliente_plan cp ON ct.id_cliente_plan = cp.id_cliente_plan
            INNER JOIN cliente c ON cp.id_cliente = c.id_cliente
            WHERE pg.id_pago = ?`;
        const [filas] = await pool.execute(sql, [id_pago]);
        return filas[0] || null;
    }

    async listarTodos() {
        const sql = `
            SELECT pg.id_pago, pg.id_contrato,
                   CONCAT(c.nombre, ' ', c.apellido) AS cliente,
                   pg.monto, pg.fecha, pg.metodo_pago
            FROM pago pg
            INNER JOIN contrato ct ON pg.id_contrato = ct.id_contrato
            INNER JOIN cliente_plan cp ON ct.id_cliente_plan = cp.id_cliente_plan
            INNER JOIN cliente c ON cp.id_cliente = c.id_cliente
            ORDER BY pg.fecha DESC, pg.id_pago DESC`;
        const [filas] = await pool.execute(sql);
        return filas;
    }
}
module.exports = PagoRepository;
