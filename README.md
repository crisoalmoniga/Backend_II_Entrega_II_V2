# 🛒 Backend II - Entrega Final

## 🛠️ Bitácora de desarrollo

Durante esta entrega se abordaron e implementaron los siguientes puntos requeridos por la consigna:

1. **DTOs personalizados** para `User`, `Product` y `Cart`, evitando el envío de información sensible en las respuestas de la API (como en la ruta `/current`, donde se utiliza `user.public.dto.js`).

2. **Estructura DAO completa**, con soporte para persistencia en:
   - Archivos (`fs`)
   - Memoria (`memory`)
   - MongoDB (`mongo`)  
   La selección se realiza mediante la variable de entorno `PERSISTENCE`.

3. **Aplicación del patrón Repository**, separando claramente la lógica de acceso a datos en una capa `repositories`, que trabaja con sus respectivos DTOs.

4. **Middleware de autorización (`setupPolicies`)** que restringe el acceso a rutas según el rol (`USER`, `ADMIN`) utilizando cookies con JWT y la estrategia `current`.

5. **Sistema de recuperación de contraseña completo**, incluyendo:
   - Envío de mails mediante `nodemailer`
   - Generación de un token de un solo uso, válido por una hora (`resetToken.helper.js`)
   - Prevención de reutilización de la misma contraseña
   - Vistas `verify.handlebars` y `reset-password.handlebars` conectadas con la lógica del backend

6. **Modelo `Ticket`** y su uso en la lógica de compra (`purchaseCb`), verificando el stock y generando tickets solo para los productos disponibles.

7. **Archivo `.env` actualizado**, con variables necesarias para:
   - Conexión a MongoDB Atlas
   - Configuración de Gmail para mailing
   - Selección del entorno (`.env.prod`, `.env.test`)

8. **Integración con el frontend** ya existente, dejando operativas todas las funcionalidades desde navegador:
   - Registro y login de usuarios
   - Visualización y compra de productos
   - Recuperación de contraseña
   - Cierre de sesión

---

## 📦 Tecnologías utilizadas

- Node.js  
- Express  
- MongoDB Atlas + Mongoose  
- Passport.js (estrategias `local`, `jwt`, `google`)  
- JWT (JSON Web Token)  
- Handlebars  
- Cookie Parser  
- Express Session + Connect-Mongo  
- Dotenv