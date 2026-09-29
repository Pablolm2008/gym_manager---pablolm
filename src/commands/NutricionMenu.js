const inquirer=require("inquirer");
const BaseMenu=require("./BaseMenu");

class NutricionMenu extends BaseMenu {
    constructor(service){super();this.service=service;}
    async mostrar(){
        let go=true;while(go){
            console.clear();console.log("\n=== NUTRICIÓN ===\n");
            const {op}=await inquirer.prompt([{type:"list",name:"op",message:"Operación:",choices:[
                {name:"Crear plan nutricional",value:"crearPlan"},{name:"Listar planes por cliente",value:"listarPlanes"},
                {name:"Registrar alimento",value:"crearAlimento"},{name:"Listar alimentos",value:"listarAlimentos"},
                {name:"Agregar alimento a plan",value:"agregarAlimento"},{name:"Ver alimentos del plan",value:"verPlan"},
                {name:"Reporte semanal de calorías",value:"reporte"},{name:"Regresar",value:"salir"}]}]);
            if(op==="salir")go=false;else await this[op]();
        }
    }
    async crearPlan(){
        const d=await inquirer.prompt([{type:"input",name:"id_cliente_plan",message:"ID cliente-plan:",filter:Number},
            {type:"input",name:"nombre",message:"Nombre del plan:"},await this.fecha("fecha_inicio","Fecha inicio:"),await this.fecha("fecha_fin","Fecha fin:")]);
        await this.ejecutar("Crear plan nutricional",async()=>`Plan creado. ID: ${await this.service.crearPlan(d)}`);
    }
    async listarPlanes(){const {id}=await this.id("ID cliente:");await this.ejecutar("Planes nutricionales",async()=>{const r=await this.service.listarPorCliente(id);console.table(r);return `Total: ${r.length}.`;});}
    async crearAlimento(){const d=await inquirer.prompt([{type:"input",name:"nombre",message:"Nombre:"},{type:"input",name:"calorias_estimadas",message:"Calorías estimadas:",filter:Number,validate:v=>v>=0||"No puede ser negativo."}]);await this.ejecutar("Registrar alimento",async()=>`Alimento creado. ID: ${await this.service.crearAlimento(d)}`);}
    async listarAlimentos(){await this.ejecutar("Lista de alimentos",async()=>{const r=await this.service.listarAlimentos();console.table(r);return `Total: ${r.length}.`;});}
    async agregarAlimento(){const d=await inquirer.prompt([{type:"input",name:"id_plan_nutricional",message:"ID plan nutricional:",filter:Number},{type:"input",name:"id_alimento",message:"ID alimento:",filter:Number},{type:"list",name:"dia",message:"Día:",choices:["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"]},{type:"input",name:"cantidad",message:"Cantidad:",filter:Number},{type:"input",name:"calorias",message:"Calorías de la porción:",filter:Number}]);await this.ejecutar("Agregar alimento",async()=>`Alimento agregado. ID: ${await this.service.agregarAlimento(d)}`);}
    async verPlan(){const {id}=await this.id("ID plan nutricional:");await this.ejecutar("Detalle nutricional",async()=>{const r=await this.service.listarAlimentosDelPlan(id);console.table(r);return `Total: ${r.length} registro(s).`;});}
    async reporte(){const {id}=await this.id("ID plan nutricional:");await this.ejecutar("Reporte semanal",async()=>{const r=await this.service.reporteSemanal(id);console.table(r);return "";});}
}
module.exports=NutricionMenu;
