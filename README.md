# GYM MANAGER

Sistema de gestión de gimnasio desarrollado como una aplicación **CLI (Command Line Interface)** utilizando **Node.js**, **JavaScript ES Modules** y **MySQL**.

El proyecto permite administrar clientes, planes de entrenamiento, contratos, progreso físico, nutrición y finanzas desde una interfaz de línea de comandos.

---

## 📋 Descripción del proyecto

**GYM MANAGER** es un sistema diseñado para facilitar la administración de un gimnasio mediante una aplicación de consola.

El sistema permite gestionar:

*  Clientes
*  Planes de entrenamiento
*  Asignaciones y contratos
*  Progreso físico
* Planes nutricionales
*  Finanzas
*  Dashboard con métricas generales

El proyecto utiliza una arquitectura organizada por responsabilidades, separando los modelos, repositorios, servicios y menús de interacción con el usuario.

### Objetivo

Centralizar la información administrativa del gimnasio y facilitar operaciones como:

* Registrar clientes.
* Consultar clientes.
* Crear y consultar planes.
* Asignar planes a clientes.
* Gestionar contratos.
* Registrar progreso físico.
* Crear planes nutricionales.
* Registrar alimentos.
* Gestionar pagos.
* Registrar ingresos y egresos.
* Consultar métricas generales del gimnasio.

---

#  Instalación y uso

## 1. Requisitos

Antes de ejecutar el proyecto se necesita tener instalado:

