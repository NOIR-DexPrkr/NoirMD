---
title: Énfasis, código y enlaces
icon: format_bold
order: 2
---

# Énfasis, código y enlaces

## Énfasis básico

| Sintaxis | Resultado |
| --- | --- |
| `**negrita**` | **negrita** |
| `*cursiva*` o `_cursiva_` | *cursiva* |
| `~~tachado~~` | ~~tachado~~ |
| `***negrita y cursiva***` | ***negrita y cursiva*** |

## Código inline

El código en línea se escribe entre comillas invertidas:

```md
Usa la función `renderMarkdownString()` para renderizar.
```

Usa la función `renderMarkdownString()` para renderizar.

## Enlaces

### Externos

```md
[Ir a la documentación](https://example.com)
```

[Ir a la documentación](https://example.com)

### Anclas internas

```md
[Volver al inicio](#introducción-a-noirmd)
```

[Volver al inicio](#introducción-a-noirmd)

### Enlace con título

```md
[Pasa el ratón aquí](https://example.com "Título del enlace")
```

[Pasa el ratón aquí](https://example.com "Título del enlace")

## Párrafos y saltos de línea

- Un salto de línea simple **no** separa párrafos; se necesita una línea en blanco.
- Para un salto de línea forzado, termina la línea con dos espacios o usa `\`.

```md
Primer párrafo.

Segundo párrafo con salto forzado  
y esta línea debajo.
```

> Los párrafos vacíos entre bloques se eliminan automáticamente para no dejar huecos.