const {
    assertPositiveInteger,
    assertPositiveNumber,
    assertValidDate,
    assertOneOf
} = require("../utils/validation");

const METODOS_PAGO = ["Efectivo", "Transferencia", "Tarjeta"];

class Pago {
    constructor({ id_pago = null, id_contrato, monto, fecha, metodo_pago }) {
        this.id_pago = id_pago;
        this.id_contrato = id_contrato;
        this.monto = monto;
        this.fecha = fecha;
        this.metodo_pago = metodo_pago;
    }

    validar() {
        if (this.id_pago !== null) assertPositiveInteger(this.id_pago, "El ID del pago");
        assertPositiveInteger(this.id_contrato, "El ID del contrato");
        assertPositiveNumber(this.monto, "El monto");
        assertValidDate(this.fecha, "La fecha del pago");
        assertOneOf(this.metodo_pago, METODOS_PAGO, "El método de pago");
        return true;
    }
}

module.exports = Pago;
