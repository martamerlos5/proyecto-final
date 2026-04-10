\# Proyecto CulturaActiva



Aplicación web compuesta por:

\- Frontend en React

\- Backend en Laravel

\- Backend en Spring Boot



Permite gestionar usuarios y eventos.



\## Tecnologías



\- React

\- Laravel

\- Spring Boot

\- MySQL

\- Docker \& Docker Compose



\## Estructura



\- /frontend → React

\- /backend-laravel -> API Laravel

\- /backend-spring -> API Spring Boot

\- /mysql-init -> BBDD para Docker

\- docker-compose.yml



\## Ejecución sin Docker



\### Frontend (React)

\- Para descargar las dependencias (y recuperar la carpeta node modules): npm install / npm i

\- Para desplegar el proyecto: npm run dev



Proyecto Laravel

\- Para descargar las dependencias (y recuperar la carpeta vendor): composer install

\- Para desplegar el proyecto: php artisan serve



Proyecto Spring Boot

\- Para desplegar el proyecto: mvn spring-boot:run



\## Configuración de entorno



El archivo .env de Laravel tiene que tener estas propiedades:



DB\_CONNECTION=mysql

DB\_HOST=127.0.0.1

DB\_PORT=3306

DB\_DATABASE=usuarios\_bd

DB\_USERNAME=root

DB\_PASSWORD=





El archivo application.properties de Spring Boot debe tener estas propiedades:



spring.application.name=back\_spring

spring.datasource.url=jdbc:mysql://localhost:3306/eventos\_bd

spring.datasource.username=root

spring.datasource.password=

spring.jpa.hibernate.ddl-auto=update

spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect





Estas configuraciones están comentadas en los archivos originales.





\## Ejecución con Docker

\### Requisitos

\- Docker Desktop instalado y en ejecución

\- XAMPP apagado



Para desplegar: docker-compose up --build o docker-compose up -d --build







\## Puertos

\- Frontend: http://localhost:5173

\- Laravel: http://localhost:8000

\- Spring Boot: http://localhost:8080

\- MySQL: 3306


\## Notas

- Asegurarse de tener Node.js, PHP, Composer y Java instalados
- Docker es la forma recomendada de ejecución
- No he podido implementar FormData para subir las imágenes, así que las imágenes que se quieran subir para crear/editar los eventos
deben estar en la carpeta 'public' del frontend. A veces se quedan pillados los cambios, para eso hay que hacer 'docker-compose up -d --build' en el proyecto.