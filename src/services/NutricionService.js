const PlanNutricional = require("../models/PlanNutricional");
const Alimento = require("../models/Alimento");
const PlanNutricionalAlimento = require("../models/PlanNutricionalAlimento");

class NutricionService {
    constructor(planNutricionalRepository, alimentoRepository, clientePlanRepository) {
        this.planNutricionalRepository = planNutricionalRepository;
        this.alimentoRepository = alimentoRepository;
        this.clientePlanRepository = clientePlanRepository;
    }

    async crearPlan(datos) {
        const clientePlan = await this.clientePlanRepository.buscarPorId(datos.id_cliente_plan);
        if (!clientePlan) throw new Error("La relación cliente-plan no existe.");
        if (clientePlan.estado !== "Activo") throw new Error("No se puede crear un plan nutricional para un plan que no está activo.");

        const plan = new PlanNutricional({ ...datos, id_cliente: clientePlan.id_cliente });
        plan.validar();
        return this.planNutricionalRepository.crear(plan);
    }

    async buscarPorId(id_plan_nutricional) {
        const plan = await this.planNutricionalRepository.buscarPorId(id_plan_nutricional);
        if (!plan) throw new Error("El plan nutricional no existe.");
        return plan;
    }

    async listarPorCliente(id_cliente) { return this.planNutricionalRepository.listarPorCliente(id_cliente); }

    async crearAlimento(datos) {
        const alimento = new Alimento(datos);
        alimento.validar();
        return this.alimentoRepository.crear(alimento);
    }

    async listarAlimentos() { return this.alimentoRepository.listarTodos(); }

    async agregarAlimento(datos) {
        await this.buscarPorId(datos.id_plan_nutricional);
        if (!await this.alimentoRepository.buscarPorId(datos.id_alimento)) throw new Error("El alimento no existe.");
        const relacion = new PlanNutricionalAlimento(datos);
        relacion.validar();
        return this.planNutricionalRepository.agregarAlimento(relacion);
    }

    async listarAlimentosDelPlan(id_plan_nutricional) {
        await this.buscarPorId(id_plan_nutricional);
        return this.planNutricionalRepository.listarAlimentos(id_plan_nutricional);
    }

    async reporteSemanal(id_plan_nutricional) {
        await this.buscarPorId(id_plan_nutricional);
        return this.planNutricionalRepository.reporteSemanal(id_plan_nutricional);
    }
}

module.exports = NutricionService;
