// Ext libs
import React, { useEffect, useReducer, useCallback } from 'react';
import PropTypes from 'prop-types';
import GitHubIcon from '@material-ui/icons/GitHub';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  useMediaQuery,
  Button,
  LinearProgress,
  FormLabel,
  Grid,
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/LockOutlined';
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';

import { useRouter } from 'next/router';
// hooks
import { useLang } from '../../../../store/contexts/langContext';
// Styles
import useStepsStyles from '../../styles';
import useSyncStyles from './styles';
// Custom icons
import GitLabIcon from '../../../../components/UI/icons/GitlabIcon';

// TODO: Sacar estas consultas de aqui y ponerlas en un lugar determinado para esto
const getReposQuery = (provider) => `
  query {
    providerRepos(provider:${provider}){
      scopes
      repos {
        id
        name
        description
        nameWithOwner
        ownerId
        ownerLogin
        ownerAvatarUrl
        isPrivate
        provider
      }
    }
  }`;

const getRepoData = (provider, id) => `
  query {
    providerRepoData(provider:${provider}, id: "${id}" ) {
      id
      name
      description
      createdAt
      nameWithOwner
      ownerId
      ownerLogin
      ownerAvatarUrl
      url
      deploymentUrl
      languages
      collaborators {
        login
        avatarUrl
        email
        bio
        name
        url
      }
      totalCollaborators
      provider
    }
  }`;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const initialGithubState = {
  buttonGithubSelected: false,
  loadingGithubRepos: false,
  errorLoadingGithubRepos: false,
  selectedGithubRepo: { id: null },
  githubRepos: [],
  detailsGithubRepoSelected: null,
  errorLoadingGithubDetailsRespo: false,
  hasPermissionForPrivateRepos: false,
};
const initialGitlabState = {
  buttonGitlabSelected: false,
  loadingGitlabRepos: false,
  errorLoadingGitlabRepos: false,
  selectedGitlabRepo: null,
  gitlabRepos: [],
  detailsGitlabRepoSelected: null,
  errorLoadingGitlabDetailsRespo: false,
};

const initialState = {
  ...initialGithubState,
  ...initialGitlabState,
};

const actions = {
  SELECT_GITHUB_PROVIDER_BUTTON: 'SELECT_GITHUB_PROVIDER_BUTTON',
  START_LOADING_GITHUB_REPOS: 'START_LOADING_GITHUB_REPOS',
  SET_ERROR_LOADING_GITHUB_REPOS: 'SET_ERROR_LOADING_GITHUB_REPOS',
  SET_GITHUB_REPOS: 'SET_GITHUB_REPOS',
  STOP_LOADING_GITHUB_REPOS: 'STOP_LOADING_GITHUB_REPOS',
  SELECT_GITHUB_REPO: 'SELECT_GITHUB_REPO',
  DESELECT_GITHUB_REPO: 'DESELECT_GITHUB_REPO',
  START_LOADING_DETAIL_GTIHUB_REPO: 'START_LOADING_DETAIL_GTIHUB_REPO',
  SET_ERROR_LOADING_GITHUB_DETAIL_REPO: 'SET_ERROR_LOADING_GITHUB_DETAIL_REPO',
  STOP_LOADING_DETAIL_GTIHUB_REPO: 'STOP_LOADING_DETAIL_GTIHUB_REPO',
  NO_GITHUB_TOKEN: 'NO_GITHUB_TOKEN',

  SELECT_GITLAB_PROVIDER_BUTTON: 'SELECT_GITLAB_PROVIDER_BUTTON',
  START_LOADING_GITLAB_REPOS: 'START_LOADING_GITLAB_REPOS',
  SET_ERROR_LOADING_GITLAB_REPOS: 'SET_ERROR_LOADING_GITLAB_REPOS',
  SET_GITLAB_REPOS: 'SET_GITLAB_REPOS',
  STOP_LOADING_GITLAB_REPOS: 'STOP_LOADING_GITLAB_REPOS',
  SELECT_GITLAB_REPO: 'SELECT_GITLAB_REPO',
  DESELECT_GITLAB_REPO: 'DESELECT_GITLAB_REPO',
  START_LOADING_DETAIL_GTILAB_REPO: 'START_LOADING_DETAIL_GTILAB_REPO',
  SET_ERROR_LOADING_GITLAB_DETAIL_REPO: 'SET_ERROR_LOADING_GITLAB_DETAIL_REPO',
  STOP_LOADING_DETAIL_GTILAB_REPO: 'STOP_LOADING_DETAIL_GTILAB_REPO',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SELECT_GITHUB_PROVIDER_BUTTON:
      return {
        ...state,
        buttonGitlabSelected: false,
        buttonGithubSelected: true,
      };

    case actions.START_LOADING_GITHUB_REPOS:
      return {
        ...state,
        loadingGithubRepos: true,
        errorLoadingGithubRepos: false,
      };
    case actions.SET_GITHUB_REPOS:
      return {
        ...state,
        githubRepos: action.data,
        loadingGithubRepos: false,
        errorLoadingGithubRepos: false,
        hasPermissionForPrivateRepos: action.hasPermision,
      };
    case actions.SET_ERROR_LOADING_GITHUB_REPOS:
      return {
        ...state,
        errorLoadingGithubRepos: action.data,
        loadingGithubRepos: false,
      };
    case actions.SELECT_GITHUB_REPO:
      return {
        ...state,
        selectedGithubRepo: action.data,
        errorLoadingGithubDetailsRespo: false,
      };
    case actions.DESELECT_GITHUB_REPO:
      return {
        ...state,
        selectedGithubRepo: null,
        errorLoadingGithubDetailsRespo: false,
      };
    case actions.SET_ERROR_LOADING_GITHUB_DETAIL_REPO:
      return {
        ...state,
        errorLoadingGithubDetailsRespo: true,
      };
    case actions.NO_GITHUB_TOKEN:
      return {
        ...state,
      };

    // GITLAB
    case actions.SELECT_GITLAB_PROVIDER_BUTTON:
      return {
        ...state,
        buttonGitlabSelected: true,
        buttonGithubSelected: false,
      };
    default:
      return state;
  }
};

