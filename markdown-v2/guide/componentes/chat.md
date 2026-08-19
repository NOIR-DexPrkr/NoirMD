---
title: Chat
icon: chat_bubble
order: 9
---

# Chat

La directiva `:::chat` muestra **burbujas de conversación** (`:::chat-item`) estilo app de mensajería.

## Sintaxis

```md
:::chat
:::chat-item {side="start" name="Ana" time="10:04"}
Hola, ¿terminaste la documentación?
:::
:::chat-item {side="end" name="Tú" time="10:05"}
¡Sí! La guía renderiza hasta directivas dentro del chat.
:::
:::chat-item {side="start" name="Ana" time="10:06"}
Increíble. El motor escribe solo.
:::
:::
```

:::chat
:::chat-item {side="start" name="Ana" time="10:04"}
Hola, ¿terminaste la documentación?
:::
:::chat-item {side="end" name="Tú" time="10:05"}
¡Sí! La guía renderiza hasta directivas dentro del chat.
:::
:::chat-item {side="start" name="Ana" time="10:06"}
Increíble. El motor escribe solo.
:::
:::

## Con avatar y color

```md
:::chat
:::chat-item {side="start" name="Soporte" time="11:00" avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" color="info" footer="Atendido"}
¿En qué podemos ayudarte?
:::
:::chat-item {side="end" name="Tú" time="11:02" color="secondary" footer="Enviado"}
¿Cómo añado un avatar personalizado?
:::
:::
```

:::chat
:::chat-item {side="start" name="Soporte" time="11:00" avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" color="info" footer="Atendido"}
¿En qué podemos ayudarte?
:::
:::chat-item {side="end" name="Tú" time="11:02" color="secondary" footer="Enviado"}
¿Cómo añado un avatar personalizado?
:::
:::

## Props

### `:::chat-item`

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `side` | `start` \| `end` | Burbuja a la izquierda o derecha (default `start`) |
| `name` | texto | Nombre del autor |
| `time` | texto | Hora mostrada bajo el nombre |
| `avatar` | URL | Imagen del avatar |
| `color` | `neutral` \| `primary` \| `secondary` \| `accent` \| `info` \| `success` \| `warning` \| `error` | Color de la burbuja |
| `footer` | texto | Pie del mensaje |
| `class` | texto | Clases CSS adicionales |
| `style` | CSS | Estilos inline |

## Notas

- El contenido de cada `chat-item` admite **markdown completo** (código, tablas, enlaces...).
- Puedes poner varios `:::chat` en el documento; cada uno es un grupo independiente.