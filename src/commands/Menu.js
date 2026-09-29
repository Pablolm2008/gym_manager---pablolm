const inquirer=require("inquirer");
const chalk=require("chalk");
const ClienteMenu=require("./ClienteMenu");
const PlanMenu=require("./PlanMenu");
const ContratoMenu=require("./ContratoMenu");
const ProgresoMenu=require("./ProgresoMenu");
const NutricionMenu=require("./NutricionMenu");
const FinanzasMenu=require("./FinanzasMenu");
const DashboardMenu=require("./DashboardMenu");

class Menu {
    constructor(app){
        this.menus={
            clientes:new ClienteMenu(app.services.clienteService),
            planes:new PlanMenu(app.services.planService),
            contratos:new ContratoMenu(app.services.clientePlanService),
            progreso:new ProgresoMenu(app.services.progresoService),
            nutricion:new NutricionMenu(app.services.nutricionService),
            finanzas:new FinanzasMenu(app.services.finanzasService),
            dashboard:new DashboardMenu(app.services.dashboardService)
        };
    }

    async mostrar(){
        let continuar=true;
        while(continuar){
            console.clear();
            console.log(chalk.bold.cyan("\n╔════════════════════════════════════════════╗"));
            console.log(chalk.bold.cyan("║              GYM MANAGER CLI              ║"));
            console.log(chalk.bold.cyan("╚════════════════════════════════════════════╝"));
            console.log(chalk.gray("   Gestión de gimnasio · Node.js · MySQL\n"));
            const {opcion}=await inquirer.prompt([{type:"list",name:"opcion",message:"Menú principal:",choices:[
                {name:"Dashboard / Métricas",value:"dashboard"},
                {name:"Clientes",value:"clientes"},
                {name:"Planes de entrenamiento",value:"planes"},
                {name:"Asignaciones y contratos",value:"contratos"},
                {name:"Progreso físico",value:"progreso"},
                {name:"Nutrición",value:"nutricion"},
                {name:"Finanzas",value:"finanzas"},
                {name:"Salir",value:"salir"}]}]);
            if(opcion==="salir")continuar=false;
            else await this.menus[opcion].mostrar();
        }
        console.log(chalk.green("\nGracias por utilizar Gym Manager CLI.\n"));
    }
}
module.exports=Menu;
