const inquirer=require("inquirer");
const BaseMenu=require("./BaseMenu");

class ProgresoMenu extends BaseMenu {
    constructor(service){super();this.service=service;}
    async mostrar(){
        let go=true;while(go){
            console.clear();console.log("\n=== PROGRESO FÍSICO ===\n");
            const {op}=await inquirer.prompt([{type:"list",name:"op",message:"Operación:",choices:[
                {name:"Registrar medición",value:"registrar"},{name:"Listar progreso",value:"listar"},
                {name:"Ver última medición",value:"ultimo"},{name:"Eliminar medición",value:"eliminar"},
                {name:"Regresar",value:"salir"}]}]);
            if(op==="salir")go=false;else await this[op]();
        }
    }
    async registrar(){
        const d=await inquirer.prompt([
            {type:"input",name:"id_cliente_plan",message:"ID cliente-plan:",filter:Number},
            await this.fecha("fecha","Fecha:"),
            {type:"input",name:"peso",message:"Peso:",filter:Number,validate:v=>v>0||"Debe ser mayor que 0."},
            {type:"input",name:"grasa_corporal",message:"Grasa corporal (opcional):",filter:v=>v===""?null:Number},
            {type:"input",name:"cintura",message:"Cintura (opcional):",filter:v=>v===""?null:Number},
            {type:"input",name:"brazo",message:"Brazo (opcional):",filter:v=>v===""?null:Number},
            {type:"input",name:"pecho",message:"Pecho (opcional):",filter:v=>v===""?null:Number},
            {type:"input",name:"pierna",message:"Pierna (opcional):",filter:v=>v===""?null:Number},
            {type:"input",name:"foto",message:"Ruta de foto (opcional):"},
            {type:"input",name:"comentarios",message:"Comentarios (opcional):"}
        ]);
        await this.ejecutar("Registrar progreso",async()=>`Medición registrada. ID: ${await this.service.registrar(d)}`);
    }
    async listar(){const {id}=await this.id("ID cliente-plan:");await this.ejecutar("Historial de progreso",async()=>{const r=await this.service.listarPorClientePlan(id);console.table(r);return `Total: ${r.length} medición(es).`;});}
    async ultimo(){const {id}=await this.id("ID cliente-plan:");await this.ejecutar("Última medición",async()=>{console.table([await this.service.obtenerUltimo(id)]);return "";});}
    async eliminar(){const {id}=await this.id("ID progreso:");const {ok}=await inquirer.prompt([{type:"confirm",name:"ok",message:"¿Eliminar medición?",default:false}]);if(ok)await this.ejecutar("Eliminar progreso",()=>this.service.eliminar(id));}
}
module.exports=ProgresoMenu;
