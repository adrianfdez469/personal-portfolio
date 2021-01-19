import { Email } from '@material-ui/icons';
import { createButton, createSvgIcon } from 'react-social-login-buttons';

const config = {
  text: 'Login with Email',
  icon: createSvgIcon(() => <Email color="main" />),
  iconFormat: (name) => `fa fa-${name}`,
  style: { background: '#3b5998' },
  activeStyle: { background: '#293e69' },

};

const MyEmailLoginButton = createButton(config);

export default MyEmailLoginButton;
