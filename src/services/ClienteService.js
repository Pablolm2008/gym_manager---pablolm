const Cliente = require("../models/Cliente");

class ClienteService {
    constructor(clienteRepository) { this.clienteRepository = clienteRepository; }

    async crear(datos) {
        const cliente = new Cliente(datos);
        cliente.validar();
        if (cliente.id_cliente !== null && await this.clienteRepository.buscarPorId(cliente.id_cliente)) {
            throw new Error("El cliente ya existe.");
        }
        return this.clienteRepository.crear(cliente);
    }

    async listar() { return this.clienteRepository.listarTodos(); }

    async buscarPorId(id_cliente) {
        const cliente = await this.clienteRepository.buscarPorId(id_cliente);
        if (!cliente) throw new Error("El cliente no existe.");
        return cliente;
    }

    async actualizar(id_cliente, datos) {
        await this.buscarPorId(id_cliente);
        const cliente = new Cliente({ id_cliente, ...datos });
        cliente.validar();
        const affectedRows = await this.clienteRepository.actualizar(id_cliente, cliente);
        if (affectedRows === 0) throw new Error("No se pudo actualizar el cliente.");
        return { mensaje: "Cliente actualizado correctamente." };
    }

    async eliminar(id_cliente) {
        await this.buscarPorId(id_cliente);
        try {
            const affectedRows = await this.clienteRepository.eliminar(id_cliente);
            if (affectedRows === 0) throw new Error("No se pudo eliminar el cliente.");
        } catch (error) {
            if (["ER_ROW_IS_REFERENCED_2", "ER_ROW_IS_REFERENCED"].includes(error.code)) {
                throw new Error("No se puede eliminar el cliente porque tiene registros relacionados.");
            }
            throw error;
        }
        return { mensaje: "Cliente eliminado correctamente." };
    }
}

module.exports = ClienteService;
