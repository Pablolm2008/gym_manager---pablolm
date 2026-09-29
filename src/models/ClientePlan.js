const {
    assertPositiveInteger,
    assertDateRange,
    assertOneOf
} = require("../utils/validation");

const ESTADOS = ["Activo", "Cancelado", "Finalizado", "Renovado"];

class ClientePlan {
    constructor({
        id_cliente_plan = null,
        id_cliente,
        id_plan,
        fecha_inicio,
        fecha_fin,
        estado = "Activo"
    }) {
        this.id_cliente_plan = id_cliente_plan;
        this.id_cliente = id_cliente;
        this.id_plan = id_plan;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.estado = estado;
    }

    validar() {
        if (this.id_cliente_plan !== null) {
            assertPositiveInteger(this.id_cliente_plan, "El ID de cliente-plan");
        }

        assertPositiveInteger(this.id_cliente, "El ID del cliente");
        assertPositiveInteger(this.id_plan, "El ID del plan");
        assertDateRange(this.fecha_inicio, this.fecha_fin, "La fecha de inicio", "La fecha de fin");
        assertOneOf(this.estado, ESTADOS, "El estado");

        return true;
    }
}

module.exports = ClientePlan;
