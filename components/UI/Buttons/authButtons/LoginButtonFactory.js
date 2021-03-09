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
import { useRouter } from 'next/router';
import { useLang } from '../../../../store/contexts/langContext';

const CustomGithubLoginButton = (props) => {
  const { id, callbackUrl } = props;
  const { lang } = useLang();
  const onClick = useCallback(() => {
    signIn(id, { callbackUrl });
  }, [id]);

  return <GithubLoginButton onClick={onClick} text={`${lang.signInWithText} GitHub`} />;
};

const CustomGoogleLoginButton = (props) => {
  const { id, callbackUrl } = props;
  const { lang } = useLang();
  const onClick = useCallback(() => {
    signIn(id, { callbackUrl });
  }, [id]);

  return <GoogleLoginButton onClick={onClick} text={`${lang.signInWithText} Google`} />;
};

const CustomLinkedinLoginButton = (props) => {
  const { id, callbackUrl } = props;
  const { lang } = useLang();
  const onClick = useCallback(() => {
    signIn(id, { callbackUrl });
  }, [id]);

  return <LinkedInLoginButton onClick={onClick} text={`${lang.signInWithText} LinkedIn`} />;
};

const CustomEmailLoginButton = (/* props */) => {
  // const { id, callbackUrl } = props;
  const { lang } = useLang();

  const onClick = useCallback(() => {
    // signIn(id, { callbackUrl });
  }, []);

  const EmailLoginButton = createButton({
    text: `${lang.signInWithText} ${lang.emailLabel}`,
    icon: createSvgIcon(EmailIcon),
    style: { background: '#3b5998' },
    activeStyle: { background: '#293e69' },
    onClick,
  });

  return <EmailLoginButton />;
};

const CustomButtonPropType = {
  id: PropTypes.string.isRequired,
  callbackUrl: PropTypes.string.isRequired,
};
CustomGithubLoginButton.propTypes = CustomButtonPropType;
CustomGoogleLoginButton.propTypes = CustomButtonPropType;
CustomLinkedinLoginButton.propTypes = CustomButtonPropType;
// CustomEmailLoginButton.propTypes = CustomButtonPropType;

const LogginButtonFactory = (props) => {
  const { baseUrl } = props;
  const callbackUrl = `${baseUrl}/api/redirector?redirect_to=EDIT_USER`;

  switch (props.id) {
    case 'github':
      return <CustomGithubLoginButton id="github" callbackUrl={callbackUrl} />;
    case 'google':
      return <CustomGoogleLoginButton id="google" callbackUrl={callbackUrl} />;
    case 'linkedin':
      return <CustomLinkedinLoginButton id="linkedin" callbackUrl={callbackUrl} />;
    case 'email':
      return <CustomEmailLoginButton />;
    default:
      return null;
  }
};

LogginButtonFactory.propTypes = {
  id: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
};

export default React.memo(LogginButtonFactory);
