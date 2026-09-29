# Auditoría final — Gym Manager CLI

## Resultado

Se completó el menú CLI y se alineó la aplicación con el esquema `gym_manager` proporcionado.

## Cambios

- Menú principal completo.
- Dashboard con métricas generales y mensuales.
- Clientes.
- Planes.
- Asignaciones y contratos.
- Progreso físico.
- Nutrición.
- Finanzas.
- Creación automática de contrato al asignar plan.
- Creación automática de ingreso al registrar pago.
- Transacciones para operaciones de varias tablas.
- `schema.sql` basado en la estructura entregada.
- `seed.sql` con datos de demostración.
- Corrección de `pago` para usar `id_contrato`, que es la FK definida por el esquema.
- Pruebas actualizadas.
- `.env` original excluido del paquete.

## Comandos de calidad

```bash
npm install
npm run check
npm test
npm start
```
