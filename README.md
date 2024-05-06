# CliniCare  :hospital:

CliniCare es una aplicación diseñada para facilitar la gestión de la clínica, ofreciendo una solución para la programación de citas, seguimiento de pacientes/usuarios y acceso a información médica.

### ➡️ Obtención de datos mediante petición a Back-End [CliniCare-App](https://github.com/karloteke/CliniCare-App)

## Funcionalidades Front-End

### Zona pública (Usuarios no registrados)

1. **Registro de usuarios**: Los usuarios pueden registrarse proporcionando el nombre de usuario, email y contraseña.
2. **Inicio de sesión**: Los usuarios pueden iniciar sesión en la aplicación utilizando sus credenciales registradas (Nombre de usuario y contraseña).

### Zona Privada (Usuarios registrados con Rol de usuario)

1. **Creación de pacientes**: Los usuarios pueden crear nuevos perfiles de pacientes ingresando su nombre, apellido, dirección, DNI y teléfono.
2. **Creación de citas**: Los usuarios pueden crear citas con los siguientes campos: área, nombre del médico, fecha, hora, urgencia y DNI del paciente al que se asocia la cita.
3. **Consulta de citas**: Los usuarios pueden ver sus citas buscándolas por su DNI.

### Zona Privada (Usuarios registrados con Rol de administrador)

1. **Gestión de Pacientes**: Los administradores pueden listar, crear y eliminar pacientes.
2. **Gestión de Citas**: Los administradores pueden listar, crear y eliminar citas programadas.
3. **Gestión de Usuarios**: Los administradores pueden listar todos los usuarios registrados, crear y eliminar cuentas de usuarios.
4. **Gestión del Historial Médico**: Los administradores pueden listar, crear y eliminar el historial médico de los pacientes.

### Otras Funcionalidades

1. **Mensaje de Bienvenida (Home)**: Después del inicio de sesión, los usuarios son recibidos con un mensaje de bienvenida a la clínica, junto con una gráfica que muestra el total de citas registradas.
2. **Implementación de Buscador**: Se incluye un buscador que permite a los usuarios buscar citas por el DNI del paciente.

<br>

### Configuración del proyecto

```sh
npm install
```

### Compilar y lanzar web

```sh
npm run dev
```

### Compilar para Producción

```sh
npm run build
```

# Instrucciones de ejecución en un contenedor Docker

### Descarga la imagen del contenedor desde Docker Hub
  ```sh 
  docker pull carlota36/clinicare-vue:1.0
  ```
### Ejecuta el contenedor
  ```sh
  docker run -d -p 8082:80 carlota36/clinicare-vue:1.0
  ```

