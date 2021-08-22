import { request } from '../../utils';
import styles from './Profile.module.css';
import { createEffect, createSignal, Show } from 'solid-js';
import { parse } from 'lightcookie';

const defaultAvatarUrl =
  'https://tleliteracy.com/wp-content/uploads/2017/02/default-avatar.png';

export function Profile() {
  const { token } = parse(document.cookie);

  const [profile, setProfile] = createSignal('');
  const [accessToken, setAccessToken] = createSignal(token);
  const [msg, setMsg] = createSignal('');

  async function onSubmitLogin(evt: any) {
    evt.preventDefault();
    const { username, password } = evt.target;
    try {
      var data = await request('auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }),
      }).then((r) => r.json());
    } catch (err) {
      console.error(err);
      setMsg('Invalid credentials!');
    }
    document.cookie = 'max-age=31536000';
    document.cookie = 'path=/';
    document.cookie = 'token=' + data.accessToken;
    setAccessToken(data.accessToken);
  }

  async function onSubmitRegister(evt: any) {
    evt.preventDefault();
    const { email, username, password } = evt.target;

    const { latitude, longitude } = await new Promise(function (res) {
      navigator.geolocation.getCurrentPosition(function (position) {
        // @ts-ignore
        res(position);
      });
    });

    try {
      await request('auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.value,
          username: username.value,
          password: password.value,
          location: `${latitude};${longitude}`,
          avatarUrl: defaultAvatarUrl,
        }),
      }).then((r) => r.json());
    } catch (err) {
      setMsg('Invalid credentials!');
    }
    setMsg('Successfully registered, log in now!');
  }

  createEffect(async function () {
    console.log(accessToken());
    try {
      const res = await request('user/profile', {
        headers: {
          Authorization: `Bearer ${accessToken()}`,
        },
      }).then((r) => r.json());
      console.log(res);
      setProfile(res.username);
    } catch (err) {}
  });

  return (
    <div class={styles.Profile}>
      <h1>WhereYouApp</h1>
      {profile().length ? (
        <>
          <div class="box">
            <h1>Profile</h1>
            <p>Logged in as {profile()}</p>
            <p style={{ cursor: 'pointer' }}>Can Carpool: NO</p>
            <p>Unavailable on:</p>
            <ul>
              <li>Aug 27, 2021</li>
              <li>Aug 29, 2021</li>
            </ul>
          </div>
          <div
            class="box"
            style={{
              display: 'flex',
              'flex-direction': 'column',
            }}
          >
            <h1>Hangouts</h1>
            <button style={{ 'margin-bottom': '0.5rem' }}>
              Pre-uni meetup
            </button>
            <button style={{ 'margin-bottom': '0.5rem' }}>sept meetup</button>
            <button>Wherever</button>
          </div>
        </>
      ) : (
        <>
          <div class="box">
            <h1>Login</h1>
            <form class={styles.form} onSubmit={onSubmitLogin}>
              <input name="username" type="text" placeholder="username" />
              <input name="password" type="text" placeholder="Password" />
              <input type="submit" value="Login" />
            </form>
          </div>

          <div class="box">
            <h1>Register</h1>
            <form class={styles.form} onSubmit={onSubmitRegister}>
              <input name="username" type="text" placeholder="Username" />
              <input name="email" type="text" placeholder="Email" />
              <input name="password" type="password" placeholder="Password" />
              <input type="submit" value="Register" />
            </form>
          </div>
        </>
      )}

      <p>{msg()}</p>
    </div>
  );
}
