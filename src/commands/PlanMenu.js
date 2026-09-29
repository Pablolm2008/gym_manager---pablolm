const inquirer=require("inquirer");
const BaseMenu=require("./BaseMenu");

class PlanMenu extends BaseMenu {
    constructor(service){super();this.service=service;}
    async mostrar(){
        let go=true; while(go){
            console.clear(); console.log("\n=== PLANES DE ENTRENAMIENTO ===\n");
            const {op}=await inquirer.prompt([{type:"list",name:"op",message:"Operación:",choices:[
                {name:"Registrar plan",value:"crear"},{name:"Listar planes",value:"listar"},
                {name:"Buscar plan",value:"buscar"},{name:"Actualizar plan",value:"actualizar"},
                {name:"Eliminar plan",value:"eliminar"},{name:"Regresar",value:"salir"}]}]);
            if(op==="salir")go=false; else await this[op]();
        }
    }
    async crear(){
        const d=await inquirer.prompt([
            {type:"input",name:"nombre",message:"Nombre:"},
            {type:"input",name:"duracion",message:"Duración en días:",filter:Number,validate:v=>Number.isInteger(v)&&v>0||"Debe ser mayor que 0."},
            {type:"input",name:"meta_fisica",message:"Meta física:"},
            {type:"list",name:"nivel",message:"Nivel:",choices:["Principiante","Intermedio","Avanzado"]},
            {type:"input",name:"precio",message:"Precio:",filter:Number,validate:v=>Number.isFinite(v)&&v>=0||"Precio inválido."}
        ]);
        await this.ejecutar("Registrar plan",async()=>`Plan registrado. ID: ${await this.service.crear(d)}`);
    }
    async listar(){await this.ejecutar("Lista de planes",async()=>{const r=await this.service.listar();console.table(r);return `Total: ${r.length} plan(es).`;});}
    async buscar(){const {id}=await this.id("ID del plan:");await this.ejecutar("Buscar plan",async()=>{console.table([await this.service.buscarPorId(id)]);return "";});}
    async actualizar(){
        const {id}=await this.id("ID del plan:");
        const a=await this.service.buscarPorId(id);
        const d=await inquirer.prompt([
            {type:"input",name:"nombre",message:"Nombre:",default:a.nombre},{type:"input",name:"duracion",message:"Duración:",default:a.duracion,filter:Number},
            {type:"input",name:"meta_fisica",message:"Meta física:",default:a.meta_fisica},{type:"list",name:"nivel",message:"Nivel:",choices:["Principiante","Intermedio","Avanzado"],default:a.nivel},
            {type:"input",name:"precio",message:"Precio:",default:a.precio,filter:Number}
        ]);
        await this.ejecutar("Actualizar plan",()=>this.service.actualizar(id,d));
    }
    async eliminar(){
        const {id}=await this.id("ID del plan:");
        const {ok}=await inquirer.prompt([{type:"confirm",name:"ok",message:"¿Confirmas eliminar el plan?",default:false}]);
        if(ok)await this.ejecutar("Eliminar plan",()=>this.service.eliminar(id));
    }
}
module.exports=PlanMenu;
