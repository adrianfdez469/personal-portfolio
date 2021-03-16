// Ext libs
import React, { useReducer, useCallback } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedinIcon from '@material-ui/icons/LinkedIn';
import { useRouter } from 'next/router';
// Components
import StepItem from '../../../../../components/UI/StepForm/StepItem';
import SyncButton from '../../../../../components/UI/Buttons/SyncButton';
// hooks
import { useLang } from '../../../../../store/contexts/langContext';
// Custom icons
import GitLabIcon from '../../../../../components/UI/icons/GitlabIcon';
// Styles
import useStyles from './styles';

const getUserQuery = `
  query getData($provider:userProviders!) {
    providerUserData(provider:$provider){
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
  loading: false,
};

const actions = {
  SELECT_GITHUB_PROVIDER_BUTTON: 'SELECT_GITHUB_PROVIDER_BUTTON',
  SELECT_GITLAB_PROVIDER_BUTTON: 'SELECT_GITLAB_PROVIDER_BUTTON',
  SELECT_LINKEDIN_PROVIDER_BUTTON: 'SELECT_LINKEDIN_PROVIDER_BUTTON',

  STOP_LOADING: 'STOP_LOADING',
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
    case actions.STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const SyncForm = (props) => {
  const { setProvidersData } = props;
  // hooks
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const { lang } = useLang();
  const styles = useStyles();

  // constants
  const { buttonGithubSelected, buttonGitlabSelected, buttonLinkedinSelected } = state;

  const handleNavigateToGetAccess = (provider) => {
    router.push(
      `/api/customAuth/providerLoginCall?provider=${provider}&originalPath=${router.asPath}`
    );
  };

  const getProviderUserData = (provider) => {
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
            handleNavigateToGetAccess(provider);
            dispatch({ type: actions.SET_ERROR_LOADING_GITHUB_REPOS, data: 'NO_PROVIDER_TOKEN' });
            return;
          }
          const error = new Error('Cant load api data');
          throw error;
        }
        setProvidersData(data.data.providerUserData);
      })
      .catch((err) => {
        console.log(err);
        // TODO: Manage Error
        // dispatch({ type: actions.SET_ERROR_LOADING_GITHUB_REPOS, data: err.message });
      })
      .finally(() => {
        dispatch({ type: actions.STOP_LOADING });
      });
  };

  // handlers
  const handleSelectGithubButton = useCallback(() => {
    dispatch({ type: actions.SELECT_GITHUB_PROVIDER_BUTTON });
    getProviderUserData('github');
  }, []);
  const handleSelectGitlabButton = useCallback(() => {
    dispatch({ type: actions.SELECT_GITLAB_PROVIDER_BUTTON });
    getProviderUserData('gitlab');
  }, []);
  const handleSelectLinkedinButton = useCallback(() => {
    dispatch({ type: actions.SELECT_LINKEDIN_PROVIDER_BUTTON });
    getProviderUserData('linkedin');
  }, []);

  return (
    <StepItem label={lang.syncStep.header.label}>
      <div className={styles.root}>
        <div className={styles.buttonsWrapper}>
          <SyncButton
            variant={buttonGithubSelected ? 'contained' : 'outlined'}
            Icon={GitHubIcon}
            handleSelect={handleSelectGithubButton}
            text={lang.syncStep.body.buttons.common}
            syncProviderText="Github"
          />
          <SyncButton
            variant={buttonGitlabSelected ? 'contained' : 'outlined'}
            Icon={GitLabIcon}
            handleSelect={handleSelectGitlabButton}
            text={lang.syncStep.body.buttons.common}
            syncProviderText="Gitlab"
          />
          <SyncButton
            variant={buttonLinkedinSelected ? 'contained' : 'outlined'}
            Icon={LinkedinIcon}
            handleSelect={handleSelectLinkedinButton}
            text={lang.syncStep.body.buttons.common}
            syncProviderText="LinkedIn"
          />
        </div>
        {state.loading && <CircularProgress color="primary" className={styles.spinner} />}
      </div>
    </StepItem>
  );
};
SyncForm.propTypes = {
  setProvidersData: PropTypes.func.isRequired,
};

export default React.memo(SyncForm);
