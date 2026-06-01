# Gestor de Productos 🚀

Este proyecto es una aplicación MVC desarrollada con **Spring Boot** y **Java 17**. NO es un proyecto de juguete sacado de un tutorial de 10 minutos, así que respetá la arquitectura y los patrones de diseño definidos.

## 🏗️ Estructura del Proyecto (Arquitectura en Capas)

Este código está estructurado para ser mantenible y escalable. Cada componente tiene su responsabilidad clara:

- `config`: Configuraciones de la aplicación (Seguridad, Interceptors, Beans explícitos, etc).
- `controller`: **SÓLO** recibe peticiones HTTP, delega la lógica y devuelve respuestas (Vistas HTML con Thymeleaf o JSON). **¡PROHIBIDO meter lógica de negocio acá!**
- `dto` (Data Transfer Object): Los objetos de transferencia de datos. Las entidades de base de datos NO se exponen directamente en las vistas o APIs. Pasamos la información a través de DTOs.
- `entity`: Modelos de persistencia que mapean directamente a las tablas de la base de datos (JPA).
- `exception`: Clases para control global de errores (`@ControllerAdvice`) y excepciones personalizadas. Controlar los fallos para que el usuario o cliente reciba información clara.
- `mapper`: Clases superficiales o interfaces (usualmente con MapStruct) para transformar instancias de Entidades a DTOs y viceversa.
- `repository`: Interfaces de Spring Data JPA. **Única y exclusivamente** para realizar operaciones con la base de datos.
- `service`: Acá está la LÓGICA DE NEGOCIO pura y dura. Recibe la petición del controlador, procesa lo que haya que hacer consultando repositorios y devuelve el resultado.
- `validation`: Lógica para validaciones personalizadas avanzadas o anotaciones a medida.
- `resources/templates`: Vistas renderizadas desde servidor usando **Thymeleaf**.
- `resources/static`: Archivos estáticos (CSS, JS, librerías del cliente).

## 🗄️ Requisitos Previos

- **Java 17** instalado y configurado en el `PATH`.
- Base de datos **MySQL** en ejecución.
- Credenciales y URL correctas de MySQL configuradas en el archivo `src/main/resources/application.properties`.

## 🚀 Cómo inicializar el entorno

Sigan estas instrucciones paso a paso. No hay magia, hay procesos.

### Desde IntelliJ IDEA (IDE Recomendado)

1. Abrir IntelliJ IDEA.
2. Ir a `File` -> `Open...` y seleccionar la carpeta raíz del proyecto (`gestor-productos`) o directamente el archivo `pom.xml`.
3. Seleccionar "Open as Project" si te lo pregunta. 
4. IntelliJ reconocerá el proyecto Maven y descargará las dependencias de internet. Esperá pacientemente.
5. Verificá que el proyecto esté usando JDK 17 yendo a `File` -> `Project Structure` -> `Project` (y chequeá la opción `SDK`).
6. En la vista de proyecto a la izquierda, navegá hasta `src/main/java/com/uta/gestor_productos` y abrí la clase principal: `GestorProductosApplication.java`.
7. Hacé click derecho en el archivo o clickeá el botón verde de "Play" al lado de la firma de la clase y elegí **`Run GestorProductosApplication`**.
8. Observá la consola. Si el `application.properties` está bien configurado con los datos de tu BD, debría decir "Started GestorProductosApplication" y vas a poder entrar a `http://localhost:8081`.

### Desde VS Code (o cualquier otro editor ligero)

Si optás por VS Code, asegurate de tenerlo propiamente configurado para el desarrollo Java:

1. Abrí la carpeta `gestor-productos` directamente en VS Code.
2. Instalá la extensión fundamental: **Extension Pack for Java** de Microsoft. También se recomienda **Spring Boot Extension Pack** para tener autocompletado de properties y ayudas del framework.
3. Abrí un terminal integrado (`Terminal` -> `New Terminal`).
4. Para arrancar la app, usá el wrapper incluido de Maven (así no hace falta que instales Maven globalmente en el SO):
   - En **Windows** (PowerShell o CMD):
     ```bash
     .\mvnw spring-boot:run
     ```
   - En **Linux / Mac** (o Git Bash / WSL):
     ```bash
     ./mvnw spring-boot:run
     ```
5. El framework va a compilar el proyecto y levantar un servidor Tomcat embebido. Observá los logs y accedé mediante `http://localhost:8081`.

## ⚠️ Reglas inquebrantables del repositorio

- **Solid y Single Responsibility**: No inyectes un `Repository` adentro de un `Controller`. En medio va un `.Service`.
- **Los DTOs mandan hacia afuera**: Evitemos a toda costa devolver un `@Entity` hacia la capa de presentación. Usá los `Mappers` provistos.
- **Commits claros**: Respetar formato de *Conventional Commits* en el versionado. (Ejemplo: `feat: add product search`, `fix: resolve memory leak on list`).
