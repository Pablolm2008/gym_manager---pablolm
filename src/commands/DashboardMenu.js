const BaseMenu=require("./BaseMenu");
const chalk=require("chalk");

class DashboardMenu extends BaseMenu {
    constructor(service){super();this.service=service;}
    async mostrar(){
        await this.ejecutar("Dashboard / métricas",async()=>{
            const r=await this.service.obtenerResumen();
            console.log(chalk.bold.cyan("\nMÉTRICAS GENERALES\n"));
            const cards=[
                ["Clientes",r.total_clientes],["Clientes activos",r.clientes_activos],
                ["Planes",r.total_planes],["Contratos activos",r.contratos_activos],
                ["Registros de progreso",r.registros_progreso],["Planes nutricionales",r.planes_nutricionales],
                ["Pagos",r.total_pagos],["Ingresos","Q "+Number(r.total_ingresos).toFixed(2)],
                ["Egresos","Q "+Number(r.total_egresos).toFixed(2)],["Balance","Q "+Number(r.balance).toFixed(2)]
            ];
            cards.forEach(([k,v])=>console.log(`${k.padEnd(26)} ${v}`));
            console.log(chalk.bold.cyan("\nMÉTRICAS DEL MES ACTUAL\n"));
            console.log(`Ingresos del mes : Q ${Number(r.ingresos_mes).toFixed(2)}`);
            console.log(`Egresos del mes  : Q ${Number(r.egresos_mes).toFixed(2)}`);
            console.log(`Balance del mes  : Q ${Number(r.balance_mes).toFixed(2)}`);
            console.log(chalk.bold.cyan("\nPLANES MÁS USADOS\n"));
            if(!r.planes_mas_usados.length)console.log("Sin asignaciones.");
            else console.table(r.planes_mas_usados);
            return "";
        });
    }
}
module.exports=DashboardMenu;
