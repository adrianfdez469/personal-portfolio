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
import { getSession } from 'next-auth/client';
// Components
import ProjectStep from '../ProjectStep';
// Styles
import { useStepsStyles } from '../../styles';
import useSyncStyles from './styles';
// Custom icons
import GitLabIcon from '../../../../components/UI/icons/GitlabIcon';

export const SYNC = 'SYNC';

// TODO: Sacar estas consultas de aqui y ponerlas en un lugar determinado para esto
const getReposQuery = (first) => `
  query { 
    viewer { 
      login
      avatarUrl
      repositories(first:${first}){
        nodes{
          id
          name
          description
          shortDescriptionHTML(limit:150)
          nameWithOwner
          owner {
            id
            login
            avatarUrl
          }
          isFork
          parent {
            nameWithOwner
          }
        }
      }
    }
  }`;
const getRepoData = (owner, name) => `
query {
  repository(owner: "${owner}", name: "${name}" ) {
    id
    name
    description
    shortDescriptionHTML(limit:150)
    openGraphImageUrl
    owner {
      login
    }
    primaryLanguage {
      name
      color
    }
    languages(first: 50){
      nodes{
        name
        color
      }
    }
    
    homepageUrl
    createdAt
    nameWithOwner 
    parent{
      name
      nameWithOwner
    }
    isFork
    updatedAt
    pushedAt
    url
    stargazerCount
    forkCount

    mentionableUsers (first: 6) {
      nodes {
        login
        avatarUrl
        email
        bio
        isViewer
        location
        name
        url
      }
      totalCount
    }
    deployments(last:1) {
      nodes {
        environment
        latestStatus {
          environmentUrl #Este es el tipo
        }
      }
    }
  }
}
  `;

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
        // ...initialGitlabState,
        loadingGithubRepos: true,
      };
    case actions.SET_GITHUB_REPOS:
      return {
        ...state,
        // ...initialGitlabState,
        githubRepos: action.data,
        loadingGithubRepos: false,
        errorLoadingGithubRepos: false,
      };
    case actions.SET_ERROR_LOADING_GITHUB_REPOS:
      return {
        ...state,
        errorLoadingGithubRepos: true,
        loadingGithubRepos: false,
      };
    case actions.SELECT_GITHUB_REPO:
      return {
        ...state,
        selectedGithubRepo: action.data,
      };
    case actions.DESELECT_GITHUB_REPO:
      return {
        ...state,
        selectedGithubRepo: null,
      };
    case actions.SET_ERROR_LOADING_GITHUB_DETAIL_REPO:
      return {
        ...state,
        errorLoadingGithubDetailsRespo: true,
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

export const SyncForm = (props) => {
  const { stepId, selectRepo } = props;

  // hooks
  const [state, dispatch] = useReducer(reducer, initialState);
  const greaterMdSize = useMediaQuery((theme) => theme.breakpoints.up('800'));

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

  // effect loading github repos
  useEffect(() => {
    if (githubRepos.length === 0 && buttonGithubSelected === true) {
      dispatch({ type: actions.START_LOADING_GITHUB_REPOS });
      // TODO: Implementarle paginacion y busqueda por repositorio (adaptar el componente que desarrollé para que permita realizar estas acciones)

      getSession()
        .then((session) => {
          if (session && session.accessToken) {
            return fetch('https://api.github.com/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.accessToken}`,
              },
              body: JSON.stringify({
                query: getReposQuery(50),
              }),
            });
          }
          const error = new Error('No session found');
          error.status = 401;
          throw error;
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
          dispatch({ type: actions.SET_GITHUB_REPOS, data: data.data.viewer.repositories.nodes });
        })
        .catch(() => {
          // TODO: Handle error
          dispatch({ type: actions.SET_ERROR_LOADING_GITHUB_REPOS });
        });
    }
  }, [buttonGithubSelected, githubRepos]);

  // effect loading details github repo
  useEffect(() => {
    if (selectedGithubRepo && selectedGithubRepo.owner && selectedGithubRepo.name) {
      getSession()
        .then((session) => {
          if (session && session.accessToken) {
            return fetch('https://api.github.com/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.accessToken}`,
              },
              body: JSON.stringify({
                query: getRepoData(selectedGithubRepo.owner.login, selectedGithubRepo.name),
              }),
            });
          }
          const error = new Error('No session found');
          error.status = 401;
          throw error;
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
          selectRepo('github', data.data.repository);
        })
        .catch(() => {
          // TODO: Handle error
          dispatch({ type: actions.SET_ERROR_LOADING_GITHUB_DETAIL_REPO });
        });
    }
  }, [selectedGithubRepo.id]);

  return (
    <Box className={stepStyles.mainContent} hidden={stepId !== SYNC}>
      <Box className={stepStyles.stepDescriptor}>
        <Typography align="center" variant="overline" className={stepStyles.stepDescriptionText}>
          Si tienes tu proyecto en GitHub o GitLab sincronizalo y muestranos lo que haz logrado!
        </Typography>
      </Box>

      <Grid container justify="center" spacing={4}>
        <Grid item>
          <Button
            variant={buttonGithubSelected ? 'contained' : 'outlined'}
            size="large"
            startIcon={<GitHubIcon fontSize="large" />}
            onClick={handleSelectGithubButton}
          >
            <Box style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                variant="body1"
                style={{ textTransform: 'none', fontSize: 10, textAlign: 'left' }}
              >
                Sincroniza con
              </Typography>
              <Typography variant="button" style={{ fontSize: 14, textAlign: 'left' }}>
                Github
              </Typography>
            </Box>
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant={buttonGitlabSelected ? 'contained' : 'outlined'}
            size="large"
            startIcon={<GitLabIcon fontSize="large" />}
            onClick={handleSelectGitlabButton}
          >
            <Box style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                variant="body1"
                style={{ textTransform: 'none', fontSize: 10, textAlign: 'left' }}
              >
                Sincroniza con
              </Typography>
              <Typography variant="button" style={{ fontSize: 14, textAlign: 'left' }}>
                Gitlab
              </Typography>
            </Box>
          </Button>
        </Grid>
      </Grid>

      {buttonGithubSelected && (
        <Box className={styles.formcontrolWrapper}>
          <FormControl variant="standard" className={styles.formControl} fullWidth>
            <InputLabel id="github-repos-select">Repositorios de Github</InputLabel>
            <Select
              labelId="github-repos-select"
              id="github-repos-select"
              value={selectedGithubRepo || ''}
              onChange={handleSelectGithubRepo}
              label="Repositorios de Github"
              MenuProps={MenuProps}
            >
              <MenuItem value={{ id: null, name: '' }}>
                <em>Ninguno</em>
              </MenuItem>
              {githubRepos.map((repository) => (
                <MenuItem value={repository} key={repository.id}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {greaterMdSize && (
                      <Avatar
                        alt={repository.owner.login}
                        src={repository.owner.avatarUrl}
                        variant="circular"
                        className={styles.smallAvatar}
                      />
                    )}

                    <div>
                      <Typography variant="body1">
                        {greaterMdSize ? repository.nameWithOwner : repository.name}
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
              <FormLabel error>No se pudieron cargar los repositorios</FormLabel>
            )}
            {errorLoadingGithubDetailsRespo && <FormLabel error>Algo pudo salir mal</FormLabel>}
          </FormControl>
          {loadingGithubRepos && <LinearProgress className={styles.progress} />}
        </Box>
      )}
      {buttonGitlabSelected && (
        <Box className={styles.formcontrolWrapper}>
          <FormControl variant="standard" className={styles.formControl} fullWidth>
            <InputLabel id="gitlab-repos-select">Repositorios de Gitlab</InputLabel>
            <Select
              labelId="gitlab-repos-select"
              id="gitlab-repos-select"
              value={selectedGitlabRepo || ''}
              // onChange={handleChange}
              label="Repositorios de Gitlab"
              MenuProps={MenuProps}
            >
              <MenuItem value={{ id: null, name: '' }}>
                <em>Ninguno</em>
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}
    </Box>
  );
};

SyncForm.propTypes = {
  stepId: PropTypes.string.isRequired,
  selectRepo: PropTypes.func.isRequired,
};

export const syncObj = new ProjectStep(SYNC, 'Sincroniza tu proyecto');
