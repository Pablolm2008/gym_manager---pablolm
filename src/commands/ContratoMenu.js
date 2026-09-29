const inquirer=require("inquirer");
const BaseMenu=require("./BaseMenu");

class ContratoMenu extends BaseMenu {
    constructor(service){super();this.service=service;}
    async mostrar(){
        let go=true;while(go){
            console.clear();console.log("\n=== ASIGNACIONES Y CONTRATOS ===\n");
            const {op}=await inquirer.prompt([{type:"list",name:"op",message:"Operación:",choices:[
                {name:"Asignar plan y generar contrato",value:"asignar"},{name:"Listar asignaciones",value:"asignaciones"},
                {name:"Listar contratos",value:"contratos"},{name:"Cambiar estado de asignación",value:"estadoAsignacion"},
                {name:"Cambiar estado de contrato",value:"estadoContrato"},{name:"Regresar",value:"salir"}]}]);
            if(op==="salir")go=false;else await this[op]();
        }
    }
    async asignar(){
        const d=await inquirer.prompt([
            {type:"input",name:"id_cliente",message:"ID cliente:",filter:Number},
            {type:"input",name:"id_plan",message:"ID plan:",filter:Number},
            await this.fecha("fecha_inicio","Fecha de inicio:"),
            await this.fecha("fecha_fin","Fecha de fin:"),
            {type:"input",name:"condiciones",message:"Condiciones del contrato:"}
        ]);
        await this.ejecutar("Asignar plan",async()=>{const r=await this.service.asignarPlan(d);return `Asignación #${r.id_cliente_plan} y contrato #${r.id_contrato} creados.`;});
    }
    async asignaciones(){await this.ejecutar("Asignaciones",async()=>{const r=await this.service.listarAsignaciones();console.table(r);return `Total: ${r.length}.`;});}
    async contratos(){await this.ejecutar("Contratos",async()=>{const r=await this.service.listarContratos();console.table(r);return `Total: ${r.length}.`;});}
    async estadoAsignacion(){
        const {id}=await this.id("ID cliente-plan:");
        const {estado}=await inquirer.prompt([{type:"list",name:"estado",message:"Nuevo estado:",choices:["Activo","Cancelado","Finalizado","Renovado"]}]);
        await this.ejecutar("Estado asignación",()=>this.service.cambiarEstadoClientePlan(id,estado));
    }
    async estadoContrato(){
        const {id}=await this.id("ID contrato:");
        const {estado}=await inquirer.prompt([{type:"list",name:"estado",message:"Nuevo estado:",choices:["Activo","Cancelado","Finalizado"]}]);
        await this.ejecutar("Estado contrato",()=>this.service.cambiarEstadoContrato(id,estado));
    }
}
module.exports=ContratoMenu;
