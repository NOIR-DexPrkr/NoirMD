---
title: Títulos y encabezados
icon: title
order: 1
---

# Títulos y encabezados

Los títulos se escriben con almohadillas `#`. Hay **seis niveles**, de `#` (mayor) a `######` (menor).

## Sintaxis

```md
# Título 1
## Título 2
### Título 3
#### Título 4
##### Título 5
###### Título 6
```

## Resultado

# Título 1
## Título 2
### Título 3
#### Título 4
##### Título 5
###### Título 6

## Notas

- Cada título genera un **ancla** automática: al pulsar sobre él se copia el enlace directo a la sección.
- El prefijo `[TOC]` (índice de contenidos) genera un índice con todos los títulos del documento (ver la página de **Sintaxis inline**).
- Los títulos pueden llevar atributos personalizados con la directiva `:::div` o envolverlos en `:::style` para darles clases o estilos propios.

## Anclas

Cualquier título se puede enlazar con su id automático:

```md
[Ir a los títulos](#títulos-y-encabezados)
```

> El id se genera a partir del texto del título, en minúsculas y con guiones.