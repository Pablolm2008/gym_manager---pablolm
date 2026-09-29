const {
    assertPositiveInteger,
    assertNonEmptyString,
    assertDateRange,
    assertNonNegativeNumber,
    assertOneOf
} = require("../utils/validation");

const ESTADOS = ["Activo", "Cancelado", "Finalizado"];

class Contrato {
    constructor({
        id_contrato = null,
        id_cliente_plan,
        condiciones,
        fecha_inicio,
        fecha_fin,
        precio,
        estado = "Activo"
    }) {
        this.id_contrato = id_contrato;
        this.id_cliente_plan = id_cliente_plan;
        this.condiciones = condiciones?.trim();
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.precio = precio;
        this.estado = estado;
    }

    validar() {
        if (this.id_contrato !== null) {
            assertPositiveInteger(this.id_contrato, "El ID del contrato");
        }

        assertPositiveInteger(this.id_cliente_plan, "El ID de cliente-plan");
        assertNonEmptyString(this.condiciones, "Las condiciones del contrato", 5);
        assertDateRange(this.fecha_inicio, this.fecha_fin, "La fecha de inicio", "La fecha de fin");
        assertNonNegativeNumber(this.precio, "El precio del contrato");
        assertOneOf(this.estado, ESTADOS, "El estado del contrato");

        return true;
    }
}

module.exports = Contrato;
