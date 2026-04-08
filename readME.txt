Proyecto React
- Para descargar las dependencias (carpeta node modules): npm install / npm i
- Para desplegar el proyecto: npm run dev

Proyecto Laravel
- Para descargar las dependencias (carpeta vendor):


Proyecto Spring Boot



-------------------------

Para desplegar el proyecto sin Docker, el archivo .env de Laravel tiene que tener estas propiedades:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=usuarios_bd
DB_USERNAME=root
DB_PASSWORD=


El archivo application.properties de Spring Boot debe tener estas propiedades:

spring.application.name=back_spring
spring.datasource.url=jdbc:mysql://localhost:3306/eventos_bd
spring.datasource.username=root
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect


En ambos archivos se encuentran comentadas esas las líneas de código. 

Ambos archivos están configurados y preparados para desplegarse con Docker y Docker Compose.



-----------------------------------------

Para desplegar la aplicación con Docker, en la raíz del proyecto se debe ejecutar el comando ''. Con el tiempo, se acabarán descargando todas las dependencias y se irán conectando los contenedores.