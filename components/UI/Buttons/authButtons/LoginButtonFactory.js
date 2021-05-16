import React, { useCallback } from 'react';
import EmailIcon from '@material-ui/icons/Email';
import { signIn } from 'next-auth/client';
import {
  GithubLoginButton,
  GoogleLoginButton,
  LinkedInLoginButton,
  createButton,
  createSvgIcon,
} from 'react-social-login-buttons';
import PropTypes from 'prop-types';
import { useLang } from '../../../../store/contexts/langContext';

const CustomGithubLoginButton = (props) => {
  const { id } = props;
  const { lang } = useLang();
  const onClick = useCallback(() => {
    signIn(id);
  }, [id]);

  return <GithubLoginButton onClick={onClick} text={`${lang.signInWithText} GitHub`} />;
};

const CustomGoogleLoginButton = (props) => {
  const { id } = props;
  const { lang } = useLang();
  const onClick = useCallback(() => {
    signIn(id);
  }, [id]);

  return <GoogleLoginButton onClick={onClick} text={`${lang.signInWithText} Google`} />;
};

const CustomLinkedinLoginButton = (props) => {
  const { id } = props;
  const { lang } = useLang();
  const onClick = useCallback(() => {
    signIn(id);
  }, [id]);

  return <LinkedInLoginButton onClick={onClick} text={`${lang.signInWithText} LinkedIn`} />;
};

const CustomEmailLoginButton = () => {
  const { lang } = useLang();

  const EmailLoginButton = createButton({
    text: `${lang.signInWithText} ${lang.emailLabel}`,
    icon: createSvgIcon(EmailIcon),
    style: { background: '#3b5998' },
    activeStyle: { background: '#293e69' },
  });

  return <EmailLoginButton />;
};

const CustomButtonPropType = {
  id: PropTypes.string.isRequired,
};
CustomGithubLoginButton.propTypes = CustomButtonPropType;
CustomGoogleLoginButton.propTypes = CustomButtonPropType;
CustomLinkedinLoginButton.propTypes = CustomButtonPropType;

const LogginButtonFactory = (props) => {
  switch (props.id) {
    case 'github':
      return <CustomGithubLoginButton id="github" />;
    case 'google':
      return <CustomGoogleLoginButton id="google" />;
    case 'linkedin':
      return <CustomLinkedinLoginButton id="linkedin" />;
    case 'email':
      return <CustomEmailLoginButton />;
    default:
      return null;
  }
};

LogginButtonFactory.propTypes = {
  id: PropTypes.string.isRequired,
};

export default React.memo(LogginButtonFactory);