* [Node.js](https://nodejs.org/)
* MySQL
* Git
* npm

Se recomienda utilizar una versión moderna de Node.js compatible con ES Modules.

---

## 2. Clonar el proyecto

```bash
git clone https://github.com/Pablolm2008/gym_manager---pablolm.git
cd gym_manager---pablolm
```

---

## 3. Instalar dependencias

```bash
npm install
```

---

## 4. Configurar las variables de entorno

Crear el archivo `.env` a partir del archivo de ejemplo:

```bash
cp .env.example .env
```

Configurar los datos de conexión a MySQL:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=gym_manager
DB_CONNECTION_LIMIT=10
```

Modificar los valores según la configuración local de MySQL.

---

## 5. Crear la base de datos

El proyecto incluye el archivo:

```text
database/schema.sql
```

Este archivo contiene la estructura completa de la base de datos `gym_manager`.

Puede ejecutarse desde MySQL:

```bash
mysql -u root -p < database/schema.sql
```

También puede ejecutarse desde MySQL Workbench, phpMyAdmin o cualquier cliente compatible.

---

## 6. Insertar datos de prueba

El proyecto incluye datos de demostración en:

```text
database/seed.sql
```

Para cargarlos:

```bash
mysql -u root -p gym_manager < database/seed.sql
```

Estos datos permiten probar las diferentes funcionalidades del sistema.

---

## 7. Ejecutar el proyecto

Para iniciar la aplicación:

```bash
npm start
```

También puede ejecutarse directamente:

```bash
node src/app.js
```

---

##  Pruebas

El proyecto incluye pruebas automatizadas.

Para ejecutarlas:

```bash
npm test
```

También se puede comprobar la sintaxis de los archivos JavaScript:

```bash
npm run check
```

---

#  Estructura del proyecto

```text
gym-manager-cli/
│
├── database/
│   ├── schema.sql
│   └── seed.sql
│
├── docs/
│   └── METRICAS.md
│
├── src/
│   │
│   ├── app.js
│   │
│   ├── commands/
│   │   ├── BaseMenu.js
│   │   ├── Menu.js
│   │   ├── ClienteMenu.js
│   │   ├── PlanMenu.js
│   │   ├── ContratoMenu.js
│   │   ├── ProgresoMenu.js
│   │   ├── NutricionMenu.js
│   │   ├── FinanzasMenu.js
│   │   └── DashboardMenu.js
│   │
│   ├── models/
│   │   ├── Cliente.js
│   │   ├── Plan.js
│   │   ├── ClientePlan.js
│   │   ├── Contrato.js
│   │   ├── Progreso.js
│   │   ├── PlanNutricional.js
│   │   ├── Alimento.js
│   │   ├── PlanNutricionalAlimento.js
│   │   ├── Pago.js
│   │   ├── Ingreso.js
│   │   └── Egreso.js
│   │
│   ├── repositories/
│   │   ├── ClienteRepository.js
│   │   ├── PlanRepository.js
│   │   ├── ClientePlanRepository.js
│   │   ├── ContratoRepository.js
│   │   ├── ProgresoRepository.js
│   │   ├── PlanNutricionalRepository.js
│   │   ├── AlimentoRepository.js
│   │   ├── PagoRepository.js
│   │   ├── IngresoRepository.js
│   │   ├── EgresoRepository.js
│   │   └── DashboardRepository.js
│   │
│   ├── services/
│   │   ├── ClienteService.js
│   │   ├── PlanService.js
│   │   ├── ClientePlanService.js
│   │   ├── ProgresoService.js
│   │   ├── NutricionService.js
│   │   ├── FinanzasService.js
│   │   └── DashboardService.js
│   │
│   ├── utils/
│   │   ├── validation.js
│   │   └── transaction.js
│   │
│   └── config/
│       └── database.js
│
├── test/
│   └── models.test.js
│
├── .env.example
├── .gitignore
├── package.json
├── AUDITORIA.md
└── README.md
```

---

# Arquitectura

El proyecto utiliza una separación por capas para mantener el código organizado.

### Models

Representan las entidades principales del sistema.

Ejemplos:

```text
Cliente
Plan
Contrato
Progreso
Pago
Ingreso
Egreso
```

Su responsabilidad principal es representar y validar los datos.

---

### Repositories

Se encargan de la comunicación con MySQL.

Ejemplo:

```text
ClienteRepository
PlanRepository
PagoRepository
DashboardRepository
```

Los repositorios contienen las consultas SQL necesarias para obtener, insertar o modificar información.

---

### Services

Contienen la lógica de negocio.

Ejemplo:

```text
ClienteService
PlanService
FinanzasService
NutricionService
DashboardService
```

Los servicios utilizan los repositorios y aplican las reglas necesarias antes de realizar las operaciones.

---

### Commands

Contienen la interacción con el usuario mediante la terminal.

Ejemplo:

```text
ClienteMenu
PlanMenu
ContratoMenu
FinanzasMenu
DashboardMenu
```

Los menús muestran opciones y reciben información desde la consola.

---

#  Principios SOLID aplicados

## S — Single Responsibility Principle

**Principio de responsabilidad única.**

Cada clase tiene una responsabilidad principal.

Ejemplo:

```text
ClienteRepository
```

se encarga de las operaciones relacionadas con clientes en la base de datos.

Mientras que:

```text
ClienteService
```

se encarga de la lógica de negocio relacionada con clientes.

Esto evita concentrar toda la lógica en una sola clase.

---

## O — Open/Closed Principle

**Principio abierto/cerrado.**

Las funcionalidades están separadas por módulos, permitiendo agregar nuevos componentes sin modificar constantemente los existentes.

Por ejemplo, se pueden agregar nuevos módulos administrativos creando:

```text
NuevoService
NuevoRepository
NuevoMenu
```

sin tener que concentrar toda la funcionalidad en `Menu.js`.

---

## L — Liskov Substitution Principle

El proyecto utiliza una clase base para los menús:

```text
BaseMenu
```

Los diferentes menús pueden reutilizar la estructura común definida por esta clase.

Ejemplo:

```text
ClienteMenu
PlanMenu
FinanzasMenu
DashboardMenu
```

Esto permite mantener una estructura común entre los componentes de interacción.

---

## I — Interface Segregation Principle

El proyecto evita crear clases con responsabilidades innecesarias.

Cada módulo trabaja únicamente con las operaciones que necesita.

Por ejemplo:

```text
ClienteRepository
```

maneja operaciones de clientes y no contiene consultas relacionadas con nutrición o finanzas.

---

## D — Dependency Inversion Principle

Las capas superiores no realizan directamente las consultas SQL.

La comunicación sigue una estructura similar a:

```text
Menu
  ↓
Service
  ↓
Repository
  ↓
MySQL
```

Esto permite separar la lógica de presentación, negocio y acceso a datos.

---

#  Patrones de diseño utilizados

## Repository Pattern

Se utiliza para separar el acceso a la base de datos de la lógica de negocio.

Ejemplo:

```text
ClienteService
      ↓
ClienteRepository
      ↓
MySQL
```

Los repositorios contienen las consultas SQL y las operaciones relacionadas con cada entidad.

---

## Service Layer Pattern

Los servicios encapsulan las reglas de negocio.

Ejemplo:

```text
FinanzasService
```

coordina operaciones relacionadas con pagos e ingresos y puede utilizar transacciones para mantener la consistencia de los datos.

---

## Factory Pattern

El proyecto utiliza una fábrica para centralizar la creación de componentes de la aplicación.

Ubicación:

```text
src/AppFactory.js
```

Su objetivo es facilitar la creación y organización de las dependencias principales del sistema.

---

## Template Method / Base Menu

La clase:

```text
src/commands/BaseMenu.js
```

proporciona una estructura común para los menús de la aplicación.

Los diferentes módulos reutilizan esta estructura:

```text
ClienteMenu
PlanMenu
ContratoMenu
ProgresoMenu
NutricionMenu
FinanzasMenu
DashboardMenu
```

---

## Transaction Pattern

Las operaciones que necesitan modificar varias tablas pueden ejecutarse dentro de una transacción.

Esto permite mantener la consistencia de la información.

Por ejemplo, una operación financiera puede involucrar:

```text
Pago
  ↓
Ingreso
```

Si una operación falla, la transacción puede revertir los cambios realizados.

---

# 🗄️ Base de datos

El sistema utiliza MySQL y está organizado alrededor de las principales entidades del gimnasio.

Las tablas principales son:

```text
cliente
plan
cliente_plan
contrato
progreso
plan_nutricional
alimento
plan_nutricional_alimento
pago
ingreso
egreso
```

Las relaciones entre estas tablas permiten mantener la información organizada y evitar duplicación innecesaria de datos.

---

# Dashboard y métricas

El sistema incluye un módulo de Dashboard que permite consultar métricas generales.

Entre las métricas disponibles se encuentran:

* Total de clientes.
* Clientes activos.
* Total de planes.
* Contratos activos.
* Registros de progreso.
* Planes nutricionales.
* Total de pagos.
* Total de ingresos.
* Total de egresos.
* Balance general.
* Ingresos del mes actual.
* Egresos del mes actual.
* Balance mensual.
* Planes más utilizados.

La definición de estas métricas se encuentra documentada en:

```text
docs/METRICAS.md
```

---

# ⚙️ Consideraciones técnicas

### Node.js

El proyecto utiliza Node.js como entorno de ejecución.

Se utiliza JavaScript moderno mediante ES Modules:

```javascript
import ...
export ...
```

---

### MySQL

MySQL se utiliza como sistema de gestión de base de datos.

La conexión se configura mediante variables de entorno para evitar colocar credenciales directamente dentro del código.

---

### Variables de entorno

Las credenciales de la base de datos deben almacenarse en:

```text
.env
```

Este archivo no debe subirse al repositorio.

Para facilitar la configuración se incluye:

```text
.env.example
```

---

### Validaciones

El sistema incorpora validaciones para evitar datos incorrectos.

Algunos ejemplos:

* Correos electrónicos válidos.
* Precios mayores o iguales a cero.
* Fechas coherentes.
* Niveles de entrenamiento válidos.
* Métodos de pago válidos.
* Cantidades válidas.
* Datos obligatorios.

---

### Integridad de datos

La base de datos utiliza:

* Claves primarias.
* Claves foráneas.
* Restricciones `UNIQUE`.
* Restricciones `CHECK`.
* Valores `ENUM`.
* Relaciones entre entidades.

Estas restricciones ayudan a mantener la consistencia de la información.

---

### Seguridad

Las consultas a MySQL utilizan parámetros para evitar construir consultas directamente con los valores ingresados por el usuario.

Además, las credenciales de conexión se manejan mediante variables de entorno.

---

### Transacciones

Las operaciones que involucran varias modificaciones relacionadas utilizan transacciones para evitar que la base de datos quede en un estado inconsistente si ocurre un error.

---

#  Pruebas

El proyecto contiene pruebas automatizadas para validar diferentes componentes.

Ejecutar:

```bash
npm test
```

Resultado esperado:

```text
8 tests
8 passed
0 failed
```

También se puede verificar la sintaxis de los archivos:

```bash
npm run check
```

---

# Consideraciones para desarrollo

Para realizar modificaciones al proyecto se recomienda mantener la separación de responsabilidades:

```text
commands/
    ↓
services/
    ↓
repositories/
    ↓
database/
```

Las nuevas funcionalidades deberían respetar esta estructura.

Por ejemplo, para agregar un nuevo módulo:

```text
NuevoModuloMenu.js
NuevoModuloService.js
NuevoModuloRepository.js
```

y posteriormente integrarlo al menú principal.

---

#  Créditos

**Proyecto:** GYM MANAGER

**Desarrollador:** Pablo Lopez

**Tecnologías utilizadas:**

* Node.js
* JavaScript
* MySQL
* npm
* Git
* GitHub

Proyecto desarrollado con fines académicos y de aprendizaje, aplicando principios de programación estructurada, arquitectura por capas, patrones de diseño y buenas prácticas de desarrollo de software.

---

# Licencia

Este proyecto fue desarrollado con fines educativos.

El código puede utilizarse como referencia para el aprendizaje de Node.js, JavaScript, MySQL, arquitectura de software y desarrollo de aplicaciones CLI.

---

# AUTOR

Pablo Lòpez Monzòn
