# Hero Design Configuration Guide

## Cambiar entre Diseños de Hero

El sitio tiene **2 diseños diferentes de hero** que puedes seleccionar cambiando una simple variable.

### 📂 Ubicación de la Configuración

Archivo: `src/config/heroDesign.ts`

```typescript
export const HERO_DESIGN = 'v1' as const;
```

## 🎨 Diseños Disponibles

### **V1: Video Background (Actual)**

- **Archivo:** `src/components/HeroV1.tsx`
- **Características:**
  - Fondo de video en movimiento
  - Overlay oscuro ajustable
  - Animación simple fade-in
  - Diseño clásico y profesional
  - Ideal para: Contenido dinámico, video marketing

**Cambiar a V1:**
```typescript
export const HERO_DESIGN = 'v1' as const;
```

---

### **V2: Minimal Gradient Design**

- **Archivo:** `src/components/HeroV2.tsx`
- **Características:**
  - Fondo estático con imagen semi-transparente
  - Gradientes decorativos sutiles (glows)
  - Animaciones escalonadas (staggered)
  - Líneas decorativas alrededor del tagline
  - Indicador de scroll animado
  - Botón CTA con efecto hover mejorado
  - Diseño moderno y minimalista

**Cambiar a V2:**
```typescript
export const HERO_DESIGN = 'v2' as const;
```

---

## 🚀 Cómo Cambiar

### Opción 1: Editar el archivo directamente

1. Abre `src/config/heroDesign.ts`
2. Cambia el valor:
   ```typescript
   // Cambiar de esto:
   export const HERO_DESIGN = 'v1' as const;

   // A esto:
   export const HERO_DESIGN = 'v2' as const;
   ```
3. Guarda el archivo
4. El navegador se refrescará automáticamente (HMR)

### Opción 2: Buscar y reemplazar

En tu editor:
- Ctrl+H (Windows/Linux) o Cmd+H (Mac)
- Busca: `HERO_DESIGN = 'v1'`
- Reemplaza con: `HERO_DESIGN = 'v2'`

---

## 📊 Comparación Visual

| Característica | V1 | V2 |
|---|---|---|
| **Fondo** | Video en movimiento | Imagen estática |
| **Overlay** | Opaco simple | Gradiente suave |
| **Animaciones** | Fade-in simple | Staggered elegantes |
| **Decoraciones** | Ninguna | Glows, líneas doradas |
| **Botón CTA** | Simple | Con borde y hover |
| **Scroll Indicator** | No | Sí |
| **Performance** | Video (más peso) | Imagen (más ligero) |
| **Mejor para** | Contenido dinámico | Diseño minimalista |

---

## 🔧 Personalización

### Cambiar Colores en V2

En `src/components/HeroV2.tsx`:

```typescript
{/* Dorado principal */}
<div className="absolute top-0 left-0 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl ..." />

// Cambiar #C5A059 a tu color favorito
```

### Cambiar Timing de Animaciones

En `src/components/HeroV2.tsx`:

```typescript
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.1 }}  // ← Edita estos valores
>
```

- `duration`: Cuánto tiempo tarda la animación (segundos)
- `delay`: Cuánto espera antes de empezar (segundos)

---

## 🎬 Efectos de Cada Diseño

### V1 - Video Background
```
Carga: HERO (Video de fondo)
       ↓
Render: Video + Overlay + Texto (fade-in simple)
       ↓
Resultado: Dinámico, llamativo
```

### V2 - Minimal Gradient
```
Carga: HERO (Imagen + Gradientes)
       ↓
Render: Imagen (zoom-out) + Glows + Texto (staggered) + Scroll indicator
       ↓
Resultado: Elegante, minimalista, performante
```

---

## 📱 Responsividad

Ambos diseños están optimizados para:
- ✅ Mobile (pequeñas pantallas)
- ✅ Tablet (medianas)
- ✅ Desktop (grandes pantallas)
- ✅ Ultra-wide (>2560px)

---

## ⚡ Performance

### V1 (Video)
- Tamaño: Depende del video
- Requiere: Soporte de video HTML5
- Ventaja: Contenido dinámico

### V2 (Imagen)
- Tamaño: Menor (solo imagen)
- Requiere: Menos recursos
- Ventaja: Carga más rápida

---

## 🐛 Troubleshooting

**P: Cambié el HERO_DESIGN pero no veo cambios**
- Abre DevTools (F12) y borra la caché: Ctrl+Shift+Delete
- O recarga la página: Ctrl+F5

**P: El video no carga en V1**
- Verifica que `assets.hero.video` existe
- Abre la consola (F12) para ver errores

**P: Las animaciones en V2 son muy rápidas/lentas**
- Edita los valores `duration` y `delay` en HeroV2.tsx

**P: Quiero mezclar elementos de ambos diseños**
- Crea un nuevo archivo `HeroV3.tsx` combinando lo que necesites
- Actualiza `heroDesign.ts` para incluir `'v3'`

---

## 🎯 Recomendaciones

- **Para E-commerce/Entretenimiento:** Usa V1 (video dinámico)
- **Para Servicios Premium/Consultoría:** Usa V2 (elegante y minimalista)
- **Para Blog/Educación:** Usa V2 (carga más rápido)

---

## Archivos Relacionados

- `src/config/heroDesign.ts` - Configuración
- `src/components/HeroV1.tsx` - Diseño V1
- `src/components/HeroV2.tsx` - Diseño V2
- `src/App.tsx` - Renderizado condicional (líneas 166-177)

---

¡Disfruta experimentando con los diseños! 🚀
