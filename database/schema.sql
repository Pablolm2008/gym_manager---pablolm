DROP DATABASE IF EXISTS gym_manager;
CREATE DATABASE gym_manager CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gym_manager;

CREATE TABLE cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    CONSTRAINT chk_cliente_nombre CHECK (CHAR_LENGTH(nombre) >= 2),
    CONSTRAINT chk_cliente_apellido CHECK (CHAR_LENGTH(apellido) >= 2)
);

CREATE TABLE plan (
    id_plan INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    duracion INT NOT NULL,
    meta_fisica VARCHAR(255) NOT NULL,
    nivel ENUM('Principiante','Intermedio','Avanzado') NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    CONSTRAINT chk_plan_duracion CHECK (duracion > 0),
    CONSTRAINT chk_plan_precio CHECK (precio >= 0)
);

CREATE TABLE cliente_plan (
    id_cliente_plan INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_plan INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    estado ENUM('Activo','Cancelado','Finalizado','Renovado') NOT NULL DEFAULT 'Activo',
    CONSTRAINT fk_cliente_plan_cliente FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT fk_cliente_plan_plan FOREIGN KEY (id_plan) REFERENCES plan(id_plan)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT chk_cliente_plan_fechas CHECK (fecha_fin > fecha_inicio)
);

CREATE TABLE contrato (
    id_contrato INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente_plan INT NOT NULL UNIQUE,
    condiciones TEXT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    estado ENUM('Activo','Cancelado','Finalizado') NOT NULL DEFAULT 'Activo',
    CONSTRAINT fk_contrato_cliente_plan FOREIGN KEY (id_cliente_plan) REFERENCES cliente_plan(id_cliente_plan)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT chk_contrato_fechas CHECK (fecha_fin > fecha_inicio),
    CONSTRAINT chk_contrato_precio CHECK (precio >= 0)
);

CREATE TABLE progreso (
    id_progreso INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente_plan INT NOT NULL,
    fecha DATE NOT NULL,
    peso DECIMAL(5,2) NOT NULL,
    grasa_corporal DECIMAL(5,2),
    cintura DECIMAL(5,2),
    brazo DECIMAL(5,2),
    pecho DECIMAL(5,2),
    pierna DECIMAL(5,2),
    foto VARCHAR(255),
    comentarios TEXT,
    CONSTRAINT fk_progreso_cliente_plan FOREIGN KEY (id_cliente_plan) REFERENCES cliente_plan(id_cliente_plan)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT chk_progreso_peso CHECK (peso > 0),
    CONSTRAINT chk_progreso_grasa CHECK (grasa_corporal IS NULL OR grasa_corporal >= 0),
    CONSTRAINT chk_progreso_cintura CHECK (cintura IS NULL OR cintura > 0),
    CONSTRAINT chk_progreso_brazo CHECK (brazo IS NULL OR brazo > 0),
    CONSTRAINT chk_progreso_pecho CHECK (pecho IS NULL OR pecho > 0),
    CONSTRAINT chk_progreso_pierna CHECK (pierna IS NULL OR pierna > 0)
);

CREATE TABLE plan_nutricional (
    id_plan_nutricional INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente_plan INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    CONSTRAINT fk_nutricional_cliente_plan FOREIGN KEY (id_cliente_plan) REFERENCES cliente_plan(id_cliente_plan)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT chk_nutricional_fechas CHECK (fecha_fin > fecha_inicio)
);

CREATE TABLE alimento (
    id_alimento INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    calorias_estimadas DECIMAL(8,2) NOT NULL,
    CONSTRAINT chk_alimento_calorias CHECK (calorias_estimadas >= 0)
);

CREATE TABLE plan_nutricional_alimento (
    id_plan_nutricional_alimento INT AUTO_INCREMENT PRIMARY KEY,
    id_plan_nutricional INT NOT NULL,
    id_alimento INT NOT NULL,
    dia ENUM('Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo') NOT NULL,
    cantidad DECIMAL(8,2) NOT NULL,
    calorias DECIMAL(8,2) NOT NULL,
    CONSTRAINT fk_pna_plan_nutricional FOREIGN KEY (id_plan_nutricional)
        REFERENCES plan_nutricional(id_plan_nutricional) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_pna_alimento FOREIGN KEY (id_alimento) REFERENCES alimento(id_alimento)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT chk_pna_cantidad CHECK (cantidad > 0),
    CONSTRAINT chk_pna_calorias CHECK (calorias >= 0)
);

CREATE TABLE pago (
    id_pago INT AUTO_INCREMENT PRIMARY KEY,
    id_contrato INT NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    fecha DATE NOT NULL,
    metodo_pago ENUM('Efectivo','Transferencia','Tarjeta') NOT NULL,
    CONSTRAINT fk_pago_contrato FOREIGN KEY (id_contrato) REFERENCES contrato(id_contrato)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT chk_pago_monto CHECK (monto > 0)
);

CREATE TABLE ingreso (
    id_ingreso INT AUTO_INCREMENT PRIMARY KEY,
    id_pago INT NOT NULL UNIQUE,
    concepto VARCHAR(255) NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    fecha DATE NOT NULL,
    CONSTRAINT fk_ingreso_pago FOREIGN KEY (id_pago) REFERENCES pago(id_pago)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT chk_ingreso_monto CHECK (monto > 0)
);

CREATE TABLE egreso (
    id_egreso INT AUTO_INCREMENT PRIMARY KEY,
    concepto VARCHAR(255) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    fecha DATE NOT NULL,
    CONSTRAINT chk_egreso_monto CHECK (monto > 0)
);
