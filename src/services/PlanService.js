const Plan = require("../models/Plan");

class PlanService {
    constructor(planRepository) { this.planRepository = planRepository; }

    async crear(datos) {
        const plan = new Plan(datos);
        plan.validar();
        return this.planRepository.crear(plan);
    }

    async listar() { return this.planRepository.listarTodos(); }

    async buscarPorId(id_plan) {
        const plan = await this.planRepository.buscarPorId(id_plan);
        if (!plan) throw new Error("El plan no existe.");
        return plan;
    }

    async actualizar(id_plan, datos) {
        await this.buscarPorId(id_plan);
        const plan = new Plan({ id_plan, ...datos });
        plan.validar();
        const affectedRows = await this.planRepository.actualizar(id_plan, plan);
        if (affectedRows === 0) throw new Error("No se pudo actualizar el plan.");
        return { mensaje: "Plan actualizado correctamente." };
    }

    async eliminar(id_plan) {
        await this.buscarPorId(id_plan);
        try {
            const affectedRows = await this.planRepository.eliminar(id_plan);
            if (affectedRows === 0) throw new Error("No se pudo eliminar el plan.");
        } catch (error) {
            if (["ER_ROW_IS_REFERENCED_2", "ER_ROW_IS_REFERENCED"].includes(error.code)) {
                throw new Error("No se puede eliminar el plan porque está siendo utilizado por otros registros.");
            }
            throw error;
        }
        return { mensaje: "Plan eliminado correctamente." };
    }
}

module.exports = PlanService;
