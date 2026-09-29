const AppFactory = require("./factories/AppFactory");
const Menu = require("./commands/Menu");
const pool = require("./config/database");

async function iniciarAplicacion() {
    try {
        const app = AppFactory.create();
        const menu = new Menu(app);
        await menu.mostrar();
    } catch (error) {
        console.error(`\nError al iniciar la aplicación: ${error.message}`);
        process.exitCode = 1;
    } finally {
        await pool.end();
    }
}

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

iniciarAplicacion();
