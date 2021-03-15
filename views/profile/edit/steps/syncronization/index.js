// Ext libs
import React, { useReducer, useCallback } from 'react';
import { Grid } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedinIcon from '@material-ui/icons/LinkedIn';

// Components
import StepItem from '../../../../../components/UI/StepForm/StepItem';
import SyncButton from '../../../../../components/UI/Buttons/SyncButton';
// hooks
import { useLang } from '../../../../../store/contexts/langContext';
// Custom icons
import GitLabIcon from '../../../../../components/UI/icons/GitlabIcon';

const initialState = {
  buttonGithubSelected: false,
  buttonGitlabSelected: false,
  buttonLinkedinSelected: false,
};

const actions = {
  SELECT_GITHUB_PROVIDER_BUTTON: 'SELECT_GITHUB_PROVIDER_BUTTON',
  SELECT_GITLAB_PROVIDER_BUTTON: 'SELECT_GITLAB_PROVIDER_BUTTON',
  SELECT_LINKEDIN_PROVIDER_BUTTON: 'SELECT_LINKEDIN_PROVIDER_BUTTON',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SELECT_GITHUB_PROVIDER_BUTTON:
      return {
        ...initialState,
        buttonGithubSelected: true,
      };
    case actions.SELECT_GITLAB_PROVIDER_BUTTON:
      return {
        ...initialState,
        buttonGitlabSelected: true,
      };
    case actions.SELECT_LINKEDIN_PROVIDER_BUTTON:
      return {
        ...initialState,
        buttonLinkedinSelected: true,
      };
    default:
      return state;
  }
};

const SyncForm = () => {
  // hooks
  const [state, dispatch] = useReducer(reducer, initialState);
  const { lang } = useLang();

  // constants
  const { buttonGithubSelected, buttonGitlabSelected, buttonLinkedinSelected } = state;

  // handlers
  const handleSelectGithubButton = useCallback(() => {
    dispatch({ type: actions.SELECT_GITHUB_PROVIDER_BUTTON });
  }, []);
  const handleSelectGitlabButton = useCallback(() => {
    dispatch({ type: actions.SELECT_GITLAB_PROVIDER_BUTTON });
  }, []);
  const handleSelectLinkedinButton = useCallback(() => {
    dispatch({ type: actions.SELECT_LINKEDIN_PROVIDER_BUTTON });
  }, []);

  return (
    <StepItem label={lang.syncStep.header.label}>
      <Grid container justify="center" spacing={4}>
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
      </Grid>
    </StepItem>
  );
};

export default React.memo(SyncForm);
