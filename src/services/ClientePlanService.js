const ClientePlan = require("../models/ClientePlan");
const Contrato = require("../models/Contrato");
const { withTransaction } = require("../utils/transaction");

class ClientePlanService {
    constructor(clienteRepository, planRepository, clientePlanRepository, contratoRepository) {
        this.clienteRepository = clienteRepository;
        this.planRepository = planRepository;
        this.clientePlanRepository = clientePlanRepository;
        this.contratoRepository = contratoRepository;
    }

    async asignarPlan({ id_cliente, id_plan, fecha_inicio, fecha_fin, condiciones }) {
        if (!await this.clienteRepository.buscarPorId(id_cliente)) throw new Error("El cliente no existe.");
        const plan = await this.planRepository.buscarPorId(id_plan);
        if (!plan) throw new Error("El plan no existe.");

        const clientePlan = new ClientePlan({ id_cliente, id_plan, fecha_inicio, fecha_fin, estado: "Activo" });
        clientePlan.validar();
        new Contrato({ id_cliente_plan: 1, condiciones, fecha_inicio, fecha_fin,
            precio: Number(plan.precio), estado: "Activo" }).validar();

        try {
            return await withTransaction(async (connection) => {
                const id_cliente_plan = await this.clientePlanRepository.crear(clientePlan, connection);
                const contrato = new Contrato({
                    id_cliente_plan, condiciones, fecha_inicio, fecha_fin,
                    precio: Number(plan.precio), estado: "Activo"
                });
                contrato.validar();
                const id_contrato = await this.contratoRepository.crear(contrato, connection);
                return { id_cliente_plan, id_contrato, mensaje: "Plan asignado y contrato generado correctamente." };
            });
        } catch (error) {
            throw new Error(`No fue posible asignar el plan: ${error.message}`);
        }
    }

    async listarAsignaciones() { return this.clientePlanRepository.listarTodos(); }

    async listarContratos() { return this.contratoRepository.listarTodos(); }

    async cambiarEstadoClientePlan(id_cliente_plan, estado) {
        const actual = await this.clientePlanRepository.buscarPorId(id_cliente_plan);
        if (!actual) throw new Error("La asignación no existe.");
        const estados = ["Activo","Cancelado","Finalizado","Renovado"];
        if (!estados.includes(estado)) throw new Error("Estado de asignación no válido.");
        const ok = await this.clientePlanRepository.actualizarEstado(id_cliente_plan, estado);
        if (!ok) throw new Error("No se pudo actualizar la asignación.");
        return { mensaje: "Estado de la asignación actualizado correctamente." };
    }

    async cambiarEstadoContrato(id_contrato, estado) {
        const actual = await this.contratoRepository.buscarPorId(id_contrato);
        if (!actual) throw new Error("El contrato no existe.");
        const estados = ["Activo","Cancelado","Finalizado"];
        if (!estados.includes(estado)) throw new Error("Estado de contrato no válido.");
        const ok = await this.contratoRepository.actualizarEstado(id_contrato, estado);
        if (!ok) throw new Error("No se pudo actualizar el contrato.");
        return { mensaje: "Estado del contrato actualizado correctamente." };
    }
}
module.exports = ClientePlanService;
