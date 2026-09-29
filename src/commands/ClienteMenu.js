const inquirer = require("inquirer");
const chalk = require("chalk");
const BaseMenu = require("./BaseMenu");

class ClienteMenu extends BaseMenu {
    constructor(service) { super(); this.service = service; }

    async mostrar() {
        let continuar = true;
        while (continuar) {
            console.clear(); console.log(chalk.bold.cyan("\n=== CLIENTES ===\n"));
            const {opcion} = await inquirer.prompt([{type:"list",name:"opcion",message:"¿Qué deseas hacer?",choices:[
                {name:"Registrar cliente",value:"registrar"},{name:"Listar clientes",value:"listar"},
                {name:"Buscar cliente",value:"buscar"},{name:"Actualizar cliente",value:"actualizar"},
                {name:"Eliminar cliente",value:"eliminar"},{name:"Regresar",value:"regresar"}]}]);
            if (opcion==="regresar") continuar=false;
            else if (opcion==="registrar") await this.registrar();
            else if (opcion==="listar") await this.listar();
            else if (opcion==="buscar") await this.buscar();
            else if (opcion==="actualizar") await this.actualizar();
            else await this.eliminar();
        }
    }

    async registrar() {
        const datos=await inquirer.prompt([
            {type:"input",name:"nombre",message:"Nombre:",validate:v=>v.trim().length>=2||"Mínimo 2 caracteres."},
            {type:"input",name:"apellido",message:"Apellido:",validate:v=>v.trim().length>=2||"Mínimo 2 caracteres."},
            {type:"input",name:"telefono",message:"Teléfono:",validate:v=>v.trim().length>=7||"Mínimo 7 caracteres."},
            {type:"input",name:"correo",message:"Correo:",validate:v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())||"Correo no válido."}
        ]);
        await this.ejecutar("Registrar cliente",async()=>`Cliente registrado. ID: ${await this.service.crear(datos)}`);
    }
    async listar() {
        await this.ejecutar("Lista de clientes",async()=>{
            const rows=await this.service.listar(); if(!rows.length)return "No hay clientes registrados.";
            rows.forEach(c=>console.log(`#${c.id_cliente} | ${c.nombre} ${c.apellido} | ${c.telefono} | ${c.correo}`));
            return `\nTotal: ${rows.length} cliente(s).`;
        });
    }
    async buscar() {
        const {id}=await this.id("ID del cliente:");
        await this.ejecutar("Buscar cliente",async()=>{
            const c=await this.service.buscarPorId(id);
            console.table([c]); return "";
        });
    }
    async actualizar() {
        const {id}=await this.id("ID del cliente:");
        const actual=await this.service.buscarPorId(id).catch(()=>null);
        if(!actual)return this.ejecutar("Actualizar cliente",()=>{throw new Error("El cliente no existe.");});
        const datos=await inquirer.prompt([
            {type:"input",name:"nombre",message:"Nombre:",default:actual.nombre},
            {type:"input",name:"apellido",message:"Apellido:",default:actual.apellido},
            {type:"input",name:"telefono",message:"Teléfono:",default:actual.telefono},
            {type:"input",name:"correo",message:"Correo:",default:actual.correo}
        ]);
        await this.ejecutar("Actualizar cliente",()=>this.service.actualizar(id,datos));
    }
    async eliminar() {
        const {id}=await this.id("ID del cliente:");
        const {ok}=await inquirer.prompt([{type:"confirm",name:"ok",message:"¿Confirmas eliminar el cliente?",default:false}]);
        if(ok)await this.ejecutar("Eliminar cliente",()=>this.service.eliminar(id));
    }
}
module.exports=ClienteMenu;
