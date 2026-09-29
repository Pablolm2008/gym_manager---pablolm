const {
    assertPositiveInteger,
    assertPositiveNumber,
    assertNonNegativeNumber,
    assertOneOf
} = require("../utils/validation");

const DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

class PlanNutricionalAlimento {
    constructor({
        id_plan_nutricional_alimento = null,
        id_plan_nutricional,
        id_alimento,
        dia,
        cantidad,
        calorias
    }) {
        this.id_plan_nutricional_alimento = id_plan_nutricional_alimento;
        this.id_plan_nutricional = id_plan_nutricional;
        this.id_alimento = id_alimento;
        this.dia = dia;
        this.cantidad = cantidad;
        this.calorias = calorias;
    }

    validar() {
        if (this.id_plan_nutricional_alimento !== null) {
            assertPositiveInteger(this.id_plan_nutricional_alimento, "El ID de la relación nutricional");
        }

        assertPositiveInteger(this.id_plan_nutricional, "El ID del plan nutricional");
        assertPositiveInteger(this.id_alimento, "El ID del alimento");
        assertOneOf(this.dia, DIAS, "El día");
        assertPositiveNumber(this.cantidad, "La cantidad");
        assertNonNegativeNumber(this.calorias, "Las calorías");

        return true;
    }
}

module.exports = PlanNutricionalAlimento;
