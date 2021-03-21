/* eslint-disable import/no-named-as-default-member */
// Ext libs
import React, { useReducer, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedinIcon from '@material-ui/icons/LinkedIn';
import { useRouter } from 'next/router';
// Components
import StepItem from '../../../../../components/UI/StepForm/StepItem';
import SyncButton from '../../../../../components/UI/Buttons/SyncButton';
// eslint-disable-next-line import/no-named-as-default
import AvatarPhoto from '../../../../../components/UI/Avatar/AvatarPhoto';
import SelectableAvatarPhoto from '../../../../../components/UI/Avatar/SelectableAvatarPhoto';

import Backdrop from '../../../../../components/UI/backdrop';
// hooks
import { useLang } from '../../../../../store/contexts/langContext';
import { useProfile } from '../../../../../store/contexts/profileContext';
// Custom icons
import GitLabIcon from '../../../../../components/UI/icons/GitlabIcon';
// Styles
import useStyles from './styles';

const getUserQuery = `
  query getData($provider:userProviders!) {
    providerUserData(provider:$provider){
      avatarUrl
      name
      title
      about
      experience
      birthdate
      gender
      email
      phone
      provider
      githubUrl
      facebookUrl
      linkedinUrl
      twitterUrl 
    }
  }
`;

const initialState = {
  buttonGithubSelected: false,
  buttonGitlabSelected: false,
  buttonLinkedinSelected: false,
  providerAvatarUrl: null,
  loading: false,
  error: null,
  selectedAvatar: 'current',
};

const actions = {
  SELECT_GITHUB_PROVIDER_BUTTON: 'SELECT_GITHUB_PROVIDER_BUTTON',
  SELECT_GITLAB_PROVIDER_BUTTON: 'SELECT_GITLAB_PROVIDER_BUTTON',
  SELECT_LINKEDIN_PROVIDER_BUTTON: 'SELECT_LINKEDIN_PROVIDER_BUTTON',

  ERROR_LOADING: 'ERROR_LOADING',
  SUCCESS_LOADING: 'SUCCESS_LOADING',
  SWITCH_AVATAR: 'SWITCH_AVATAR',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SELECT_GITHUB_PROVIDER_BUTTON:
      return {
        ...initialState,
        buttonGithubSelected: true,
        loading: true,
      };
    case actions.SELECT_GITLAB_PROVIDER_BUTTON:
      return {
        ...initialState,
        buttonGitlabSelected: true,
        loading: true,
      };
    case actions.SELECT_LINKEDIN_PROVIDER_BUTTON:
      return {
        ...initialState,
        buttonLinkedinSelected: true,
        loading: true,
      };
    case actions.ERROR_LOADING:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actions.SUCCESS_LOADING:
      return {
        ...state,
        loading: false,
        providerAvatarUrl: action.avatarUrl,
      };
    case actions.SWITCH_AVATAR:
      return {
        ...state,
        selectedAvatar: action.selected,
      };
    default:
      return state;
  }
};

