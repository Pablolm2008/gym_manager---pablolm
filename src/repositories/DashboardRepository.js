const pool = require("../config/database");

class DashboardRepository {
    async metricas() {
        const sql = `
            SELECT
              (SELECT COUNT(*) FROM cliente) AS total_clientes,
              (SELECT COUNT(*) FROM cliente_plan WHERE estado = 'Activo') AS clientes_activos,
              (SELECT COUNT(*) FROM plan) AS total_planes,
              (SELECT COUNT(*) FROM contrato WHERE estado = 'Activo') AS contratos_activos,
              (SELECT COUNT(*) FROM progreso) AS registros_progreso,
              (SELECT COUNT(*) FROM plan_nutricional) AS planes_nutricionales,
              (SELECT COUNT(*) FROM pago) AS total_pagos,
              (SELECT COALESCE(SUM(monto),0) FROM ingreso) AS total_ingresos,
              (SELECT COALESCE(SUM(monto),0) FROM egreso) AS total_egresos,
              (SELECT COALESCE(SUM(monto),0) FROM ingreso) -
              (SELECT COALESCE(SUM(monto),0) FROM egreso) AS balance`;
        const [filas] = await pool.execute(sql);
        return filas[0];
    }

    async ingresosMes(fecha = new Date()) {
        const sql = `
            SELECT COALESCE(SUM(monto),0) AS total
            FROM ingreso
            WHERE YEAR(fecha)=YEAR(?) AND MONTH(fecha)=MONTH(?)`;
        const [filas] = await pool.execute(sql, [fecha, fecha]);
        return Number(filas[0].total);
    }

    async egresosMes(fecha = new Date()) {
        const sql = `
            SELECT COALESCE(SUM(monto),0) AS total
            FROM egreso
            WHERE YEAR(fecha)=YEAR(?) AND MONTH(fecha)=MONTH(?)`;
        const [filas] = await pool.execute(sql, [fecha, fecha]);
        return Number(filas[0].total);
    }

    async planesMasUsados() {
        const sql = `
            SELECT p.nombre AS plan, COUNT(*) AS asignaciones
            FROM cliente_plan cp
            INNER JOIN plan p ON cp.id_plan=p.id_plan
            GROUP BY p.id_plan,p.nombre
            ORDER BY asignaciones DESC, p.nombre`;
        const [filas] = await pool.execute(sql);
        return filas;
    }
}
module.exports = DashboardRepository;