const SyncButton = (props) => {
  // eslint-disable-next-line react/prop-types
  const { variant, Icon, handleSelect, text, syncProviderText } = props;
  return (
    <Grid item>
      <Button
        variant={variant}
        size="large"
        startIcon={<Icon fontSize="large" />}
        onClick={handleSelect}
      >
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant="body1"
            style={{ textTransform: 'none', fontSize: 10, textAlign: 'left' }}
          >
            {text}
          </Typography>
          <Typography variant="button" style={{ fontSize: 14, textAlign: 'left' }}>
            {syncProviderText}
          </Typography>
        </Box>
      </Button>
    </Grid>
  );
};

const SyncForm = (props) => {
  const { selectRepo } = props;
  // hooks
  const [state, dispatch] = useReducer(reducer, initialState);
  const greaterMdSize = useMediaQuery((theme) => theme.breakpoints.up('800'));
  const { lang } = useLang();
  const router = useRouter();

  // constants
  const maxTextLeng = greaterMdSize ? 150 : 35;
  const {
    buttonGithubSelected,
    loadingGithubRepos,
    errorLoadingGithubRepos,
    selectedGithubRepo,
    githubRepos,
    // detailsGithubRepoSelected,
    errorLoadingGithubDetailsRespo,
    buttonGitlabSelected,

    // loadingGitlabRepos,
    // errorLoadingGitlabRepos,
    selectedGitlabRepo,
    // gitlabRepos,
    // detailsGitlabRepoSelected,
    // errorLoadingGitlabDetailsRespo,
  } = state;

  // styles
  const stepStyles = useStepsStyles();
  const styles = useSyncStyles();

  // handlers
  const handleSelectGithubButton = useCallback(() => {
    dispatch({ type: actions.SELECT_GITHUB_PROVIDER_BUTTON });
  }, []);
  const handleSelectGitlabButton = useCallback(() => {
    dispatch({ type: actions.SELECT_GITLAB_PROVIDER_BUTTON });
  }, []);
  const handleSelectGithubRepo = (event) => {
    if (event.target.value && event.target.value.id) {
      dispatch({ type: actions.SELECT_GITHUB_REPO, data: event.target.value });
    } else {
      dispatch({ type: actions.SELECT_GITHUB_REPO });
    }
  };
  const handleNavigateToGetAccess = (provider, showPrivates) => {
    router.push(
      `/api/customAuth/providerLoginCall?provider=${provider}&showRepos=${
        showPrivates ? 'privates' : 'publics'
      }`
    );
  };

  // effect loading github repos
  useEffect(() => {
    if (Array.isArray(githubRepos) && githubRepos.length === 0 && buttonGithubSelected === true) {
      dispatch({ type: actions.START_LOADING_GITHUB_REPOS });
      // TODO: Implementarle paginacion y busqueda por repositorio (adaptar el componente que desarrollé para que permita realizar estas acciones)

      fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: getReposQuery('github'),
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
            if (data.errors[0].message === 'NO_GITHUB_TOKEN') {
              // handleNavigateToGetAccess('github', false);
              dispatch({ type: actions.SET_ERROR_LOADING_GITHUB_REPOS, data: 'NO_GITHUB_TOKEN' });
              return;
            }
            const error = new Error('Cant load api data');
            throw error;
          }
          let hasPermision = true;
          if (data.data.providerRepos.scopes === 'user') {
            hasPermision = false;
          }
          dispatch({
            type: actions.SET_GITHUB_REPOS,
            data: data.data.providerRepos.repos,
            hasPermision,
          });
        })
        .catch((err) => {
          console.log(err);
          dispatch({ type: actions.SET_ERROR_LOADING_GITHUB_REPOS, data: err.message });
        });
    }
  }, [buttonGithubSelected, githubRepos]);

  // effect loading details github repo
  useEffect(() => {
    if (selectedGithubRepo && selectedGithubRepo.id) {
      fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: getRepoData('github', selectedGithubRepo.id),
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
          selectRepo(data.data.providerRepoData);
        })
        .catch((err) => {
          // TODO: Handle error
          console.log(err);
          dispatch({ type: actions.SET_ERROR_LOADING_GITHUB_DETAIL_REPO });
        });
    }
  }, [selectedGithubRepo]);

  return (
    <Box className={stepStyles.mainContent}>
      <Box className={stepStyles.stepDescriptor}>
        <Typography align="center" variant="overline" className={stepStyles.stepDescriptionText}>
          {lang.syncStep.header.label}
        </Typography>
      </Box>

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
      </Grid>

      {buttonGithubSelected && (
        <Box className={styles.formcontrolWrapper}>
          {state.errorLoadingGithubRepos !== 'NO_GITHUB_TOKEN' && (
            <Box style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <FormControl variant="standard" className={styles.formControl} fullWidth>
                <InputLabel id="github-repos-select">
                  {lang.syncStep.body.select.githubLabel}
                </InputLabel>
                <Select
                  labelId="github-repos-select"
                  id="github-repos-select"
                  value={selectedGithubRepo || ''}
                  onChange={handleSelectGithubRepo}
                  label={lang.syncStep.body.select.githubLabel}
                  MenuProps={MenuProps}
                >
                  <MenuItem value={{ id: null, name: '' }}>
                    <em>{lang.syncStep.body.select.selectNone}</em>
                  </MenuItem>
                  {Array.isArray(githubRepos) &&
                    githubRepos.map((repository) => (
                      <MenuItem value={repository} key={repository.id}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {greaterMdSize && (
                            <Avatar
                              alt={repository.ownerLogin}
                              src={repository.ownerAvatarUrl}
                              variant="circular"
                              className={styles.smallAvatar}
                            />
                          )}

                          <div>
                            <Typography variant="body1">
                              {greaterMdSize ? repository.nameWithOwner : repository.name}
                              {repository.isPrivate && (
                                <Typography variant="caption" color="primary">
                                  {` (${lang.syncStep.body.select.private})`}
                                </Typography>
                              )}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {`${
                                repository.description != null
                                  ? `${repository.description.slice(0, maxTextLeng)}${
                                      repository.description.length > maxTextLeng ? '...' : ''
                                    } `
                                  : ''
                              }`}
                            </Typography>
                          </div>
                        </div>
                      </MenuItem>
                    ))}
                </Select>
                {errorLoadingGithubRepos && (
                  <FormLabel error>{lang.syncStep.body.select.errorLoadingReposMsg}</FormLabel>
                )}
                {errorLoadingGithubDetailsRespo && (
                  <FormLabel error>
                    {lang.syncStep.body.select.errorLoadingDetailsReposMsg}
                  </FormLabel>
                )}
              </FormControl>
            </Box>
          )}
          {loadingGithubRepos && <LinearProgress className={styles.progress} />}
          {!state.hasPermissionForPrivateRepos && (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<LockIcon />}
              style={{ margin: 8, width: 180 }}
              onClick={() => handleNavigateToGetAccess('github', true)}
            >
              {lang.syncStep.body.buttons.grantPrivateAccess}
            </Button>
          )}
          {state.errorLoadingGithubRepos === 'NO_GITHUB_TOKEN' && (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<LockOpenIcon />}
              style={{ margin: 8, width: 180 }}
              onClick={() => handleNavigateToGetAccess('github', false)}
            >
              {lang.syncStep.body.buttons.grantPublicAccess}
            </Button>
          )}
        </Box>
      )}
      {buttonGitlabSelected && (
        <Box className={styles.formcontrolWrapper}>
          <FormControl variant="standard" className={styles.formControl} fullWidth>
            <InputLabel id="gitlab-repos-select">
              {lang.syncStep.body.select.gitlabLabel}
            </InputLabel>
            <Select
              labelId="gitlab-repos-select"
              id="gitlab-repos-select"
              value={selectedGitlabRepo || ''}
              // onChange={handleChange}
              label={lang.syncStep.body.select.gitlabLabel}
              MenuProps={MenuProps}
            >
              <MenuItem value={{ id: null, name: '' }}>
                <em>{lang.syncStep.body.select.selectNone}</em>
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}
    </Box>
  );
};

SyncForm.propTypes = {
  selectRepo: PropTypes.func.isRequired,
};

export default React.memo(SyncForm);