const SyncForm = (props) => {
  const { setProvidersData, setProvidersAvatar } = props;
  // hooks
  const styles = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const { lang } = useLang();
  const { user } = useProfile();
  // constants
  const { buttonGithubSelected, buttonGitlabSelected, buttonLinkedinSelected } = state;
  const handleNavigateToGetAccess = useCallback(
    (provider, scope = '') => {
      const arrPath = router.asPath.split('?');
      const path = arrPath[0];
      router.push(
        `/api/customAuth/providerLoginCall?provider=${provider}&originalPath=${path}?provider=${provider}${scope}`
      );
    },
    [router]
  );

  const getProviderUserData = useCallback(
    (provider, scope) => {
      fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: getUserQuery,
          variables: {
            provider,
          },
        }),
      })
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          const error = new Error('Cant load api data');
          error.status = resp.status;
          throw error;
        })
        .then((data) => {
          console.log(data);

          if (data.errors && data.errors.length > 0) {
            if (data.errors[0].message === 'NO_PROVIDER_TOKEN') {
              handleNavigateToGetAccess(provider, scope);
              dispatch({ type: actions.SET_ERROR_LOADING_GITHUB_REPOS, data: 'NO_PROVIDER_TOKEN' });
              return;
            }
            const error = new Error('Cant load api data');
            throw error;
          }

          setProvidersData(data.data.providerUserData);
          dispatch({
            type: actions.SUCCESS_LOADING,
            avatarUrl: data.data.providerUserData.avatarUrl,
          });
        })
        .catch((err) => {
          console.log(err);
          dispatch({ type: actions.ERROR_LOADING, error: 'ERROR' });
        });
    },
    [handleNavigateToGetAccess, dispatch]
  );

  const onAvatarChange = (selected) => {
    dispatch({ type: actions.SWITCH_AVATAR, selected });
    if (selected === 'current') {
      setProvidersAvatar(user.image);
    } else if (selected === 'provider') {
      setProvidersAvatar(state.providerAvatarUrl);
    }
  };

  // handlers
  const handleClickProviderButton = (provider) => {
    const newArrPath = router.asPath.split('?');
    const path = `${newArrPath[0]}?provider=${provider}`;
    router.push(path, null, { shallow: true });
  };

  const handleSelectGithubButton = useCallback(() => {
    dispatch({ type: actions.SELECT_GITHUB_PROVIDER_BUTTON });
    getProviderUserData('github');
  }, []);
  const handleSelectGitlabButton = useCallback(() => {
    dispatch({ type: actions.SELECT_GITLAB_PROVIDER_BUTTON });
    getProviderUserData('gitlab', '&scope=read_user+openid+profile+email');
  }, []);
  const handleSelectLinkedinButton = useCallback(() => {
    dispatch({ type: actions.SELECT_LINKEDIN_PROVIDER_BUTTON });
    getProviderUserData('linkedin');
  }, []);

  useEffect(() => {
    setProvidersAvatar(user.image);
  }, []);

  useEffect(() => {
    if (router.query.provider === 'github') {
      handleSelectGithubButton();
    }
    if (router.query.provider === 'gitlab') {
      handleSelectGitlabButton();
    }
    if (router.query.provider === 'linkedin') {
      handleSelectLinkedinButton();
    }
  }, [router.query.provider]);

  return (
    <StepItem label={lang.syncStep.header.label}>
      <div className={styles.root}>
        <div className={styles.buttonsWrapper}>
          <SyncButton
            variant={buttonGithubSelected ? 'contained' : 'outlined'}
            Icon={GitHubIcon}
            handleSelect={() => handleClickProviderButton('github')}
            text={lang.syncStep.body.buttons.common}
            syncProviderText="Github"
          />
          <SyncButton
            variant={buttonGitlabSelected ? 'contained' : 'outlined'}
            Icon={GitLabIcon}
            handleSelect={() => handleClickProviderButton('gitlab')}
            text={lang.syncStep.body.buttons.common}
            syncProviderText="Gitlab"
          />
          <SyncButton
            variant={buttonLinkedinSelected ? 'contained' : 'outlined'}
            Icon={LinkedinIcon}
            handleSelect={() => handleClickProviderButton('linkedin')}
            text={lang.syncStep.body.buttons.common}
            syncProviderText="LinkedIn"
          />
        </div>

        <div className={styles.avatarWrapper}>
          <div className={styles.avatar}>
            <SelectableAvatarPhoto
              selected={state.selectedAvatar === 'current'}
              onClick={() => onAvatarChange('current')}
            >
              <AvatarPhoto size="small" selected src={user.image} />
            </SelectableAvatarPhoto>
            <Typography>{lang.syncStep.body.avatars.current}</Typography>
          </div>
          {state.providerAvatarUrl && state.providerAvatarUrl !== user.image && (
            <div className={styles.avatar}>
              <SelectableAvatarPhoto
                selected={state.selectedAvatar === 'provider'}
                onClick={() => onAvatarChange('provider')}
              >
                <AvatarPhoto size="small" selectable src={state.providerAvatarUrl} />
              </SelectableAvatarPhoto>
              <Typography>
                {`${router.query.provider.charAt(0).toUpperCase()}${router.query.provider.slice(
                  1
                )} ${lang.syncStep.body.avatars.avatar}`}
              </Typography>
            </div>
          )}
        </div>
        <Backdrop open={state.loading} />
      </div>
    </StepItem>
  );
};
SyncForm.propTypes = {
  setProvidersData: PropTypes.func.isRequired,
  setProvidersAvatar: PropTypes.func.isRequired,
};

export default React.memo(SyncForm);
