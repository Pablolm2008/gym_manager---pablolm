const {
    assertNonEmptyString,
    assertPositiveInteger,
    assertNonNegativeNumber,
    assertOneOf
} = require("../utils/validation");

const NIVELES = ["Principiante", "Intermedio", "Avanzado"];

class Plan {
    constructor({ id_plan = null, nombre, duracion, meta_fisica, nivel, precio }) {
        this.id_plan = id_plan;
        this.nombre = nombre?.trim();
        this.duracion = duracion;
        this.meta_fisica = meta_fisica?.trim();
        this.nivel = nivel;
        this.precio = precio;
    }

    validar() {
        if (this.id_plan !== null) {
            assertPositiveInteger(this.id_plan, "El ID del plan");
        }

        assertNonEmptyString(this.nombre, "El nombre del plan", 2);
        assertPositiveInteger(this.duracion, "La duración");
        assertNonEmptyString(this.meta_fisica, "La meta física", 2);
        assertOneOf(this.nivel, NIVELES, "El nivel del plan");
        assertNonNegativeNumber(this.precio, "El precio");

        return true;
    }
}

module.exports = Plan;
