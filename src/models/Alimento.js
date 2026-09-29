const {
    assertPositiveInteger,
    assertNonEmptyString,
    assertNonNegativeNumber
} = require("../utils/validation");

class Alimento {
    constructor({ id_alimento = null, nombre, calorias_estimadas }) {
        this.id_alimento = id_alimento;
        this.nombre = nombre?.trim();
        this.calorias_estimadas = calorias_estimadas;
    }

    validar() {
        if (this.id_alimento !== null) {
            assertPositiveInteger(this.id_alimento, "El ID del alimento");
        }

        assertNonEmptyString(this.nombre, "El nombre del alimento", 2);
        assertNonNegativeNumber(this.calorias_estimadas, "Las calorías estimadas");

        return true;
    }
}

module.exports = Alimento;
