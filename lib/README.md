# Gestor de Librería 🚀

Sistema de gestión para autores y libros desarrollado con **Spring Boot 3**, **Thymeleaf**, **Bootstrap 5** y **MySQL**.

## 🛠️ Tecnologías

*   **Java 17**
*   **Spring Boot 3** (Data JPA, Validation, Web, Thymeleaf)
*   **MySQL**
*   **Lombok**
*   **Bootstrap 5** (vía CDN)
*   **Vanilla JS**

## 🚀 Instalación y Configuración

### 1. Base de Datos
1.  Asegurate de tener **MySQL** (XAMPP o Workbench) corriendo.
2.  Importá el archivo `libreria (2).sql` que está en la raíz del proyecto para crear las tablas y datos necesarios.

### 2. Configuración de Spring
1.  Andá a `src/main/resources/application.properties`.
2.  Verificá que las credenciales coincidan con las de tu BD:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/libreria
    spring.datasource.username=root
    spring.datasource.password=tus_credenciales
    ```

## 💻 Cómo Correr el Proyecto

### En IntelliJ IDEA / Eclipse
1.  Cloná el repositorio.
2.  Ir a `File` -> `Open...` y seleccionar la carpeta raíz del proyecto (`gestor-libreria`) o directamente el archivo `pom.xml`.
3.  Esperá a que Maven descargue las dependencias.
4.  En la vista de proyecto a la izquierda, navegá hasta `src/main/java/com/uta/gestor_libreria` y abrí la clase principal: `LibreriaApplication.java`.
5.  Hacé click derecho en el archivo o clickeá el botón verde de "Play" al lado de la firma de la clase y elegí **`Run LibreriaApplication`**.
6.  Observá la consola. Si el `application.properties` está bien configurado con los datos de tu BD, debería decir "Started LibreriaApplication" y vas a poder entrar a `http://localhost:8081`.

### En VS Code
1.  Abrí la carpeta `gestor-libreria` directamente en VS Code.
2.  Instalá el "Extension Pack for Java" y "Spring Boot Extension Pack" si no los tenés.
3.  Andá a la pestaña "Spring Boot Dashboard" y dale al botón de "Run" en el proyecto.
