import { createSignal } from 'solid-js';
import { useStore } from '../../utils';
import styles from './HangoutInterface.module.css';

export function HangoutInterface() {
  const [state, setState] = useStore();
  const [carpool, setCarpool] = createSignal(false);

  return (
    <div class={styles.HangoutInterface}>
      <h1>Hangout</h1>
      <button style={{ 'margin-bottom': '1rem' }}>Pre-uni meetup</button>
      <div class="box">
        <h1>Attendees</h1>
        {!carpool() ? (
          <p>Ruyi [ruyili] (Owner)</p>
        ) : (
          <a href="#" onClick={() => setCarpool(true)}>
            - Leave Carpool
          </a>
        )}
        <p>Andrew [aqt]</p>
        <p>→ Alex [alxchdi]</p>
        {carpool() ? (
          <p>→ Ruyi [ruyili] (Owner)</p>
        ) : (
          <a href="#" onClick={() => setCarpool(true)}>
            → + Join Carpool
          </a>
        )}
        <p>Brian [starbl]</p>
      </div>
      <div class="box">
        <h1>Locations</h1>
        <button id="lol" onClick={() => setState({ activeHangout: 0 })}>
          湘村发现 Mississauga Hunan Style Restaurant
        </button>
        <button onClick={() => setState({ activeHangout: 1 })}>
          Middlebury Green Park
        </button>
        <button onClick={() => setState({ activeHangout: 2 })}>
          Sugar Maple Woods Park
        </button>
        <button onClick={() => setState({ activeHangout: 3 })}>
          Erin Mills Town Centre
        </button>
      </div>
    </div>
  );
}
