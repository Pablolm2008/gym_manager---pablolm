const pool = require("../config/database");

class PlanRepository {

    async crear(plan) {
        const sql = `
            INSERT INTO plan
            (nombre, duracion, meta_fisica, nivel, precio)
            VALUES (?, ?, ?, ?, ?)
        `;

        const [resultado] = await pool.execute(sql, [
            plan.nombre,
            plan.duracion,
            plan.meta_fisica,
            plan.nivel,
            plan.precio
        ]);

        return resultado.insertId;
    }

    async listarTodos() {
        const sql = `
            SELECT
                id_plan,
                nombre,
                duracion,
                meta_fisica,
                nivel,
                precio
            FROM plan
            ORDER BY id_plan
        `;

        const [filas] = await pool.execute(sql);

        return filas;
    }

    async buscarPorId(id_plan) {
        const sql = `
            SELECT
                id_plan,
                nombre,
                duracion,
                meta_fisica,
                nivel,
                precio
            FROM plan
            WHERE id_plan = ?
        `;

        const [filas] = await pool.execute(sql, [id_plan]);

        return filas[0] || null;
    }

    async actualizar(id_plan, plan) {
        const sql = `
            UPDATE plan
            SET
                nombre = ?,
                duracion = ?,
                meta_fisica = ?,
                nivel = ?,
                precio = ?
            WHERE id_plan = ?
        `;

        const [resultado] = await pool.execute(sql, [
            plan.nombre,
            plan.duracion,
            plan.meta_fisica,
            plan.nivel,
            plan.precio,
            id_plan
        ]);

        return resultado.affectedRows;
    }

    async eliminar(id_plan) {
        const sql = `
            DELETE FROM plan
            WHERE id_plan = ?
        `;

        const [resultado] = await pool.execute(sql, [id_plan]);

        return resultado.affectedRows;
    }
}

module.exports = PlanRepository;

