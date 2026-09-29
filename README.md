# Gym Manager CLI

Sistema de consola para gestionar un gimnasio mediante **Node.js + MySQL**.

La versión final conserva la arquitectura:

```text
CLI → Commands → Services → Repositories → MySQL
```

## Menú principal

1. Dashboard / Métricas
2. Clientes
3. Planes de entrenamiento
4. Asignaciones y contratos
5. Progreso físico
6. Nutrición
7. Finanzas
8. Salir

## Métricas

El Dashboard calcula directamente desde MySQL:

- Total de clientes.
- Clientes activos.
- Total de planes.
- Contratos activos.
- Registros de progreso.
- Planes nutricionales.
- Total de pagos.
- Total de ingresos.
- Total de egresos.
- Balance general.
- Ingresos del mes actual.
- Egresos del mes actual.
- Balance del mes actual.
- Planes más utilizados.

## Base de datos

Se utiliza el esquema proporcionado para `gym_manager`:

`cliente`, `plan`, `cliente_plan`, `contrato`, `progreso`, `plan_nutricional`, `alimento`, `plan_nutricional_alimento`, `pago`, `ingreso` y `egreso`.

**Importante:** `pago` se relaciona con `contrato` mediante `id_contrato`; no se agregó `id_cliente` porque no existe en el esquema proporcionado.

## Instalación

### 1. Crear la BD

```sql
SOURCE database/schema.sql;
```

Datos de prueba opcionales:

```sql
SOURCE database/seed.sql;
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar conexión

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales reales:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_clave
DB_NAME=gym_manager
DB_CONNECTION_LIMIT=10
```

No subas `.env` a GitHub.

### 4. Ejecutar

```bash
npm start
```

Desarrollo:

```bash
npm run dev
```

## Verificación

```bash
npm run check
npm test
```

## Funcionalidades

### Clientes
Registrar, listar, buscar, actualizar y eliminar.

### Planes
Registrar, listar, buscar, actualizar y eliminar respetando integridad referencial.

### Asignaciones y contratos
Asignar un plan, generar contrato automáticamente, listar y cambiar estados. La asignación y el contrato se crean dentro de una transacción.

### Progreso
Registrar mediciones, consultar historial, consultar última medición y eliminar.

### Nutrición
Crear planes nutricionales, registrar alimentos, asociarlos a planes, consultar el detalle y generar reporte semanal de calorías.

### Finanzas
Registrar pagos, generar automáticamente el ingreso asociado, listar pagos/ingresos, registrar y listar egresos, consultar balance y egresos por categoría.

## Estructura

```text
gym-manager-cli/
├── database/
│   ├── schema.sql
│   └── seed.sql
├── docs/
│   └── METRICAS.md
├── src/
│   ├── app.js
│   ├── commands/
│   ├── config/
│   ├── factories/
│   ├── models/
│   ├── repositories/
│   ├── services/
│   └── utils/
├── test/
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Flujo principal

### Asignar plan

```text
Cliente → Plan → Fechas → cliente_plan → contrato → COMMIT
```

Si ocurre un error, se ejecuta `ROLLBACK`.

### Registrar pago

```text
Contrato activo → pago → ingreso → COMMIT
```

Así se mantienen sincronizados el pago y el ingreso.

## Seguridad

- Consultas SQL parametrizadas.
- Credenciales mediante `.env`.
- `.env` excluido por `.gitignore`.
- No se incluye el `.env` original del snapshot.
- Validaciones en modelos y servicios.

## Autor

Pablo López

Proyecto académico — Gym Manager CLI.
