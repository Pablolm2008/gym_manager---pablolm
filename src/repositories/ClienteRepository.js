const pool = require("../config/database");

class ClienteRepository {

    async crear(cliente) {
        const sql = `
            INSERT INTO cliente
            (nombre, apellido, telefono, correo)
            VALUES (?, ?, ?, ?)
        `;

        const [resultado] = await pool.execute(sql, [
            cliente.nombre,
            cliente.apellido,
            cliente.telefono,
            cliente.correo
        ]);

        return resultado.insertId;
    }

    async listarTodos() {
        const sql = `
            SELECT
                id_cliente,
                nombre,
                apellido,
                telefono,
                correo
            FROM cliente
            ORDER BY id_cliente
        `;

        const [filas] = await pool.execute(sql);

        return filas;
    }

    async buscarPorId(id_cliente) {
        const sql = `
            SELECT
                id_cliente,
                nombre,
                apellido,
                telefono,
                correo
            FROM cliente
            WHERE id_cliente = ?
        `;

        const [filas] = await pool.execute(sql, [id_cliente]);

        return filas[0] || null;
    }

    async actualizar(id_cliente, cliente) {
        const sql = `
            UPDATE cliente
            SET
                nombre = ?,
                apellido = ?,
                telefono = ?,
                correo = ?
            WHERE id_cliente = ?
        `;

        const [resultado] = await pool.execute(sql, [
            cliente.nombre,
            cliente.apellido,
            cliente.telefono,
            cliente.correo,
            id_cliente
        ]);

        return resultado.affectedRows;
    }

    async eliminar(id_cliente) {
        const sql = `
            DELETE FROM cliente
            WHERE id_cliente = ?
        `;

        const [resultado] = await pool.execute(sql, [id_cliente]);

        return resultado.affectedRows;
    }
}

module.exports = ClienteRepository;
