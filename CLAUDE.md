# CLAUDE.md

Guía de colaboración para Claude Code en el proyecto ONCE ONCE.

## Contexto del Proyecto

- **Nombre**: ONCE ONCE
- **Stack**: React + TypeScript
- **Propósito**: pagina web con la final de adquirir clientes nuevos para experiencias de ciclismo

## Preferencias de Desarrollo

### Estilo de Código
- TypeScript estricto, tipos explícitos
- Componentes funcionales con hooks
- ESLint y formateo consistente

### Convenciones
- **Estructura de Directorios (Feature-First):** Organizar el código en `src/features/` (ej. `trips`, `booking`). Cada feature es autosuficiente con sus propios `components/`, `hooks/`, `services/` y `types.ts`.
- **Nomenclatura de Archivos React:** Usar `PascalCase` para componentes (ej. `ExperienceCard.tsx`). Lógica pura, utilidades o estilos en `kebab-case` (ej. `format-distance.ts`).
- **Nomenclatura de Hooks:** Prefijo `use` en `camelCase` (ej. `useOnceBooking.ts`).
- **Estándares de TypeScript:** Prohibido el uso de `any`. Usar `interface` para props y `type` para uniones/alias. No usar prefijo `I` (ej. `Trip`, no `ITrip`).
- **Importaciones Absolutas:** Uso obligatorio del alias `@/` (ej. `@/components/ui`). Orden de imports: React/Externos -> Alias Local -> Estilos/Types.
- **Barrel Files (Index):** Usar archivos `index.ts` en las carpetas de componentes y features para simplificar las exportaciones y evitar rutas de importación profundas.
- **Estado y Fetching:** **Zustand** para estado global (ligero) y **TanStack Query** para lógica de servidor, caché y estados de carga de experiencias de ciclismo.
- **Componentes Atómicos:** Separar la lógica de negocio de la UI. Los componentes de `src/components/ui/` deben ser "puros" y controlados únicamente por props.
- **Constantes y Enums:** Valores fijos en `UPPER_SNAKE_CASE` (ej. `const MAX_BIKE_RENTALS = 11;`) centralizados en `src/config/`.
- **Estilos y UI:** Tailwind CSS como base. Uso de la utilidad `cn()` (`clsx` + `tailwind-merge`) para clases condicionales limpias y performantes.

## Instrucciones para Claude

### Antes de hacer cambios
1. Lee el código existente para entender patrones y convenciones.
2. Consulta si no está claro cuál es el enfoque preferido.
3. **Validación de Tipos:** Garantizar tipos de TS explícitos y correctos antes de proponer código.
4. **Accesibilidad (A11y):** Asegurar que CTAs y formularios de reserva cumplan con normas WCAG para maximizar la conversión.
5. **Rendimiento:** Priorizar el uso de `useMemo` y `useCallback` solo en cálculos pesados o para evitar re-renders innecesarios en componentes críticos de la UI.

### En caso de dudas
- Pregunta en lugar de asumir.
- Enfatiza la claridad sobre la brevedad cuando sea importante.

---

*Este documento se actualiza según sea necesario para reflejar las preferencias del equipo.*