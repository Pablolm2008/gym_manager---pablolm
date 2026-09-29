const pool = require("../config/database");

class IngresoRepository {
    async crear(ingreso, db = pool) {
        const sql = `INSERT INTO ingreso (id_pago, concepto, monto, fecha)
                     VALUES (?, ?, ?, ?)`;
        const [resultado] = await db.execute(sql, [
            ingreso.id_pago, ingreso.concepto, ingreso.monto, ingreso.fecha
        ]);
        return resultado.insertId;
    }

    async listarTodos() {
        const sql = `
            SELECT i.id_ingreso, i.id_pago, i.concepto, i.monto, i.fecha,
                   CONCAT(c.nombre, ' ', c.apellido) AS cliente
            FROM ingreso i
            INNER JOIN pago pg ON i.id_pago = pg.id_pago
            INNER JOIN contrato ct ON pg.id_contrato = ct.id_contrato
            INNER JOIN cliente_plan cp ON ct.id_cliente_plan = cp.id_cliente_plan
            INNER JOIN cliente c ON cp.id_cliente = c.id_cliente
            ORDER BY i.fecha DESC, i.id_ingreso DESC`;
        const [filas] = await pool.execute(sql);
        return filas;
    }

    async total() {
        const [filas] = await pool.execute(
            `SELECT COALESCE(SUM(monto),0) AS total_ingresos FROM ingreso`
        );
        return Number(filas[0].total_ingresos);
    }
}
module.exports = IngresoRepository;
