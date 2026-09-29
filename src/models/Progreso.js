const {
    assertPositiveInteger,
    assertPositiveNumber,
    assertNonNegativeNumber,
    assertValidDate
} = require("../utils/validation");

class Progreso {
    constructor({
        id_progreso = null,
        id_cliente_plan,
        fecha,
        peso,
        grasa_corporal = null,
        cintura = null,
        brazo = null,
        pecho = null,
        pierna = null,
        foto = null,
        comentarios = null
    }) {
        this.id_progreso = id_progreso;
        this.id_cliente_plan = id_cliente_plan;
        this.fecha = fecha;
        this.peso = peso;
        this.grasa_corporal = grasa_corporal;
        this.cintura = cintura;
        this.brazo = brazo;
        this.pecho = pecho;
        this.pierna = pierna;
        this.foto = foto;
        this.comentarios = comentarios;
    }

    validar() {
        if (this.id_progreso !== null) {
            assertPositiveInteger(this.id_progreso, "El ID del progreso");
        }

        assertPositiveInteger(this.id_cliente_plan, "El ID de cliente-plan");
        assertValidDate(this.fecha, "La fecha");
        assertPositiveNumber(this.peso, "El peso");

        const medidas = {
            grasa_corporal: this.grasa_corporal,
            cintura: this.cintura,
            brazo: this.brazo,
            pecho: this.pecho,
            pierna: this.pierna
        };

        for (const [nombre, valor] of Object.entries(medidas)) {
            if (valor !== null && valor !== undefined) {
                assertNonNegativeNumber(valor, `El valor de ${nombre}`);
            }
        }

        return true;
    }
}

module.exports = Progreso;
