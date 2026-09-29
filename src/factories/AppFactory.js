const ClienteRepository = require("../repositories/ClienteRepository");
const PlanRepository = require("../repositories/PlanRepository");
const ClientePlanRepository = require("../repositories/ClientePlanRepository");
const ContratoRepository = require("../repositories/ContratoRepository");
const ProgresoRepository = require("../repositories/ProgresoRepository");
const PlanNutricionalRepository = require("../repositories/PlanNutricionalRepository");
const AlimentoRepository = require("../repositories/AlimentoRepository");
const PagoRepository = require("../repositories/PagoRepository");
const IngresoRepository = require("../repositories/IngresoRepository");
const EgresoRepository = require("../repositories/EgresoRepository");
const DashboardRepository = require("../repositories/DashboardRepository");

const ClienteService = require("../services/ClienteService");
const PlanService = require("../services/PlanService");
const ClientePlanService = require("../services/ClientePlanService");
const ProgresoService = require("../services/ProgresoService");
const NutricionService = require("../services/NutricionService");
const FinanzasService = require("../services/FinanzasService");
const DashboardService = require("../services/DashboardService");

class AppFactory {

    static create() {

        // =====================================================
        // REPOSITORIES
        // =====================================================

        const clienteRepository =
            new ClienteRepository();

        const planRepository =
            new PlanRepository();

        const clientePlanRepository =
            new ClientePlanRepository();

        const contratoRepository =
            new ContratoRepository();

        const progresoRepository =
            new ProgresoRepository();

        const planNutricionalRepository =
            new PlanNutricionalRepository();

        const alimentoRepository =
            new AlimentoRepository();

        const pagoRepository =
            new PagoRepository();

        const ingresoRepository =
            new IngresoRepository();

        const egresoRepository =
            new EgresoRepository();

        const dashboardRepository = new DashboardRepository();


        // =====================================================
        // SERVICES
        // =====================================================

        const clienteService =
            new ClienteService(
                clienteRepository
            );

        const planService =
            new PlanService(
                planRepository
            );

        const clientePlanService =
            new ClientePlanService(
                clienteRepository,
                planRepository,
                clientePlanRepository,
                contratoRepository
            );

        const progresoService =
            new ProgresoService(
                progresoRepository,
                clientePlanRepository
            );

        const nutricionService =
            new NutricionService(
                planNutricionalRepository,
                alimentoRepository,
                clientePlanRepository
            );

        const finanzasService =
            new FinanzasService(
                pagoRepository,
                ingresoRepository,
                egresoRepository,
                contratoRepository
            );

        const dashboardService = new DashboardService(dashboardRepository);


        // =====================================================
        // RETURN
        // =====================================================

        return {

            repositories: {
                clienteRepository,
                planRepository,
                clientePlanRepository,
                contratoRepository,
                progresoRepository,
                planNutricionalRepository,
                alimentoRepository,
                pagoRepository,
                ingresoRepository,
                egresoRepository,
                dashboardRepository
            },

            services: {
                clienteService,
                planService,
                clientePlanService,
                progresoService,
                nutricionService,
                finanzasService,
                dashboardService
            }
        };
    }
}

module.exports = AppFactory;
