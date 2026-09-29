USE gym_manager;

INSERT INTO cliente (nombre, apellido, telefono, correo) VALUES
('Ana','García','55510001','ana.garcia@gym.local'),
('Luis','Méndez','55510002','luis.mendez@gym.local'),
('Carlos','López','55510003','carlos.lopez@gym.local'),
('María','Pérez','55510004','maria.perez@gym.local'),
('Sofía','Ramírez','55510005','sofia.ramirez@gym.local');

INSERT INTO plan (nombre,duracion,meta_fisica,nivel,precio) VALUES
('Plan Fuerza 30','30','Aumentar fuerza y masa muscular','Principiante',250.00),
('Plan Definición 60','60','Reducir grasa corporal','Intermedio',450.00),
('Plan Rendimiento 90','90','Mejorar rendimiento deportivo','Avanzado',700.00);

INSERT INTO cliente_plan (id_cliente,id_plan,fecha_inicio,fecha_fin,estado) VALUES
(1,1,'2026-09-01','2026-10-01','Activo'),
(2,2,'2026-09-05','2026-11-04','Activo'),
(3,3,'2026-08-15','2026-11-13','Activo'),
(4,1,'2026-08-01','2026-08-31','Finalizado'),
(5,2,'2026-09-10','2026-11-09','Activo');

INSERT INTO contrato (id_cliente_plan,condiciones,fecha_inicio,fecha_fin,precio,estado) VALUES
(1,'Pago mensual y acceso a sala de pesas.','2026-09-01','2026-10-01',250.00,'Activo'),
(2,'Incluye seguimiento de composición corporal.','2026-09-05','2026-11-04',450.00,'Activo'),
(3,'Incluye seguimiento de rendimiento.','2026-08-15','2026-11-13',700.00,'Activo'),
(4,'Contrato finalizado.','2026-08-01','2026-08-31',250.00,'Finalizado'),
(5,'Incluye seguimiento nutricional.','2026-09-10','2026-11-09',450.00,'Activo');

INSERT INTO progreso (id_cliente_plan,fecha,peso,grasa_corporal,cintura,brazo,pecho,pierna,comentarios) VALUES
(1,'2026-09-01',78.50,22.00,88.00,34.00,102.00,58.00,'Medición inicial'),
(1,'2026-09-20',77.20,20.50,85.00,34.50,103.00,59.00,'Buena evolución'),
(2,'2026-09-05',82.00,25.00,94.00,35.00,105.00,60.00,'Medición inicial'),
(3,'2026-08-15',70.00,16.00,78.00,33.00,98.00,57.00,'Medición inicial');

INSERT INTO plan_nutricional (id_cliente_plan,nombre,fecha_inicio,fecha_fin) VALUES
(1,'Nutrición Fuerza','2026-09-01','2026-10-01'),
(2,'Nutrición Definición','2026-09-05','2026-11-04'),
(5,'Nutrición Control','2026-09-10','2026-11-09');

INSERT INTO alimento (nombre,calorias_estimadas) VALUES
('Avena',389),('Pechuga de pollo',165),('Arroz',130),('Banano',89),('Huevo',155),
('Brócoli',35),('Yogur natural',61),('Atún',132);

INSERT INTO plan_nutricional_alimento (id_plan_nutricional,id_alimento,dia,cantidad,calorias) VALUES
(1,1,'Lunes',80,311.20),(1,2,'Lunes',200,330.00),(1,4,'Martes',120,106.80),
(2,2,'Lunes',180,297.00),(2,6,'Lunes',200,70.00),(2,8,'Martes',150,198.00),
(3,7,'Lunes',250,152.50);

INSERT INTO pago (id_contrato,monto,fecha,metodo_pago) VALUES
(1,250.00,'2026-09-01','Tarjeta'),
(2,450.00,'2026-09-05','Transferencia'),
(3,700.00,'2026-09-01','Efectivo'),
(4,250.00,'2026-08-01','Tarjeta'),
(5,450.00,'2026-09-10','Transferencia');

INSERT INTO ingreso (id_pago,concepto,monto,fecha) VALUES
(1,'Pago contrato #1',250.00,'2026-09-01'),
(2,'Pago contrato #2',450.00,'2026-09-05'),
(3,'Pago contrato #3',700.00,'2026-09-01'),
(4,'Pago contrato #4',250.00,'2026-08-01'),
(5,'Pago contrato #5',450.00,'2026-09-10');

INSERT INTO egreso (concepto,categoria,monto,fecha) VALUES
('Compra de productos de limpieza','Limpieza',120.00,'2026-09-03'),
('Mantenimiento de máquinas','Mantenimiento',300.00,'2026-09-08'),
('Servicio de internet','Servicios',90.00,'2026-09-12'),
('Material deportivo','Equipamiento',180.00,'2026-09-15');
