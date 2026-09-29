const pool = require("../config/database");

class EgresoRepository {

    async crear(egreso) {
        const sql = `
            INSERT INTO egreso
            (
                concepto,
                categoria,
                monto,
                fecha
            )
            VALUES (?, ?, ?, ?)
        `;

        const [resultado] = await pool.execute(sql, [
            egreso.concepto,
            egreso.categoria,
            egreso.monto,
            egreso.fecha
        ]);

        return resultado.insertId;
    }

    async listarTodos() {
        const sql = `
            SELECT
                id_egreso,
                concepto,
                categoria,
                monto,
                fecha
            FROM egreso
            ORDER BY fecha DESC
        `;

        const [filas] = await pool.execute(sql);

        return filas;
    }

    async total() {
        const sql = `
            SELECT
                COALESCE(SUM(monto), 0) AS total_egresos
            FROM egreso
        `;

        const [filas] = await pool.execute(sql);

        return filas[0].total_egresos;
    }

    async totalPorCategoria() {
        const sql = `
            SELECT
                categoria,
                SUM(monto) AS total
            FROM egreso
            GROUP BY categoria
            ORDER BY total DESC
        `;

        const [filas] = await pool.execute(sql);

        return filas;
    }
}

module.exports = EgresoRepository; 

