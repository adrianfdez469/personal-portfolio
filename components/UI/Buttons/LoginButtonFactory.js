import React, { useCallback } from 'react';
import { signIn } from 'next-auth/client';
import {
  GithubLoginButton,
  GoogleLoginButton,
  LinkedInLoginButton,
} from 'react-social-login-buttons';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

const CustomGithubLoginButton = (props) => {
  const { id, callbackUrl } = props;

  const onClick = useCallback(() => {
    signIn(id, { callbackUrl });
  }, [id]);

  return <GithubLoginButton onClick={onClick} text="Sign in with GitHub" />;
};

const CustomGoogleLoginButton = (props) => {
  const { id, callbackUrl } = props;
  const onClick = useCallback(() => {
    signIn(id, { callbackUrl });
  }, [id]);

  return <GoogleLoginButton onClick={onClick} text="Sign in with Google" />;
};

const CustomLinkedinLoginButton = (props) => {
  const { id, callbackUrl } = props;
  const onClick = useCallback(() => {
    signIn(id, { callbackUrl });
  }, [id]);

  return <LinkedInLoginButton onClick={onClick} text="Sign in with LinkedIn" />;
};

const CustomButtonPropType = {
  id: PropTypes.string.isRequired,
  callbackUrl: PropTypes.string.isRequired,
};
CustomGithubLoginButton.propTypes = CustomButtonPropType;
CustomGoogleLoginButton.propTypes = CustomButtonPropType;
CustomLinkedinLoginButton.propTypes = CustomButtonPropType;

const LogginButtonFactory = (props) => {
  const router = useRouter();

  switch (props.id) {
    case 'github':
      return <CustomGithubLoginButton id={props.id} callbackUrl={router.query.callbackUrl} />;
    case 'google':
      return <CustomGoogleLoginButton id={props.id} callbackUrl={router.query.callbackUrl} />;
    case 'linkedin':
      return <CustomLinkedinLoginButton id={props.id} callbackUrl={router.query.callbackUrl} />;
    default:
      return null;
  }
};

LogginButtonFactory.propTypes = {
  id: PropTypes.string.isRequired,
};

export default React.memo(LogginButtonFactory);
