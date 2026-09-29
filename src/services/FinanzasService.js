const Pago = require("../models/Pago");
const Ingreso = require("../models/Ingreso");
const Egreso = require("../models/Egreso");
const { withTransaction } = require("../utils/transaction");

class FinanzasService {
    constructor(pagoRepository, ingresoRepository, egresoRepository, contratoRepository) {
        this.pagoRepository = pagoRepository;
        this.ingresoRepository = ingresoRepository;
        this.egresoRepository = egresoRepository;
        this.contratoRepository = contratoRepository;
    }

    async registrarPago(datos) {
        const contrato = await this.contratoRepository.buscarPorId(datos.id_contrato);
        if (!contrato) throw new Error("El contrato no existe.");
        if (contrato.estado !== "Activo") throw new Error("No se puede registrar un pago para un contrato que no está activo.");

        const pago = new Pago(datos);
        pago.validar();

        try {
            return await withTransaction(async (connection) => {
                const id_pago = await this.pagoRepository.crear(pago, connection);
                const ingreso = new Ingreso({
                    id_pago,
                    concepto: datos.concepto || `Pago del contrato #${datos.id_contrato}`,
                    monto: datos.monto,
                    fecha: datos.fecha
                });
                ingreso.validar();
                const id_ingreso = await this.ingresoRepository.crear(ingreso, connection);
                return { id_pago, id_ingreso, mensaje: "Pago e ingreso registrados correctamente." };
            });
        } catch (error) {
            throw new Error(`No fue posible registrar el pago: ${error.message}`);
        }
    }

    async registrarEgreso(datos) {
        const egreso = new Egreso(datos);
        egreso.validar();
        return this.egresoRepository.crear(egreso);
    }

    async listarPagos() { return this.pagoRepository.listarTodos(); }
    async listarIngresos() { return this.ingresoRepository.listarTodos(); }
    async listarEgresos() { return this.egresoRepository.listarTodos(); }

    async obtenerBalance() {
        const [totalIngresos, totalEgresos] = await Promise.all([
            this.ingresoRepository.total(), this.egresoRepository.total()
        ]);
        return {
            total_ingresos: Number(totalIngresos),
            total_egresos: Number(totalEgresos),
            balance: Number(totalIngresos) - Number(totalEgresos)
        };
    }

    async obtenerEgresosPorCategoria() { return this.egresoRepository.totalPorCategoria(); }
}
module.exports = FinanzasService;
