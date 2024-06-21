import { createButton, createSvgIcon } from 'react-social-login-buttons';
import TwitchIcon from 'assets/img/twitch.svg';

const config = {
  activeStyle: { background: '#9146ff' },
  icon: createSvgIcon(TwitchIcon),
  style: { background: '#7289DA' },
};

export default createButton(config);
