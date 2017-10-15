# Argentum Online Web - Cliente

### Requerimientos
* Apache
* .htaccess habilitado
* Modulo headers habilitado
* Modulo expires habilitado
* Modulo rewrite habilitado
* PHP >= 5.4
* MCrypt PHP Extension

Si posee el error "ErrorException in Connector.php line 47:", asegurarse de tener habilitadas en php.ini las extensiones:
* extension=php_mbstring.dll
* extension=php_mysqli.dll
* extension=php_openssl.dll
* extension=php_pdo_mysql.dll

### Instalación

Instalar Laravel

```
sudo php composer.phar install
```

Permisos de lectura y escritura a la carpeta 'storage'
```sh
$ sudo chmod -R 777 storage
```

Cambiar sus credenciales de MySQL en '.env'
```
DB_HOST=localhost
DB_DATABASE=aoweb
DB_USERNAME=root
DB_PASSWORD=
```

### Próximo a desarrollar
* Documentar
* Refactorizar
* [Eliminar RequireJS](https://github.com/J-Gallo/argentumonlineweb-cliente/tree/express) - En desarrollo por [J-Gallo](https://github.com/J-Gallo)
* [Agregar Gulp](https://github.com/J-Gallo/argentumonlineweb-cliente/tree/express) - En desarrollo por [J-Gallo](https://github.com/J-Gallo)
* [Eliminar Laravel y PHP](https://github.com/J-Gallo/argentumonlineweb-cliente/tree/express) - En desarrollo por [J-Gallo](https://github.com/J-Gallo)
* [Crear nuevo FrontEnd con Express.JS](https://github.com/J-Gallo/argentumonlineweb-cliente/tree/express) - En desarrollo por [J-Gallo](https://github.com/J-Gallo)
* Agregar Service Workers

### Imágenes
<p>
  <img src="https://i.imgur.com/ydUW4EY.png" width="350"/>
  <img src="https://i.imgur.com/upC42ge.png" width="350"/>
  <img src="https://i.imgur.com/zhvh5zX.png" width="350"/>
</p>

### Desarrolladores
* [Damián Catanzaro](https://ar.linkedin.com/in/damiancatanzaro)
* [Juan Gallo](https://ar.linkedin.com/in/juangallo)

### Diseñadores
* Nicolas Castro García
* [Agustín Quetto](https://ar.linkedin.com/in/agustín-ramiro-quetto-garay-lima-87136410b)

### Agradecimientos
* [Lucas Panichella](https://ar.linkedin.com/in/lucas-panichella-bb121252) - Nuevos diseños

### Contribuir
[Argentum Online Web](http://argentumonlineweb.com/) pasa a estar desarrollado por todos!

Son libres de cargar nuevas [issues](https://github.com/dcatanzaro/argentumonlineweb-cliente/issues) y enviar sus Pull Requests.

Cada Pull Request que se haga se verá reflejada en el servidor oficial! http://argentumonlineweb.com/
