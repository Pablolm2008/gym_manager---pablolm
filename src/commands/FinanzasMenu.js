const inquirer=require("inquirer");
const BaseMenu=require("./BaseMenu");

class FinanzasMenu extends BaseMenu {
    constructor(service){super();this.service=service;}
    async mostrar(){
        let go=true;while(go){
            console.clear();console.log("\n=== FINANZAS ===\n");
            const {op}=await inquirer.prompt([{type:"list",name:"op",message:"Operación:",choices:[
                {name:"Registrar pago",value:"pago"},{name:"Listar pagos",value:"pagos"},
                {name:"Listar ingresos",value:"ingresos"},{name:"Registrar egreso",value:"egreso"},
                {name:"Listar egresos",value:"egresos"},{name:"Ver balance",value:"balance"},
                {name:"Egresos por categoría",value:"categorias"},{name:"Regresar",value:"salir"}]}]);
            if(op==="salir")go=false;else await this[op]();
        }
    }
    async pago(){
        const d=await inquirer.prompt([{type:"input",name:"id_contrato",message:"ID contrato activo:",filter:Number},{type:"input",name:"monto",message:"Monto:",filter:Number,validate:v=>v>0||"Debe ser mayor que 0."},await this.fecha("fecha","Fecha:"),{type:"list",name:"metodo_pago",message:"Método:",choices:["Efectivo","Transferencia","Tarjeta"]},{type:"input",name:"concepto",message:"Concepto:",default:""}]);
        await this.ejecutar("Registrar pago",async()=>{const r=await this.service.registrarPago(d);return `Pago #${r.id_pago} e ingreso #${r.id_ingreso} registrados.`;});
    }
    async pagos(){await this.ejecutar("Pagos",async()=>{const r=await this.service.listarPagos();console.table(r);return `Total: ${r.length}.`;});}
    async ingresos(){await this.ejecutar("Ingresos",async()=>{const r=await this.service.listarIngresos();console.table(r);return `Total: ${r.length}.`;});}
    async egreso(){const d=await inquirer.prompt([{type:"input",name:"concepto",message:"Concepto:"},{type:"input",name:"categoria",message:"Categoría:"},{type:"input",name:"monto",message:"Monto:",filter:Number,validate:v=>v>0||"Debe ser mayor que 0."},await this.fecha("fecha","Fecha:")]);await this.ejecutar("Registrar egreso",async()=>`Egreso registrado. ID: ${await this.service.registrarEgreso(d)}`);}
    async egresos(){await this.ejecutar("Egresos",async()=>{const r=await this.service.listarEgresos();console.table(r);return `Total: ${r.length}.`;});}
    async balance(){await this.ejecutar("Balance",async()=>{const r=await this.service.obtenerBalance();console.log(`Ingresos : Q ${r.total_ingresos.toFixed(2)}`);console.log(`Egresos  : Q ${r.total_egresos.toFixed(2)}`);console.log(`Balance  : Q ${r.balance.toFixed(2)}`);return "";});}
    async categorias(){await this.ejecutar("Egresos por categoría",async()=>{console.table(await this.service.obtenerEgresosPorCategoria());return "";});}
}
module.exports=FinanzasMenu;
