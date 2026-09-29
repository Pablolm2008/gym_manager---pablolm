const {
    assertPositiveInteger,
    assertPositiveNumber,
    assertNonEmptyString,
    assertValidDate
} = require("../utils/validation");

class Egreso {
    constructor({ id_egreso = null, concepto, categoria, monto, fecha }) {
        this.id_egreso = id_egreso;
        this.concepto = concepto?.trim();
        this.categoria = categoria?.trim();
        this.monto = monto;
        this.fecha = fecha;
    }

    validar() {
        if (this.id_egreso !== null) {
            assertPositiveInteger(this.id_egreso, "El ID del egreso");
        }

        assertNonEmptyString(this.concepto, "El concepto", 2);
        assertNonEmptyString(this.categoria, "La categoría", 2);
        assertPositiveNumber(this.monto, "El monto");
        assertValidDate(this.fecha, "La fecha del egreso");

        return true;
    }
}

module.exports = Egreso;
