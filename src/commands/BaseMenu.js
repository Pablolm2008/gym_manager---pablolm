const inquirer = require("inquirer");
const chalk = require("chalk");

class BaseMenu {
    async ejecutar(titulo, operacion) {
        console.clear();
        console.log(chalk.bold.cyan(`\n=== ${titulo.toUpperCase()} ===\n`));
        try {
            const resultado = await operacion();
            if (typeof resultado === "string" && resultado) console.log(chalk.green(`\n${resultado}`));
            else if (resultado?.mensaje) console.log(chalk.green(`\n${resultado.mensaje}`));
        } catch (error) {
            console.log(chalk.red(`\nError: ${error.message}`));
        }
        await this.pausa();
    }

    async pausa() {
        await inquirer.prompt([{ type:"input", name:"continuar", message:"Presiona ENTER para continuar..." }]);
    }

    async id(message) {
        return inquirer.prompt([{
            type:"input", name:"id", message, filter:Number,
            validate:v => Number.isInteger(v) && v > 0 || "Ingresa un ID entero mayor que 0."
        }]);
    }

    async numero(name,message,{min=0,positive=false}={}) {
        return {
            type:"input", name, message, filter:Number,
            validate:v => Number.isFinite(v) && (positive ? v > 0 : v >= min) || "Ingresa un número válido."
        };
    }

    async fecha(name,message) {
        return {
            type:"input", name, message, default:new Date().toISOString().slice(0,10),
            validate:v => /^\d{4}-\d{2}-\d{2}$/.test(v) || "Usa AAAA-MM-DD."
        };
    }
}
module.exports = BaseMenu;
