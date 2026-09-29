# Métricas del Dashboard

| Métrica | Tabla(s) | Cálculo |
|---|---|---|
| Total clientes | cliente | COUNT(*) |
| Clientes activos | cliente_plan | COUNT(*) con estado Activo |
| Total planes | plan | COUNT(*) |
| Contratos activos | contrato | COUNT(*) con estado Activo |
| Registros de progreso | progreso | COUNT(*) |
| Planes nutricionales | plan_nutricional | COUNT(*) |
| Pagos | pago | COUNT(*) |
| Ingresos | ingreso | SUM(monto) |
| Egresos | egreso | SUM(monto) |
| Balance | ingreso + egreso | ingresos - egresos |
| Ingresos del mes | ingreso | SUM(monto) del mes actual |
| Egresos del mes | egreso | SUM(monto) del mes actual |
| Balance del mes | ingreso + egreso | ingresos mensuales - egresos mensuales |
| Planes más usados | cliente_plan + plan | COUNT(*) agrupado por plan |

Las métricas se calculan al consultar el Dashboard y no requieren columnas nuevas.
