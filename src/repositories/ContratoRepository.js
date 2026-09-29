const pool = require("../config/database");

class ContratoRepository {

    async crear(contrato, db = pool) {
        const sql = `
            INSERT INTO contrato
            (
                id_cliente_plan,
                condiciones,
                fecha_inicio,
                fecha_fin,
                precio,
                estado
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const [resultado] = await db.execute(sql, [
            contrato.id_cliente_plan,
            contrato.condiciones,
            contrato.fecha_inicio,
            contrato.fecha_fin,
            contrato.precio,
            contrato.estado
        ]);

        return resultado.insertId;
    }

    async buscarPorId(id_contrato, db = pool) {
        const sql = `
            SELECT
                ct.id_contrato,
                ct.id_cliente_plan,
                cp.id_cliente,
                CONCAT(c.nombre, ' ', c.apellido) AS cliente,
                p.nombre AS plan,
                ct.condiciones,
                ct.fecha_inicio,
                ct.fecha_fin,
                ct.precio,
                ct.estado
            FROM contrato ct
            INNER JOIN cliente_plan cp
                ON ct.id_cliente_plan = cp.id_cliente_plan
            INNER JOIN cliente c
                ON cp.id_cliente = c.id_cliente
            INNER JOIN plan p
                ON cp.id_plan = p.id_plan
            WHERE ct.id_contrato = ?
        `;

        const [filas] = await db.execute(sql, [id_contrato]);

        return filas[0] || null;
    }

    async buscarPorClientePlan(id_cliente_plan, db = pool) {
        const sql = `
            SELECT
                id_contrato,
                id_cliente_plan,
                condiciones,
                fecha_inicio,
                fecha_fin,
                precio,
                estado
            FROM contrato
            WHERE id_cliente_plan = ?
        `;

        const [filas] = await db.execute(sql, [id_cliente_plan]);

        return filas[0] || null;
    }

    async actualizarEstado(id_contrato, estado, db = pool) {
        const sql = `
            UPDATE contrato
            SET estado = ?
            WHERE id_contrato = ?
        `;

        const [resultado] = await db.execute(sql, [
            estado,
            id_contrato
        ]);

        return resultado.affectedRows > 0;
    }

    async listarTodos(db = pool) {
        const sql = `
            SELECT ct.id_contrato, ct.id_cliente_plan, cp.id_cliente,
                   CONCAT(c.nombre, ' ', c.apellido) AS cliente,
                   p.nombre AS plan, ct.condiciones,
                   ct.fecha_inicio, ct.fecha_fin, ct.precio, ct.estado
            FROM contrato ct
            INNER JOIN cliente_plan cp ON ct.id_cliente_plan = cp.id_cliente_plan
            INNER JOIN cliente c ON cp.id_cliente = c.id_cliente
            INNER JOIN plan p ON cp.id_plan = p.id_plan
            ORDER BY ct.fecha_inicio DESC, ct.id_contrato DESC`;
        const [filas] = await db.execute(sql);
        return filas;
    }

    async listarActivos(db = pool) {
        const sql = `
            SELECT
                ct.id_contrato,
                ct.id_cliente_plan,
                cp.id_cliente,
                CONCAT(c.nombre, ' ', c.apellido) AS cliente,
                p.nombre AS plan,
                ct.fecha_inicio,
                ct.fecha_fin,
                ct.precio,
                ct.estado
            FROM contrato ct
            INNER JOIN cliente_plan cp
                ON ct.id_cliente_plan = cp.id_cliente_plan
            INNER JOIN cliente c
                ON cp.id_cliente = c.id_cliente
            INNER JOIN plan p
                ON cp.id_plan = p.id_plan
            WHERE ct.estado = 'Activo'
            ORDER BY ct.fecha_inicio DESC
        `;

        const [filas] = await db.execute(sql);

        return filas;
    }
}

module.exports = ContratoRepository;

