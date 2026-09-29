const test = require("node:test");
const assert = require("node:assert/strict");

const Cliente = require("../src/models/Cliente");
const Plan = require("../src/models/Plan");
const ClientePlan = require("../src/models/ClientePlan");
const Pago = require("../src/models/Pago");
const PlanNutricionalAlimento = require("../src/models/PlanNutricionalAlimento");

test("Cliente acepta datos válidos", () => {
    const cliente = new Cliente({
        nombre: "Pablo",
        apellido: "López",
        telefono: "55555555",
        correo: "pablo@example.com"
    });
    assert.equal(cliente.validar(), true);
    assert.equal(cliente.correo, "pablo@example.com");
});

test("Cliente rechaza correo inválido", () => {
    const cliente = new Cliente({
        nombre: "Pablo",
        apellido: "López",
        telefono: "55555555",
        correo: "correo-invalido"
    });
    assert.throws(() => cliente.validar(), /correo/i);
});

test("Plan rechaza nivel inválido", () => {
    const plan = new Plan({
        nombre: "Plan",
        duracion: 30,
        meta_fisica: "Fuerza",
        nivel: "Experto",
        precio: 100
    });
    assert.throws(() => plan.validar(), /nivel/i);
});

test("ClientePlan rechaza fecha final anterior o igual", () => {
    const clientePlan = new ClientePlan({
        id_cliente: 1,
        id_plan: 1,
        fecha_inicio: "2026-10-10",
        fecha_fin: "2026-10-10"
    });
    assert.throws(() => clientePlan.validar(), /posterior/i);
});

test("Pago valida método de pago", () => {
    const pago = new Pago({
        id_contrato: 1,
        monto: 100,
        fecha: "2026-09-29",
        metodo_pago: "Bitcoin"
    });
    assert.throws(() => pago.validar(), /método/i);
});

test("Relación nutricional acepta un día válido", () => {
    const relacion = new PlanNutricionalAlimento({
        id_plan_nutricional: 1,
        id_alimento: 1,
        dia: "Lunes",
        cantidad: 1,
        calorias: 300
    });
    assert.equal(relacion.validar(), true);
});

test("NutricionService envía la relación completa al repositorio", async () => {
    const NutricionService = require("../src/services/NutricionService");
    let recibido;
    const service = new NutricionService(
        {
            buscarPorId: async () => ({ id_plan_nutricional: 10 }),
            agregarAlimento: async (relacion) => {
                recibido = relacion;
                return 99;
            }
        },
        { buscarPorId: async () => ({ id_alimento: 5 }) },
        {}
    );

    const id = await service.agregarAlimento({
        id_plan_nutricional: 10,
        id_alimento: 5,
        dia: "Lunes",
        cantidad: 2,
        calorias: 450
    });

    assert.equal(id, 99);
    assert.equal(recibido.id_plan_nutricional, 10);
    assert.equal(recibido.id_alimento, 5);
    assert.equal(recibido.cantidad, 2);
});

test("NutricionService usa el cliente asociado al contrato cliente-plan", async () => {
    const NutricionService = require("../src/services/NutricionService");
    let creado;
    const service = new NutricionService(
        { crear: async (plan) => { creado = plan; return 7; } },
        {},
        { buscarPorId: async () => ({ id_cliente: 42, estado: "Activo" }) }
    );

    const id = await service.crearPlan({
        id_cliente: 999,
        id_cliente_plan: 3,
        nombre: "Plan semanal",
        fecha_inicio: "2026-09-29",
        fecha_fin: "2026-10-29"
    });

    assert.equal(id, 7);
    assert.equal(creado.id_cliente, 42);
});
