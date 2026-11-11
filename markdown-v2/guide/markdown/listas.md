---
title: Listas
icon: format_list_bulleted
order: 3
---

# Listas

## Lista desordenada

```md
- Elemento uno
- Elemento dos
- Elemento tres
```

- Elemento uno
- Elemento dos
- Elemento tres

## Lista ordenada

```md
1. Primer paso
2. Segundo paso
3. Tercer paso
```

1. Primer paso
2. Segundo paso
3. Tercer paso

## Listas anidadas

```md
- Frutas
  - Manzana
  - Pera
- Verduras
  1. Zanahoria
  2. Calabacín
- Legumbres
```

- Frutas
  - Manzana
  - Pera
- Verduras
  1. Zanahoria
  2. Calabacín
- Legumbres

## Listas mixtas

```md
- Paso uno: preparar
  1. Cortar
  2. Pelar
- Paso dos: cocinar
  - Hervir
  - Saltear
```

- Paso uno: preparar
  1. Cortar
  2. Pelar
- Paso dos: cocinar
  - Hervir
  - Saltear

## Listas consecutivas (desordenadas y ordenadas)

```md
- Elemento desordenado 1
- Elemento desordenado 2
1. Primer paso numerado
2. Segundo paso numerado
```

- Elemento desordenado 1
- Elemento desordenado 2
1. Primer paso numerado
2. Segundo paso numerado

## Tareas (Task lists)

```md
- [ ] Tarea pendiente
- [x] Tarea completada
```

- [ ] Tarea pendiente
- [x] Tarea completada

## Notas

- La anidación soporta indentación con 2, 3 o 4 espacios (o tabuladores).
- Las listas consecutivas con diferente tipo de marcador (como `-` seguido de `1.`) se separan automáticamente en bloques `<ul>` y `<ol>` propios con su estilo y numeración independiente.
- Los elementos de lista admiten todo el markdown: `**negrita**`, `[enlaces](#listas)`, código `` `inline` `` e incluso admoniciones y directivas anidadas.
- Si un elemento contiene un párrafo completo, añade una línea en blanco dentro del elemento.