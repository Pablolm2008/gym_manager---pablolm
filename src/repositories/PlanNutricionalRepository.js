const pool = require("../config/database");

class PlanNutricionalRepository {

    async crear(plan) {
        const sql = `
            INSERT INTO plan_nutricional
            (
                id_cliente,
                id_cliente_plan,
                nombre,
                fecha_inicio,
                fecha_fin
            )
            VALUES (?, ?, ?, ?, ?)
        `;

        const [resultado] = await pool.execute(sql, [
            plan.id_cliente,
            plan.id_cliente_plan,
            plan.nombre,
            plan.fecha_inicio,
            plan.fecha_fin
        ]);

        return resultado.insertId;
    }

    async buscarPorId(id_plan_nutricional) {
        const sql = `
            SELECT
                id_plan_nutricional,
                id_cliente,
                id_cliente_plan,
                nombre,
                fecha_inicio,
                fecha_fin
            FROM plan_nutricional
            WHERE id_plan_nutricional = ?
        `;

        const [filas] = await pool.execute(sql, [
            id_plan_nutricional
        ]);

        return filas[0] || null;
    }

    async listarPorCliente(id_cliente) {
        const sql = `
            SELECT
                id_plan_nutricional,
                id_cliente,
                id_cliente_plan,
                nombre,
                fecha_inicio,
                fecha_fin
            FROM plan_nutricional
            WHERE id_cliente = ?
            ORDER BY fecha_inicio DESC
        `;

        const [filas] = await pool.execute(sql, [
            id_cliente
        ]);

        return filas;
    }

    async agregarAlimento(alimento) {
        const sql = `
            INSERT INTO plan_nutricional_alimento
            (
                id_plan_nutricional,
                id_alimento,
                dia,
                cantidad,
                calorias
            )
            VALUES (?, ?, ?, ?, ?)
        `;

        const [resultado] = await pool.execute(sql, [
            alimento.id_plan_nutricional,
            alimento.id_alimento,
            alimento.dia,
            alimento.cantidad,
            alimento.calorias
        ]);

        return resultado.insertId;
    }

    async listarAlimentos(id_plan_nutricional) {
        const sql = `
            SELECT
                pna.id_plan_nutricional_alimento,
                pna.dia,
                a.nombre AS alimento,
                pna.cantidad,
                a.calorias_estimadas,
                pna.calorias
            FROM plan_nutricional_alimento pna
            INNER JOIN alimento a
                ON pna.id_alimento = a.id_alimento
            WHERE pna.id_plan_nutricional = ?
            ORDER BY
                FIELD(
                    pna.dia,
                    'Lunes',
                    'Martes',
                    'Miércoles',
                    'Jueves',
                    'Viernes',
                    'Sábado',
                    'Domingo'
                )
        `;

        const [filas] = await pool.execute(sql, [
            id_plan_nutricional
        ]);

        return filas;
    }

    async reporteSemanal(id_plan_nutricional) {
        const sql = `
            SELECT
                dia,
                SUM(calorias) AS calorias_totales
            FROM plan_nutricional_alimento
            WHERE id_plan_nutricional = ?
            GROUP BY dia
            ORDER BY
                FIELD(
                    dia,
                    'Lunes',
                    'Martes',
                    'Miércoles',
                    'Jueves',
                    'Viernes',
                    'Sábado',
                    'Domingo'
                )
        `;

        const [filas] = await pool.execute(sql, [
            id_plan_nutricional
        ]);

        return filas;
    }
}

module.exports = PlanNutricionalRepository;

