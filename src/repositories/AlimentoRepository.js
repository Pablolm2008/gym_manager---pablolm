const pool = require("../config/database");

class AlimentoRepository {

    async crear(alimento) {
        const sql = `
            INSERT INTO alimento
            (nombre, calorias_estimadas)
            VALUES (?, ?)
        `;

        const [resultado] = await pool.execute(sql, [
            alimento.nombre,
            alimento.calorias_estimadas
        ]);

        return resultado.insertId;
    }

    async listarTodos() {
        const sql = `
            SELECT
                id_alimento,
                nombre,
                calorias_estimadas
            FROM alimento
            ORDER BY nombre
        `;

        const [filas] = await pool.execute(sql);

        return filas;
    }

    async buscarPorId(id_alimento) {
        const sql = `
            SELECT
                id_alimento,
                nombre,
                calorias_estimadas
            FROM alimento
            WHERE id_alimento = ?
        `;

        const [filas] = await pool.execute(sql, [
            id_alimento
        ]);

        return filas[0] || null;
    }
}

module.exports = AlimentoRepository;

