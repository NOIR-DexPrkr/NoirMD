import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import NReditor from '../react/NReditor';

const SAMPLE = `![For You Cover](https://imgur.com/amlxbsn.png#center){450px:450px}
# -> %#db1151%Tatsuro Yamashita%% - %#292f78%Noir Room%% <-

:::info
## -> |[info]| Importante leer<-
->Para poder descargar todos estos álbumes necesitas primero [FDM o Free Download Manager](https://cnrxd.com/tutos/downloaders#FDM).<-
->Es ==esencial== para que los enlaces \`magnet\` funcionen correctamente. ¡No te saltes este paso!<-
:::

## -> %#db1151%Disco%%%#292f78%grafía%% %#db1151%Comp%%%#292f78%leta%%<-

---

<div style="display: flex; justify-content: center; flex-wrap: wrap">

:::card-m {title="Circus Town (2002 Remaster Edition - 1976)" image="https://i.discogs.com/g2CUGZzJsRel0Im2PysSZr-m_L_CTGFBtt4WdbdWsrQ/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTY0NzU5/MTYtMTYzMDQ2NTc4/MC0zNzY2LmpwZWc.jpeg" icon="album" align="center"}
#description
**Título:** Circus Town   
**Edición:** 2002 Remaster Edition   
**Año:** 1976
#content
**Título:** Circus Town   
**Edición:** 2002 Remaster Edition   
**Año:** 1976   

:::button {icon="download"}
  [Descargar con FDM](magnet:?xt=urn:btih:ca80c000d0e21656b7682091020aaf55a4c6652f&dn=Tatsuro%20Yamashita%20%28山下達郎%29%20-%20Circus%20Town%20%282002%20Remaster%20Edition%29%20%5B1976%5D&tr=http%3A%2F%2Fnyaa.tracker.wf%3A7777%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce)
:::
:::

:::card-m {title="Spacy (2002 Remaster Edition - 1977)" image="https://i.discogs.com/Crefyh6iJ7ssM6uSdfEtxkulGkuEx-qLTNzkHhb8yaQ/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI2ODQ5/MDI0LTE2ODIxOTk1/MjQtNTM3Ni5qcGVn.jpeg" icon="album"}
#description
**Título:** Spacy   
**Edición:** 2002 Remaster Edition   
**Año:** 1977
#content
**Título:** Spacy   
**Edición:** 2002 Remaster Edition   
**Año:** 1977   
:::button {icon="download"}
  [Descargar con FDM](magnet:?xt=urn:btih:b3a47d3684dc55796c4393ad1fd7e1640fda6247&dn=Tatsuro%20Yamashita%20%28山下達郎%29%20-%20Spacy%20%282002%20Remaster%20Edition%29%20%5B1977%5D&tr=http%3A%2F%2Fnyaa.tracker.wf%3A7777%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce)
:::
:::

:::card-m {title="Up Ahead! (2002 Remaster Edition - 1978)" image="https://i.discogs.com/R_POfN7NflUKumG1D9tAX2rrbAEmUopF9-YCcXw9Iv8/rs:fill/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIyMjAy/MTctMTU5NjM5MDk2/MS05MTA1LmpwZWc.jpeg" icon="album"}
#description
**Título:** Up Ahead!    
**Edición:** 2002 Remaster Edition    
**Año:** 1978
#content
**Título:** Up Ahead!    
**Edición:** 2002 Remaster Edition    
**Año:** 1978    
:::button {icon="download"}
  [Descargar con FDM](magnet:?xt=urn:btih:2004e1c933f77589fefa85d7463d3f4d5721afdf&dn=Tatsuro%20Yamashita%20%28山下達郎%29%20–%20Up%20Ahead%21%20%282002%20Remaster%20Edition%29%20%5B1978%5D&tr=http%3A%2F%2Fnyaa.tracker.wf%3A7777%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce)
:::
:::

:::card-m {title="It" image="https://i.discogs.com/Sq8uDwd-q8D8sYo7AtKAx-DO9ITs37P9odBxll7NV_c/rs:fit/g:sm/q:90/h:600/w:599/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEzODEz/MTIzLTE1NjE2ODM1/NjMtNTMxNi5qcGVn.jpeg"}
#description
**Título:** It's a Poppin' Time    
**Edición:** 2002 Remaster Edition (2 CDs)    
**Año:** 1978
#content
**Título:** It's a Poppin' Time    
**Edición:** 2002 Remaster Edition (2 CDs)    
**Año:** 1978    
:::button {icon="download"}
  [Descargar con FDM](magnet:?xt=urn:btih:5599d47ce78000ea36597700df1e9e11c0ec1873&dn=Tatsuro%20Yamashita%20%28山下達郎%29%20–%20It%27s%20a%20Poppin%27%20Time%20%282002%20Remaster%20Edition%20-%202%20CDs%29&tr=http%3A%2F%2Fnyaa.tracker.wf%3A7777%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce)
:::
:::

:::card-m {title="Moonglow (2002 Remaster Edition - 1979)" image="https://i.discogs.com/Jv3dP0EzY_2x11SlfoCE7vmbtVaqxD64R2IEfO1EMI0/rs:fit/g:sm/q:90/h:516/w:511/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE5NTAy/MjYzLTE2MzE1NDY3/MzMtNTE3OS5qcGVn.jpeg" icon="album"}
#description
**Título:** Moonglow    
**Edición:** 2002 Remaster Edition    
**Año:** 1979
#content
**Título:** Moonglow    
**Edición:** 2002 Remaster Edition    
**Año:** 1979    
:::button {icon="download"}
  [Descargar con FDM](magnet:?xt=urn:btih:ae67f6f5bd71e1d1b6213e8197d9ad20995cb737&dn=Tatsuro%20Yamashita%20%28山下達郎%29%20-%20Moonglow%20%282002%20Remaster%20Edition%29%20%5B1979%5D&tr=http%3A%2F%2Fnyaa.tracker.wf%3A7777%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce)
:::
:::

:::card-m {title="Ride On Time (2002 Remaster Edition - 1980)" image="https://upload.wikimedia.org/wikipedia/en/0/02/Rideontime_tatsyamashita.jpg" icon="album"}
#description
**Título:** Ride On Time    
**Edición:** 2002 Remaster Edition    
**Año:** 1980
#content
**Título:** Ride On Time    
**Edición:** 2002 Remaster Edition    
**Año:** 1980    
:::button {icon="download"}
  [Descargar con FDM](magnet:?xt=urn:btih:a4c7c29b4abb685d102aa3634c2ffbcc507b0fd3&dn=Tatsuro%20Yamashita%20%28山下達郎%29%20-%20Ride%20On%20Time%20%282002%20Remaster%20Edition%29%20%5B1980%5D&tr=http%3A%2F%2Fnyaa.tracker.wf%3A7777%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce)
:::
:::

:::card-m {title="For You (2002 Remaster Edition - 1982)" image="https://upload.wikimedia.org/wikipedia/en/d/de/For_You_%28album_cover%29.png" icon="album"}
#description
**Título:** For You    
**Edición:** 2002 Remaster Edition    
**Año:** 1982
#content
**Título:** For You    
**Edición:** 2002 Remaster Edition    
**Año:** 1982    
:::button {icon="download"}
  [Descargar con FDM](magnet:?xt=urn:btih:03544ef8fa4d6de1260fb10587fe218a5b28ad33&dn=Tatsuro%20Yamashita%20%28山下達郎%29%20-%20For%20You%20%282002%20Remaster%20Edition%29%20%5B1982%5D&tr=http%3A%2F%2Fnyaa.tracker.wf%3A7777%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce)
:::
:::

:::card-m {title="Melodies (1983)" image="https://upload.wikimedia.org/wikipedia/en/5/53/Melodies_tatsroyamashita.jpg" icon="album"}
#description
**Título:** Melodies    
**Edición:** Original     
**Año:** 1983
#content
**Título:** Melodies    
**Edición:** Original     
**Año:** 1983    
:::button {icon="download"}
  [Descargar con FDM](magnet:?xt=urn:btih:026ff64ad610e9e5dc776d37097b97d48109f0bf&dn=Tatsuro%20Yamashita%20%28山下達郎%29%20-%20Melodies%20%281983%29&tr=http%3A%2F%2Fnyaa.tracker.wf%3A7777%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce)
:::
:::

:::card-m {title="Big Wave (30th Anniversary Edition - 1984)" image="https://upload.wikimedia.org/wikipedia/en/5/50/BigWaveTS.jpg" icon="album"}
#description
**Título:** Big Wave    
**Edición:** 30th Anniversary Edition    
**Año:** 1984
#content
**Título:** Big Wave    
**Edición:** 30th Anniversary Edition    
**Año:** 1984    
:::button {icon="download"}
  [Descargar con FDM](magnet:?xt=urn:btih:e7eca6a75cab5dbf91bfcbeb976a1f07230d0cc0&dn=山下達郎%20-%20Big%20Wave%20%2830th%20Anniversary%20Edition%29%2FTatsuro%20Yamashita%20-%20Big%20Wave%20%2830th%20Anniversary%20Edition%29%28320K%2FMP3%2FRAR%29%282014.07.23%29&tr=http%3A%2F%2Fnyaa.tracker.wf%3A7777%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce)
:::
:::

:::card-m {title="Pocket Music (1986)" image="https://i.discogs.com/xmZOW9xlL5qS3bOmFepMHF-aGVLIJPqAkGmfZ5dRXvs/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEzMDU1/NzMxLTE1NDcyNjgy/NjUtNTAyNS5qcGVn.jpeg" icon="album"}
#description
**Título:** Pocket Music    
**Edición:** Original     
**Año:** 1986
#content
**Título:** Pocket Music    
**Edición:** Original     
**Año:** 1986    
:::button {icon="download"}
  [Descargar con FDM](magnet:?xt=urn:btih:5a63aa4f43150407ebe6b323ad8dbf7fe2b3347b&dn=Tatsuro%20Yamashita%20%28山下達郎%29%20–%20Pocket%20Music%20%281986%29&tr=http%3A%2F%2Fnyaa.tracker.wf%3A7777%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce)
:::
:::

:::card-m {title="Joy: Live (2 CDs - 1989)" image="https://i.discogs.com/tL1xGhXqKbkv_axCzZVItvIJ7Wh-UaE0lk_jx_Zo9Yc/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTk5ODU0/OTMtMTYzMDMzNTA1/NC02MTkwLmpwZWc.jpeg" icon="album"}
#description
**Título:** Joy: Live    
**Edición:** 2 CDs    
**Año:** 1989
#content
**Título:** Joy: Live    
**Edición:** 2 CDs    
**Año:** 1989    
:::button {icon="download"}
  [Descargar con FDM](magnet:?xt=urn:btih:05b525549cd21fbad02487699fc6993825f32f6a&dn=Tatsuro%20Yamashita%20%28山下達郎%29%20-%20Joy%3A%20Tatsuro%20Yamashita%20Live%20%282%20CDs%29%20%5B1989%5D&tr=http%3A%2F%2Fnyaa.tracker.wf%3A7777%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce)
:::
:::

:::card-m {title="Boku no Naka no Shounen (1988)" image="https://i.discogs.com/vCbXZqRYZUsWaDoPjwVmyfKVMU2B9bdU8w3ga-0lFgk/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTY0ODA5/MDMtMTYxMzEzNzk1/NC03NjQ2LmpwZWc.jpeg" icon="album"}
#description
**Título:** Boku no Naka no Shounen    
**Edición:** Original     
**Año:** 1988
#content
**Título:** Boku no Naka no Shounen    
**Edición:** Original     
**Año:** 1988    
:::button {icon="download"}
  [Descargar con FDM](magnet:?xt=urn:btih:bf6b58246b24effdf0a73c916084b9639a041ea7&dn=Tatsuro%20Yamashita%20%28山下達郎%29%20–%20Boku%20no%20Naka%20no%20Shounen%20%281988%29&tr=http%3A%2F%2Fnyaa.tracker.wf%3A7777%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce)
:::
:::

:::card-m {title="Cozy (1998)" image="https://i.discogs.com/4NvpZO9YRG9HHFMW7BsM7oIrR5Ex-uP2otXdsExwnSI/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTYzNzc5/MjUtMTYzNTk2OTY3/NS0xMDQ2LmpwZWc.jpeg" icon="album"}
#description
**Título:** Cozy    
**Edición:** Original     
**Año:** 1998
#content
**Título:** Cozy    
**Edición:** Original     
**Año:** 1998    
:::button {icon="download"}
  [Descargar con FDM](magnet:?xt=urn:btih:d5db8df9ef0c846c9ce022ef3012f04d59b672b4&dn=Tatsuro%20Yamashita%20%28山下達郎%29%20–%20Cozy%20%281998%29&tr=http%3A%2F%2Fnyaa.tracker.wf%3A7777%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce)
:::
:::

:::card-m {title="Sonorite (2005)" image="https://i.discogs.com/ldvmSA8Uc-jT6AGyghz4uLk-VBK9L6VMjNwexIEmPnc/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTExODgx/MzQtMTQwMTM1Njc1/Ni0zMTM0LmpwZWc.jpeg" icon="album"}
#description
**Título:** Sonorite    
**Edición:** Original     
**Año:** 2005
#content
**Título:** Sonorite    
**Edición:** Original     
**Año:** 2005    
:::button {icon="download"}
  [Descargar con FDM](magnet:?xt=urn:btih:590ce559f57b0d169ddef6938b926b18022cff7a&dn=Tatsuro%20Yamashita%20%28山下達郎%29%20–%20Sonorite%20%282005%29&tr=http%3A%2F%2Fnyaa.tracker.wf%3A7777%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce)
:::
:::

:::card-m {title="Ray of Hope (2011)" image="https://i.discogs.com/HBGxoRwm3CnPIhWwwFU0HoVI6olc32GaH3q7MtLw8kw/rs:fit/g:sm/q:90/h:600/w:591/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTkxMTUx/MjYtMTUwOTA3NzQw/Ni0zNDkzLmpwZWc.jpeg" icon="album"}
#description
**Título:** Ray of Hope    
**Edición:** Original     
**Año:** 2011
#content
**Título:** Ray of Hope    
**Edición:** Original     
**Año:** 2011    
:::button {icon="download"}
  [Descargar con FDM](magnet:?xt=urn:btih:750bcc394aba80939772d131b7a162e63ae6495a&dn=%5BAlbum%5D%20山下達郎%28Tatsuro%20Yamashita%29%20-%20Ray%20Of%20Hope%20%28初回限定盤%29%20%5B2011.08.10%5D&tr=http%3A%2F%2Fnyaa.tracker.wf%3A7777%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce)
:::
:::

:::card-m {title="Softly (Deluxe Edition - 2022)" image="https://upload.wikimedia.org/wikipedia/en/9/93/Softly_%28Yamashita_album_jacket%29.jpg" icon="album"}
#description
**Título:** Softly    
**Edición:** Deluxe Edition    
**Año:** 2022
#content
**Título:** Softly    
**Edición:** Deluxe Edition    
**Año:** 2022    
:::button {icon="download"}
  [Descargar con FDM](magnet:?xt=urn:btih:dfea00e903b0b196c42f8111b32e8bc33c8dbe21&dn=Tatsuro%20Yamashita%20-%20Softly%20%5BDeluxe%20Edition%5D%20%5B16-bit%20FLAC%20%2B%20LOG%2C%20CUE%5D%20%5BCDx2%2C%20WPCL-13359%5D%20%5B2022%5D&tr=http%3A%2F%2Fnyaa.tracker.wf%3A7777%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce)
:::
:::

</div>
---
-> **|[play_circle_filled]| _2025 Noir Room - La habitación oscura de la música_** <-

`;

