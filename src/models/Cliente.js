const {
    assertNonEmptyString,
    assertPositiveInteger
} = require("../utils/validation");

class Cliente {
    constructor({ id_cliente = null, nombre, apellido, telefono, correo }) {
        this.id_cliente = id_cliente;
        this.nombre = nombre?.trim();
        this.apellido = apellido?.trim();
        this.telefono = telefono?.trim();
        this.correo = correo?.trim().toLowerCase();
    }

    validar() {
        if (this.id_cliente !== null) {
            assertPositiveInteger(this.id_cliente, "El ID del cliente");
        }

        assertNonEmptyString(this.nombre, "El nombre", 2);
        assertNonEmptyString(this.apellido, "El apellido", 2);
        assertNonEmptyString(this.telefono, "El teléfono", 7);
        assertNonEmptyString(this.correo, "El correo", 5);

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.correo)) {
            throw new Error("El correo electrónico no es válido.");
        }

        return true;
    }
}

module.exports = Cliente;
