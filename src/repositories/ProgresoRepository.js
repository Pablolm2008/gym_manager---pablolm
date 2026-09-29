const pool = require("../config/database");

class ProgresoRepository {

    async crear(progreso) {
        const sql = `
            INSERT INTO progreso
            (
                id_cliente_plan,
                fecha,
                peso,
                grasa_corporal,
                cintura,
                brazo,
                pecho,
                pierna,
                foto,
                comentarios
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [resultado] = await pool.execute(sql, [
            progreso.id_cliente_plan,
            progreso.fecha,
            progreso.peso,
            progreso.grasa_corporal,
            progreso.cintura,
            progreso.brazo,
            progreso.pecho,
            progreso.pierna,
            progreso.foto,
            progreso.comentarios
        ]);

        return resultado.insertId;
    }

    async listarPorClientePlan(id_cliente_plan) {
        const sql = `
            SELECT
                id_progreso,
                id_cliente_plan,
                fecha,
                peso,
                grasa_corporal,
                cintura,
                brazo,
                pecho,
                pierna,
                foto,
                comentarios
            FROM progreso
            WHERE id_cliente_plan = ?
            ORDER BY fecha ASC
        `;

        const [filas] = await pool.execute(sql, [
            id_cliente_plan
        ]);

        return filas;
    }

    async buscarUltimo(id_cliente_plan) {
        const sql = `
            SELECT
                id_progreso,
                id_cliente_plan,
                fecha,
                peso,
                grasa_corporal,
                cintura,
                brazo,
                pecho,
                pierna,
                foto,
                comentarios
            FROM progreso
            WHERE id_cliente_plan = ?
            ORDER BY fecha DESC
            LIMIT 1
        `;

        const [filas] = await pool.execute(sql, [
            id_cliente_plan
        ]);

        return filas[0] || null;
    }

    async eliminar(id_progreso) {
        const sql = `
            DELETE FROM progreso
            WHERE id_progreso = ?
        `;

        const [resultado] = await pool.execute(sql, [
            id_progreso
        ]);

        return resultado.affectedRows;
    }
}

module.exports = ProgresoRepository;

