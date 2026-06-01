# Prompt para Generar CRUD Spring Boot + MySQL

> Basado en el proyecto `gestor-estudiantes` — Java 17, Spring Boot 4.0.3, MapStruct 1.5.5.Final

---

## Contexto del Proyecto

| Tecnología | Versión |
|------------|---------|
| Java | 17 |
| Spring Boot | 4.0.3 |
| MapStruct | 1.5.5.Final |
| Lombok | (del parent) |
| MySQL Connector | (del parent) |
| Base de datos | `soa2` |
| Puerto | `8081` |

## Dependencias principales
- `spring-boot-starter-data-jpa`
- `spring-boot-starter-webmvc`
- `spring-boot-starter-validation`
- `spring-boot-starter-thymeleaf`
- `mysql-connector-j`
- `lombok`
- `mapstruct`

---

## Prompt

```
Genera un CRUD completo con Spring Boot 4.0.3 + JPA + MySQL siguiendo EXACTAMENTE la estructura del proyecto existente.

## Proyecto Base
- Paquete base: com.uta.gestor_estudiantes
- Java 17
- Lombok + MapStruct 1.5.5.Final
- Thymeleaf para templates
- Puerto: 8081
- Base de datos: soa2

## Estructura obligatoria
src/main/java/com/uta/gestor_estudiantes/
├── entity/{EntityName}.java          @Entity, @Table, Lombok, @PrePersist defaults
├── dto/{EntityName}RequestDto.java   Lombok @Data, Jakarta validation
├── dto/{EntityName}ResponseDto.java Lombok @Data + @AllArgsConstructor + @NoArgsConstructor
├── repository/{EntityName}Repository.java  JpaRepository<{EntityName}, Long>, findByX(), existsByX()
├── service/{EntityName}Service.java  Interface con CRUD completo
├── service/impl/{EntityName}ServiceImpl.java  @Service @Transactional, inyección constructor
├── controller/{EntityName}Controller.java  @RestController @RequestMapping, GET/POST/PUT/DELETE
├── mapper/{EntityName}Mapper.java    @Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
├── validation/Unique{Field}Validator.java   Implementación de ConstraintValidator
└── validation/Unique{Field}.java     @Constraint annotation

## Reglas de código
1. **Entity**: nombre tabla en español singular (ej: "estudiante"), @PrePersist para defaults
2. **DTO Request**: validaciones Jakarta ( @NotBlank, @Size, @Pattern), Constraint custom para campos únicos
3. **DTO Response**: sin validaciones, solo Lombok
4. **Repository**: método findBy{campoUnico} y existsBy{campoUnico}
5. **Service**: usa Optional + orElseThrow(ResourceNotFoundException)
6. **Controller**: acepta JSON Y form-data (MediaType.APPLICATION_JSON_VALUE y MULTIPART_FORM_DATA_VALUE)
7. **Validation**: crear annotation + validator si hay campos únicos
8. **Mapper**: interface MapStruct con toDTO() y toEntity()

## SQL MySQL generado
CREATE DATABASE IF NOT EXISTS soa2;
USE soa2;

CREATE TABLE {tabla} (
    {campo_id} VARCHAR(10) PRIMARY KEY,
    {campo2} VARCHAR(100) NOT NULL,
    {campo3} VARCHAR(100) NOT NULL,
    {campo4} VARCHAR(10),
    {campo5} VARCHAR(255)
);

## application.properties (agregar al existente)
# La nueva tabla se maneja con ddl-auto: update
```

---

## Uso

1. Copiá el prompt completo de arriba
2. Pegalo en el chat con el enunciado del ejercicio
3. Copiá los archivos Java generados a sus rutas correspondientes
4. Ejecutá el SQL en MySQL
5. Si hay nuevas entidades, `ddl-auto: update` las crea automáticamente

---

## Recursos adicionales

- Exception personalizada ya existe: `ResourceNotFoundException.java`
- Exception handler global ya existe: `GlobalExceptionHandler.java`
- HomeController ya existe: `/`
- Config de CORS ya existe: `WebConfig.java`