import { createEffect, createSignal } from 'solid-js';
import * as L from 'leaflet';
import styles from './Map.module.css';
import { useStore } from '../../utils';

type Coord = [number, number];
const home: Coord = [43.561798, -79.710602];
const alex: Coord = [43.5670375, -79.7287696];
const brian: Coord = [43.5625932, -79.7176979];
const andrew: Coord = [43.5571486, -79.7220366];

const hunan: Coord = [43.5631422, -79.713717];
const park: Coord = [43.565106, -79.724606];
const trail: Coord = [43.562598, -79.728155];
const mall: Coord = [43.5582799, -79.7127187];

export function Map() {
  let map: L.Map;
  let mapContainer: HTMLDivElement | undefined;
  const [state, setState] = useStore();

  let activeLine: any;

  function lineFor(place: Coord) {
    if (activeLine) activeLine.remove();
    // @ts-ignore
    activeLine = new L.polyline(
      [home, place, alex, place, brian, place, andrew, place],
      {
        color: 'red',
        weight: 3,
        opacity: 0.5,
        smoothFactor: 1,
      },
    );
  }

  setTimeout(function () {
    map = L.map(mapContainer!);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    }).addTo(map);
    L.control.scale().addTo(map);
    map.setView(home, 16);

    L.marker(home).bindPopup('Ruyi').addTo(map);
    L.marker(alex).bindPopup('Alex').addTo(map);
    L.marker(brian).bindPopup('Brian').addTo(map);
    L.marker(andrew).bindPopup('Andrew').addTo(map);

    const greenIcon = new L.Icon({
      iconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    L.marker(hunan, {
      icon: greenIcon,
    })
      .bindPopup(
        `
        <div>
          <h3>湘村发现 Mississauga Hunan Style Restaurant</h3>
          <h4>Restaurant | 4.5 ⭐</h4>
          <button onclick="document.getElementById('lol').classList.add('sel')" 
          style="width:100%;background:white;padding:0.4rem;cursor:pointer;border:1px solid black;outline:none;">Vote for this</button>
        </div>
      `,
      )
      .addTo(map);

    L.marker(park, {
      icon: greenIcon,
    })
      .bindPopup(
        `
        <div class="">
          <h3>Middlebury Green Park</h3>
          <h4>Recreation | 4.8 ⭐</h4>
          <button style="width:100%;background:white;padding:0.4rem;cursor:pointer;border:1px solid black;outline:none;">Vote for this</button>
        </div>
      `,
      )
      .addTo(map);

    L.marker(trail, {
      icon: greenIcon,
    })
      .bindPopup(
        `
        <div class="">
          <h3>Sugar Maple Woods Park</h3>
          <h4>Recreation | 4.2 ⭐</h4>
          <button style="width:100%;background:white;padding:0.4rem;cursor:pointer;border:1px solid black;outline:none;">Vote for this</button>
        </div>
      `,
      )
      .addTo(map);

    L.marker(mall, {
      icon: greenIcon,
    })
      .bindPopup(
        `
        <div class="">
          <h3>Erin Mills Town Centre</h3>
          <h4>Shopping Mall | 4.3 ⭐</h4>
          <button style="width:100%;background:white;padding:0.4rem;cursor:pointer;border:1px solid black;outline:none;">Vote for this</button>
        </div>
      `,
      )
      .addTo(map);
  });

  setInterval(function () {
    lineFor([hunan, park, trail, mall][state.activeHangout]);
    // @ts-ignore
    activeLine.addTo(map);
  }, 1000);

  return (
    <div class={styles.Map}>
      <div class={styles.MapFrame} ref={mapContainer}></div>
    </div>
  );
}
