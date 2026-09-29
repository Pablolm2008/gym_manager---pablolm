const Progreso = require("../models/Progreso");

class ProgresoService {
    constructor(progresoRepository, clientePlanRepository) {
        this.progresoRepository = progresoRepository;
        this.clientePlanRepository = clientePlanRepository;
    }

    async registrar(datos) {
        const clientePlan = await this.clientePlanRepository.buscarPorId(datos.id_cliente_plan);
        if (!clientePlan) throw new Error("La relación cliente-plan no existe.");
        if (clientePlan.estado !== "Activo") throw new Error("No se puede registrar progreso para un plan que no está activo.");
        const progreso = new Progreso(datos);
        progreso.validar();
        return this.progresoRepository.crear(progreso);
    }

    async listarPorClientePlan(id_cliente_plan) { return this.progresoRepository.listarPorClientePlan(id_cliente_plan); }

    async obtenerUltimo(id_cliente_plan) {
        const progreso = await this.progresoRepository.buscarUltimo(id_cliente_plan);
        if (!progreso) throw new Error("El cliente todavía no tiene registros de progreso.");
        return progreso;
    }

    async eliminar(id_progreso) {
        const eliminado = await this.progresoRepository.eliminar(id_progreso);
        if (!eliminado) throw new Error("El registro de progreso no existe.");
        return { mensaje: "Registro de progreso eliminado correctamente." };
    }
}

module.exports = ProgresoService;
