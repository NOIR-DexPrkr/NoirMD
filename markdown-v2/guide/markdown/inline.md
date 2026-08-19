---
title: Sintaxis inline
icon: text_fields
order: 7
---

# Sintaxis inline

Además del markdown clásico, NoirMD añade estilos inline propios.

## Resaltado

```md
==Este texto está resaltado==
```

==Este texto está resaltado==

## Texto de color

Se usa `%color%texto%%`:

```md
%red%texto rojo%% %green%texto verde%% %blue%texto azul%%
```

%red%texto rojo%% %green%texto verde%% %blue%texto azul%%

| Color | Ejemplo |
| --- | --- |
| `%red%` | %red%rojo%% |
| `%green%` | %green%verde%% |
| `%blue%` | %blue%azul%% |
| `%yellow%` | %yellow%amarillo%% |
| `%orange%` | %orange%naranja%% |
| `%purple%` | %purple%morado%% |
| `%cyan%` | %cyan%cian%% |
| `%pink%` | %pink%rosa%% |

## Subrayado

```md
!~subrayado~!
```

!~subrayado~!

## Spoiler

```md
!>El final de la película era un sueño<!
```

!>El final de la película era un sueño<!

> Pasa el ratón (o pulsa) sobre el texto oculto para revelarlo.

## Centrado y derecha

```md
->texto centrado<-
->texto a la derecha->
```

->texto centrado<-

->texto a la derecha->

## Iconos Material

Los iconos se insertan con el nombre entre `|[[ ]]|`:

```md
|[[favorite]]| Me gusta  |[[send]]| Enviar  |[[star]]| Destacar
```

|[[favorite]]| Me gusta  |[[send]]| Enviar  |[[star]]| Destacar

> Usa cualquier nombre de la colección [Material Symbols](https://fonts.google.com/icons). También funcionan en props como `icon` de las directivas.

## Índice de contenidos

```md
[TOC]
```

[TOC]

> El `[TOC]` genera un índice clicable con todos los títulos del documento. También existe como prop `toc` del editor.