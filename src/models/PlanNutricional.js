const {
    assertPositiveInteger,
    assertNonEmptyString,
    assertDateRange
} = require("../utils/validation");

class PlanNutricional {
    constructor({
        id_plan_nutricional = null,
        id_cliente,
        id_cliente_plan,
        nombre,
        fecha_inicio,
        fecha_fin
    }) {
        this.id_plan_nutricional = id_plan_nutricional;
        this.id_cliente = id_cliente;
        this.id_cliente_plan = id_cliente_plan;
        this.nombre = nombre?.trim();
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
    }

    validar() {
        if (this.id_plan_nutricional !== null) {
            assertPositiveInteger(this.id_plan_nutricional, "El ID del plan nutricional");
        }

        assertPositiveInteger(this.id_cliente, "El ID del cliente");
        assertPositiveInteger(this.id_cliente_plan, "El ID de cliente-plan");
        assertNonEmptyString(this.nombre, "El nombre del plan nutricional", 2);
        assertDateRange(this.fecha_inicio, this.fecha_fin);

        return true;
    }
}

module.exports = PlanNutricional;
