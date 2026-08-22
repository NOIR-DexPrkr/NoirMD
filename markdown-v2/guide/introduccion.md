---
title: Introducción
icon: menu_book
order: 1
---

# Introducción a NoirMD

**NoirMD** es un editor y motor de renderizado Markdown con extensiones propias: **admoniciones**, **componentes**, **directivas interactivas** y **markdown enriquecido**.

Esta guía está escrita con el propio motor: cada directiva que ves aquí es una muestra **viva** y funcional, no una captura.

## Cómo usar el editor

| Elemento | Descripción |
| --- | --- |
| Toolbar superior | Modo (editor / split / preview), guardar, copiar, imprimir, tema, guía y configurar |
| Panel izquierdo | Editor de código con resaltado de sintaxis |
| Panel derecho | Preview en vivo (en modo split o preview) |
| Atajo | `Ctrl+S` guarda el contenido |

## Sintaxis de una directiva

Las directivas se escriben con tres dos puntos `:::` y un nombre, opcionalmente con atributos entre llaves:

```
:::card {title="Mi tarjeta" icon="star"}

Contenido **markdown** aquí dentro.

:::
```

Todo lo que está entre la apertura y el cierre `:::` se renderiza con el mismo motor, así que puedes **anidar** directivas.

## Cheatsheet rápido

| Sintaxis | Resultado |
| --- | --- |
| `# Título` → `###### Título` | Encabezados |
| `**negrita**` · `*cursiva*` · `~~tachado~~` | Énfasis |
| `` `código` `` | Código inline |
| `` ```js `` | Bloque de código con resaltado |
| `[texto](url)` | Enlace |
| `![alt](url)` | Imagen |
| `![alt](url#left)` | Imagen flotante a la izquierda |
| `==resaltado==` | Resaltado |
| `%color%texto%%` | Texto de color |
| `->centrado<-` | Texto centrado |
| `!>spoiler<!` | Spoiler oculto |
| `|[[icono]]|` | Icono Material |
| `[TOC]` | Índice de contenidos |
| `:::note` `:::warning` `:::danger` `:::info` `:::greentext` | Admoniciones |
| `:::card` `:::accordion` `:::carousel` `:::diff` `:::chat` `:::stat` `:::countdown` `:::keys` `:::hover-3d` `:::hover-gallery` `:::richlist` | Componentes |
| `:::details` `:::modal` `:::button` `:::slide` | Interactivos |
| `<style>` HTML inline | Bloques HTML (CSS global, HTML crudo) |

## Organización de la guía

- **Markdown** — sintaxis base y enriquecida (títulos, énfasis, tablas, código, imágenes, inline).
- **Admoniciones** — cajas de aviso: nota, warning, danger, info y greentext.
- **Componentes** — los 10 componentes de tarjeta, teclas, acordeón, carrusel, etc.
- **Interactivos** — details, modal, botones y slides.
- **Layout** — bloques HTML crudo: CSS global con `<style>` e HTML inline.

Cada página incluye: la sintaxis exacta, la tabla de props, un ejemplo en vivo y el código fuente para copiar.