function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 1800);
}

function App() {
  const [md, setMd] = useState(SAMPLE);

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('noirmd-test-theme', next);
    toast('Tema: ' + next);
  };

  return (
    <>
      <header className="test-header">
        <div className="test-brand">
          <span className="material-icons-round test-logo">code</span>
          <div>
            <h1>@noirmd/previewer</h1>
            <p>Test del editor <code>NReditor</code> (CodeMirror 6 + preview vanilla)</p>
          </div>
        </div>
        <div className="test-actions">
          <button className="test-btn" onClick={() => { setMd(SAMPLE); toast('Ejemplo cargado'); }}>
            <span className="material-icons-round">description</span> Ejemplo
          </button>
          <button className="test-btn" onClick={() => { setMd(''); toast('Editor vacio'); }}>
            <span className="material-icons-round">delete_sweep</span> Limpiar
          </button>
          <button className="test-btn" onClick={toggleTheme} title="Cambiar tema">
            <span className="material-icons-round">contrast</span> Tema
          </button>
        </div>
      </header>

      <main className="test-main">
        <NReditor
          value={md}
          onChange={setMd}
          guide
          onConfig={() => toast('Configurar: pendiente en el test')}
        />
      </main>

      <footer className="test-footer">
        <span>@noirmd/previewer v2.0</span>
      </footer>

      <div id="toast" className="test-toast" />
    </>
  );
}

createRoot(document.getElementById('editor')).render(<App />);
