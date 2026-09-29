function assertPositiveInteger(value, field) {
    if (!Number.isInteger(value) || value <= 0) {
        throw new Error(`${field} debe ser un entero mayor que 0.`);
    }
}

function assertPositiveNumber(value, field) {
    if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
        throw new Error(`${field} debe ser un número mayor que 0.`);
    }
}

function assertNonNegativeNumber(value, field) {
    if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
        throw new Error(`${field} debe ser un número mayor o igual que 0.`);
    }
}

function assertNonEmptyString(value, field, minLength = 1) {
    if (typeof value !== "string" || value.trim().length < minLength) {
        throw new Error(`${field} es obligatorio y debe tener al menos ${minLength} caracteres.`);
    }
}

function assertValidDate(value, field) {
    if (!value || Number.isNaN(new Date(value).getTime())) {
        throw new Error(`${field} no es una fecha válida.`);
    }
}

function assertDateRange(start, end, startField = "La fecha de inicio", endField = "La fecha de fin") {
    assertValidDate(start, startField);
    assertValidDate(end, endField);

    if (new Date(end) <= new Date(start)) {
        throw new Error(`${endField} debe ser posterior a ${startField.toLowerCase()}.`);
    }
}

function assertOneOf(value, allowed, field) {
    if (!allowed.includes(value)) {
        throw new Error(`${field} no es válido. Valores permitidos: ${allowed.join(", ")}.`);
    }
}

module.exports = {
    assertPositiveInteger,
    assertPositiveNumber,
    assertNonNegativeNumber,
    assertNonEmptyString,
    assertValidDate,
    assertDateRange,
    assertOneOf
};
