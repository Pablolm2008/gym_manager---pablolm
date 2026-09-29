const {
    assertPositiveInteger,
    assertPositiveNumber,
    assertNonEmptyString,
    assertValidDate
} = require("../utils/validation");

class Ingreso {
    constructor({ id_ingreso = null, id_pago, concepto, monto, fecha }) {
        this.id_ingreso = id_ingreso;
        this.id_pago = id_pago;
        this.concepto = concepto?.trim();
        this.monto = monto;
        this.fecha = fecha;
    }

    validar() {
        if (this.id_ingreso !== null) {
            assertPositiveInteger(this.id_ingreso, "El ID del ingreso");
        }

        assertPositiveInteger(this.id_pago, "El ID del pago");
        assertNonEmptyString(this.concepto, "El concepto", 2);
        assertPositiveNumber(this.monto, "El monto");
        assertValidDate(this.fecha, "La fecha del ingreso");

        return true;
    }
}

module.exports = Ingreso;
