const pool = require("../config/database");

class ClientePlanRepository {

    async crear(clientePlan, db = pool) {
        const sql = `
            INSERT INTO cliente_plan
            (id_cliente, id_plan, fecha_inicio, fecha_fin, estado)
            VALUES (?, ?, ?, ?, ?)
        `;

        const [resultado] = await db.execute(sql, [
            clientePlan.id_cliente,
            clientePlan.id_plan,
            clientePlan.fecha_inicio,
            clientePlan.fecha_fin,
            clientePlan.estado
        ]);

        return resultado.insertId;
    }

    async buscarPorId(id_cliente_plan, db = pool) {
        const sql = `
            SELECT
                cp.id_cliente_plan,
                cp.id_cliente,
                CONCAT(c.nombre, ' ', c.apellido) AS cliente,
                cp.id_plan,
                p.nombre AS plan,
                cp.fecha_inicio,
                cp.fecha_fin,
                cp.estado
            FROM cliente_plan cp
            INNER JOIN cliente c
                ON cp.id_cliente = c.id_cliente
            INNER JOIN plan p
                ON cp.id_plan = p.id_plan
            WHERE cp.id_cliente_plan = ?
        `;

        const [filas] = await db.execute(sql, [id_cliente_plan]);

        return filas[0] || null;
    }

    async listarActivos(db = pool) {
        const sql = `
            SELECT
                cp.id_cliente_plan,
                cp.id_cliente,
                CONCAT(c.nombre, ' ', c.apellido) AS cliente,
                cp.id_plan,
                p.nombre AS plan,
                cp.fecha_inicio,
                cp.fecha_fin,
                cp.estado
            FROM cliente_plan cp
            INNER JOIN cliente c
                ON cp.id_cliente = c.id_cliente
            INNER JOIN plan p
                ON cp.id_plan = p.id_plan
            WHERE cp.estado = 'Activo'
            ORDER BY cp.fecha_inicio DESC
        `;

        const [filas] = await db.execute(sql);

        return filas;
    }

    async listarTodos(db = pool) {
        const sql = `
            SELECT cp.id_cliente_plan, cp.id_cliente,
                   CONCAT(c.nombre, ' ', c.apellido) AS cliente,
                   cp.id_plan, p.nombre AS plan,
                   cp.fecha_inicio, cp.fecha_fin, cp.estado
            FROM cliente_plan cp
            INNER JOIN cliente c ON cp.id_cliente = c.id_cliente
            INNER JOIN plan p ON cp.id_plan = p.id_plan
            ORDER BY cp.fecha_inicio DESC, cp.id_cliente_plan DESC`;
        const [filas] = await db.execute(sql);
        return filas;
    }

    async actualizarEstado(id_cliente_plan, estado, db = pool) {
        const sql = `
            UPDATE cliente_plan
            SET estado = ?
            WHERE id_cliente_plan = ?
        `;

        const [resultado] = await db.execute(sql, [
            estado,
            id_cliente_plan
        ]);

        return resultado.affectedRows > 0;
    }
}

module.exports = ClientePlanRepository;

