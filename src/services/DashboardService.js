class DashboardService {
    constructor(repository) { this.repository = repository; }

    async obtenerResumen() {
        const [metricas, ingresosMes, egresosMes, planesMasUsados] = await Promise.all([
            this.repository.metricas(),
            this.repository.ingresosMes(),
            this.repository.egresosMes(),
            this.repository.planesMasUsados()
        ]);
        return {
            ...metricas,
            ingresos_mes: ingresosMes,
            egresos_mes: egresosMes,
            balance_mes: ingresosMes - egresosMes,
            planes_mas_usados: planesMasUsados
        };
    }
}
module.exports = DashboardService;
