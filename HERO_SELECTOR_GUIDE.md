# Hero Design Selector - Dynamic Switching

## ✨ Nuevas Características

Ahora puedes **cambiar entre diseños de hero dinámicamente sin editar código**. El selector aparece en la esquina inferior izquierda de la página.

---

## 🎯 Cómo Usar

### En Desarrollo

1. Abre tu página en el navegador
2. Mira la esquina inferior izquierda
3. Verás un panel "Hero Design" con dos opciones:
   - **Video** - Diseño con video de fondo (V1)
   - **Minimal** - Diseño minimalista con gradientes (V2)
4. Haz clic en cualquiera para cambiar instantáneamente
5. El cambio se guarda automáticamente en localStorage

---

## 🏗️ Cómo Funciona

### Arquitectura

```
useHeroDesign Hook
│
├─ Estado: design (v1 | v2)
├─ localStorage: Persiste selección
│
└─ Métodos:
   ├─ changeDesign(design)
   ├─ resetDesign()
   └─ isLoaded (para evitar hidratación)
```

### Flujo de Datos

```
HeroDesignSelector (UI)
        ↓ onclick
  changeDesign(newDesign)
        ↓
  useState + localStorage
        ↓
  LandingPage recibe nuevo design
        ↓
  Renderiza HeroV1 o HeroV2
```

---

## 📁 Archivos Nuevos

```
src/
├── hooks/
│   └── useHeroDesign.ts          ← Estado del diseño
├── components/
│   └── HeroDesignSelector.tsx     ← Botones de selector
└── App.tsx                         ← Usa el hook
```

---

## ⚙️ Configuración

### Ubicación del Selector

En `src/components/HeroDesignSelector.tsx`, la prop `className`:

```typescript
export const HeroDesignSelector = ({
  currentDesign,
  onDesignChange,
  className = 'fixed bottom-8 left-8 z-40',  // ← Edita aquí
}: HeroDesignSelectorProps)
```

Valores útiles:
- `'fixed bottom-8 left-8 z-40'` - Esquina inferior izquierda (default)
- `'fixed bottom-8 right-8 z-40'` - Esquina inferior derecha
- `'fixed top-8 right-8 z-40'` - Esquina superior derecha
- `'fixed top-20 left-1/2 -translate-x-1/2 z-40'` - Centrado arriba

### Personalizar Diseños

En `src/components/HeroDesignSelector.tsx`:

```typescript
const designs = [
  {
    value: 'v1',
    label: 'Video',
    description: 'Dynamic video background',  // ← Cambia esto
  },
  {
    value: 'v2',
    label: 'Minimal',
    description: 'Elegant gradient design',    // ← Cambia esto
  },
];
```

---

## 🔐 Ocultar en Producción

Si quieres que el selector **NO aparezca en producción**, hay varias opciones:

### Opción 1: Variable de Entorno (Recomendado)

1. Actualiza `src/App.tsx`:

```typescript
const LandingPage = () => {
  // ... resto del código
  const showDesignSelector = import.meta.env.DEV; // Solo en desarrollo

  return (
    <div>
      {/* Hero */}
      {design === 'v1' ? <HeroV1 {...} /> : <HeroV2 {...} />}

      {/* Mostrar selector solo en desarrollo */}
      {showDesignSelector && (
        <HeroDesignSelector currentDesign={design} onDesignChange={changeDesign} />
      )}
    </div>
  );
};
```

2. Listo. En desarrollo lo ves, en producción (`npm run build`) desaparece.

### Opción 2: Comentar la Línea

En `src/App.tsx`:

```typescript
{/* Hero Design Selector - Dev Tool */}
{/* <HeroDesignSelector currentDesign={design} onDesignChange={changeDesign} /> */}
```

### Opción 3: Crear Componente Condicional

```typescript
const HeroDesignSelectorDev = () => {
  if (!import.meta.env.DEV) return null;

  const { design, changeDesign } = useHeroDesign();
  return <HeroDesignSelector currentDesign={design} onDesignChange={changeDesign} />;
};

// En App.tsx:
<HeroDesignSelectorDev />
```

---

## 💾 Persistencia

El selector guarda tu elección en `localStorage`:

```
Key: 'hero_design_preference'
Value: 'v1' | 'v2'
```

### Borrar la Preferencia Guardada

En la consola del navegador (F12):

```javascript
localStorage.removeItem('hero_design_preference');
location.reload();
```

---

## 🎨 Estilos Personalizados

Para cambiar la apariencia del selector, edita `HeroDesignSelector.tsx`:

```typescript
{/* Panel principal */}
<div className="bg-[#0a0a0a]/95 backdrop-blur-md border border-[#C5A059]/30 rounded-lg p-4">
  {/* Cambia estos valores */}
</div>

{/* Botón activo */}
<button className="bg-[#C5A059] text-black">
  {/* Actualmente: dorado con texto negro */}
</button>

{/* Botón inactivo */}
<button className="bg-white/5 text-gray-300 hover:bg-white/10">
  {/* Actualmente: gris oscuro con hover */}
</button>
```

---

## 🧪 Testing

### Verificar que funciona

1. Abre DevTools (F12)
2. En Console, ejecuta:
   ```javascript
   localStorage.getItem('hero_design_preference')
   ```
   Deberías ver `'v1'` o `'v2'`

3. Haz clic en el selector para cambiar

4. Recarga la página (F5)

5. Verifica que se mantiene tu selección

---

## 🐛 Troubleshooting

**P: No veo el selector**
- Abre DevTools (F12) → Console
- Verifica que no haya errores
- Asegúrate de estar en development (`npm run dev`)

**P: El cambio no persiste después de recargar**
- Abre DevTools (F12) → Application → LocalStorage
- Busca `hero_design_preference`
- Si no existe, hay un problema con localStorage

**P: Quiero ocultarlo de inmediato**
- Comentar la línea en `src/App.tsx`:
  ```typescript
  {/* <HeroDesignSelector ... /> */}
  ```

---

## 🚀 Próximas Mejoras

Puedes mejorar el selector:

1. **Agregar presets de colores:**
   ```typescript
   const colorSchemes = ['dark', 'light', 'custom'];
   ```

2. **Agregar vista previa (thumbnail):**
   ```typescript
   <img src={`/preview-${design}.jpg`} />
   ```

3. **Agregar opciones de tipografía:**
   ```typescript
   const fonts = ['serif', 'sans', 'mono'];
   ```

4. **Exportar configuración:**
   ```javascript
   // Descargar JSON con selecciones
   downloadSettings()
   ```

---

## 📊 Estructura de Datos

```typescript
// useHeroDesign.ts retorna:
{
  design: 'v1' | 'v2',        // Diseño actual
  changeDesign: (design) => void,  // Cambiar diseño
  resetDesign: () => void,        // Volver a default
  isLoaded: boolean,               // Si localStorage cargó
}
```

---

## ✅ Resumen

| Característica | Estado |
|---|---|
| **Selector Visual** | ✅ Implementado |
| **Persistencia** | ✅ localStorage |
| **Cambio Instantáneo** | ✅ Sin recargar |
| **Ocultar en Producción** | ✅ Opcional |
| **Documentado** | ✅ Este archivo |

Ahora puedes experimentar con ambos diseños sin tocar código. ¡Perfecto para testing y demostración! 🎉
