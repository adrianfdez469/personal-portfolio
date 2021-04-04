/* eslint-disable import/no-named-as-default-member */
// Ext libs
import React, { useReducer, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedinIcon from '@material-ui/icons/LinkedIn';
import { useRouter } from 'next/router';
// Components
import StepItem from '../../../../../components/UI/StepForm/StepItem';
import SyncButton from '../../../../../components/UI/Buttons/SyncButton';
import SelectData from './selector';
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
      birthday
      gender
      email
      phone
      provider
      githubUrl
      gitlabUrl
      linkedinUrl
      twitterUrl 
    }
  }
`;

const initialState = {
  buttonGithubSelected: false,
  buttonGitlabSelected: false,
  buttonLinkedinSelected: false,
  loading: false,
  error: null,
  user: {
    avatarUrl: null,
    name: null,
    title: null,
    about: null,
    birthday: null,
    experience: null,
    gender: null,
    email: null,
    phone: null,
    provider: null,
    githubUrl: null,
    gitlabUrl: null,
    linkedinUrl: null,
    twitterUrl: null,
  },
};

const actions = {
  SELECT_GITHUB_PROVIDER_BUTTON: 'SELECT_GITHUB_PROVIDER_BUTTON',
  SELECT_GITLAB_PROVIDER_BUTTON: 'SELECT_GITLAB_PROVIDER_BUTTON',
  SELECT_LINKEDIN_PROVIDER_BUTTON: 'SELECT_LINKEDIN_PROVIDER_BUTTON',
  DESELECT_ALL_PROVIDERS: 'DESELECT_ALL_PROVIDERS',

  ERROR_LOADING: 'ERROR_LOADING',
  SUCCESS_LOADING: 'SUCCESS_LOADING',
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
    case actions.DESELECT_ALL_PROVIDERS:
      return {
        ...initialState,
        buttonLinkedinSelected: false,
        buttonGitlabSelected: false,
        buttonGithubSelected: false,
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
        user: action.user,
      };
    default:
      return state;
  }
};

const SyncForm = (props) => {
  const { setProvidersData, resetUrl } = props;
  // hooks
  const styles = useStyles();
  const router = useRouter();
  const { lang } = useLang();
  const { user } = useProfile();
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    user: {
      ...user,
    },
  });
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

          // setProvidersData(data.data.providerUserData);
          console.log(data.data.providerUserData);
          dispatch({
            type: actions.SUCCESS_LOADING,
            user: data.data.providerUserData,
          });
        })
        .catch((err) => {
          console.error(err);
          dispatch({ type: actions.ERROR_LOADING, error: 'ERROR' });
        });
    },
    [handleNavigateToGetAccess, dispatch]
  );

  const onDataChange = (field, data) => {
    setProvidersData({
      [field]: data,
    });
  };

  // handlers
  const handleClickProviderButton = (provider) => {
    const newArrPath = router.asPath.split('?');
    let path = newArrPath[0];
    if (provider) {
      path += `?provider=${provider}`;
    }
    router.push(path, null, { shallow: true });
  };

  const handleSelectGithubButton = useCallback(() => {
    dispatch({ type: actions.SELECT_GITHUB_PROVIDER_BUTTON });
    getProviderUserData('github');
  }, []);
  const handleSelectGitlabButton = useCallback(() => {
    dispatch({ type: actions.SELECT_GITLAB_PROVIDER_BUTTON });
    getProviderUserData('gitlab', '&scope=read_user+openid+profile+email+read_api');
  }, []);
  const handleSelectLinkedinButton = useCallback(() => {
    dispatch({ type: actions.SELECT_LINKEDIN_PROVIDER_BUTTON });
    getProviderUserData('linkedin');
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

  useEffect(() => {
    if (resetUrl) {
      handleClickProviderButton();
      dispatch({ type: actions.DESELECT_ALL_PROVIDERS });
    }
  }, [resetUrl]);

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

        <SelectData user={user} provider={state.user} change={onDataChange} />
        <Backdrop open={state.loading} />
      </div>
    </StepItem>
  );
};
SyncForm.propTypes = {
  setProvidersData: PropTypes.func.isRequired,
  resetUrl: PropTypes.bool.isRequired,
};

export default React.memo(SyncForm);
