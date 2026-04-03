# Security Setup Guide - ONCE ONCE

Este documento contiene instrucciones para configurar las medidas de seguridad implementadas en el proyecto.

## 1. reCAPTCHA v3 Configuration

reCAPTCHA v3 protege tus formularios contra spam y bots automáticos sin requerir que el usuario haga clic en nada.

### Pasos de Configuración:

1. **Crear una cuenta de Google reCAPTCHA:**
   - Ve a https://www.google.com/recaptcha/admin
   - Haz clic en "Create" o "+" para un nuevo sitio
   - Completa la información:
     - **Label:** "ONCE ONCE Website"
     - **reCAPTCHA type:** Selecciona "reCAPTCHA v3"
     - **Domains:** Agrega tu dominio (ej: `onceonce.com` o `localhost:3000` para desarrollo)

2. **Obtener las claves:**
   - Después de crear el sitio, verás dos claves:
     - **Site Key:** La clave pública (la que usarás en el cliente)
     - **Secret Key:** La clave privada (para usar en backend si lo necesitas)

3. **Configurar la clave en el proyecto:**
   - Copia la **Site Key**
   - Abre tu archivo `.env` (o crea uno basado en `.env.example`)
   - Agrega: `VITE_RECAPTCHA_SITE_KEY=tu_site_key_aqui`

4. **Ejemplo de archivo `.env`:**
   ```
   VITE_EMAILJS_SERVICE_ID=service_xxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxx
   VITE_EMAILJS_PUBLIC_KEY=public_key_xxx
   VITE_WHATSAPP_NUMBER=+526241234567
   VITE_RECAPTCHA_SITE_KEY=6LdxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxA
   ```

### Cómo Funciona:

- Cuando se carga la página, reCAPTCHA v3 corre en segundo plano
- Genera un "score" (0.0 a 1.0) indicando qué tan probable es que sea un humano
- El token se incluye automáticamente en cada envío de formulario
- **Nota:** Por ahora, el token se genera pero NO se valida en el servidor. Para máxima seguridad, deberías validarlo en un backend.

---

## 2. Rate Limiting

Rate limiting previene que un usuario envíe demasiados formularios en un período corto, protegiendo contra spam.

### Configuración Actual:

- **Máximo de envíos:** 5 formularios
- **Ventana de tiempo:** 1 hora (3,600,000 ms)
- **Almacenamiento:** localStorage (dispositivo local del usuario)

### Cómo Funciona:

1. Cada envío exitoso se registra en `localStorage`
2. Si el usuario intenta enviar más de 5 veces en 1 hora, obtiene el error:
   ```
   "Too many submissions. Please try again in X minutes."
   ```
3. Después de 1 hora sin nuevos envíos, el contador se resetea automáticamente

### Personalizar Límites:

Si quieres cambiar los límites, abre `src/hooks/useRateLimit.ts` y modifica:

```typescript
const MAX_SUBMISSIONS = 5;        // Cambia a tu número deseado
const WINDOW_MS = 3600000;        // 1 hora en milisegundos
```

### Limitaciones:

⚠️ **Importante:** Este rate limiting funciona **solo en el cliente** (localStorage).

- Un usuario técnico puede borrarlo desde DevTools
- Para máxima seguridad, deberías implementar rate limiting en el **backend** también
- El backend puede:
  - Rastrear por IP address
  - Rastrear por email
  - Aplicar límites más estrictos

---

## 3. Validación de Formularios

Los formularios validan datos antes de enviar usando `zod`:

```typescript
- Nombre: 2-100 caracteres, solo letras/espacios/guiones/apóstrofes
- Email: Formato válido de email, máx 255 caracteres
- Mensaje: 10-5000 caracteres
```

---

## 4. Recomendaciones Adicionales

### Para Máxima Seguridad en Producción:

1. **Backend Validation:**
   - Nunca confíes solo en validación del cliente
   - Valida ALL inputs en el servidor también

2. **Verify reCAPTCHA Tokens:**
   - Implementa endpoint backend que verifique tokens con Google
   - Rechaza si el score es demasiado bajo (< 0.5)

3. **Backend Rate Limiting:**
   ```typescript
   // Ejemplo con Express + redis
   const rateLimit = require('express-rate-limit');
   const limiter = rateLimit({
     windowMs: 60 * 60 * 1000,  // 1 hora
     max: 5                      // máx 5 requests
   });
   app.post('/api/contact', limiter, handler);
   ```

4. **Email Verification:**
   - Verifica que el email existe antes de guardar
   - Considera Double Opt-In (envía email de confirmación)

5. **Data Persistence:**
   - Guarda los envíos en base de datos para auditoría
   - Monitorea patrones de spam

6. **CORS Configuration:**
   - Configura CORS en tu backend para aceptar solo tu dominio
   - Previene requests desde sitios externos

---

## 5. Testing

### Probar reCAPTCHA en Desarrollo:

```bash
# Asegúrate que .env tiene:
VITE_RECAPTCHA_SITE_KEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
```

Este es el "testing" site key de Google, siempre devuelve score 0.9.

### Probar Rate Limiting:

1. Abre DevTools (F12)
2. Ve a Console
3. Ejecuta:
   ```javascript
   localStorage.removeItem('form_submission_timestamps');
   ```
4. Esto resetea el contador para testing

---

## 6. Monitoreo

### Logs de Error:

El código registra errores en console con prefijos claros:
- `[FORM_ERROR]` - Configuración faltante
- `[FORM_SUBMISSION_ERROR]` - Error durante envío
- `[RATE_LIMIT_ERROR]` - Error en localStorage

### Recomendado para Producción:

Implementa Sentry o similar:

```typescript
import * as Sentry from "@sentry/react";

Sentry.captureException(error);
```

---

## Resumen de Cambios de Seguridad

| Medida | Ubicación | Estado |
|--------|-----------|--------|
| Validación Zod | `src/config/validation.ts` | ✅ Implementado |
| Rate Limiting | `src/hooks/useRateLimit.ts` | ✅ Implementado |
| reCAPTCHA v3 | `src/App.tsx` + `.env` | ✅ Implementado |
| Remover API Keys | `vite.config.ts` | ✅ Completado |
| Mover WhatsApp a .env | `src/config/contact.ts` | ✅ Completado |
| Error Logging | `src/App.tsx`, `ExperiencePage.tsx` | ✅ Implementado |

---

## Preguntas Frecuentes

**P: ¿Es necesario tener backend?**
R: No para funcionalidad básica, pero sí para máxima seguridad.

**P: ¿Qué pasa si alguien disables reCAPTCHA?**
R: El rate limiting del cliente y validación de formularios aún protegen.

**P: ¿Dónde veo los datos de spam?**
R: Actualmente se envían a EmailJS. Considera guardar en base de datos también.

**P: ¿El rate limiting persiste entre sesiones?**
R: Sí, mientras no borren localStorage (válido por 1 hora).

---

Para más información sobre reCAPTCHA v3:
https://developers.google.com/recaptcha/docs/v3
