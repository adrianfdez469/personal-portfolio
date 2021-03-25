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
  FormLabel,
  Grid,
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/LockOutlined';
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';

import { useRouter } from 'next/router';
// components
import StepItem from '../../../../components/UI/StepForm/StepItem';
import SyncButton from '../../../../components/UI/Buttons/SyncButton';
import Backdrop from '../../../../components/UI/backdrop';
// hooks
import { useLang } from '../../../../store/contexts/langContext';
// Styles
import useSyncStyles from './styles';
// Custom icons
import GitLabIcon from '../../../../components/UI/icons/GitlabIcon';
// TODO: Sacar estas consultas de aqui y ponerlas en un lugar determinado para esto
const getReposQuery = `
  query getRepos($provider: devProviders!) {
    providerRepos(provider: $provider){
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

const getRepoData = `
  query repoData($provider: devProviders!, $id: ID!) {
    providerRepoData(provider: $provider, id: $id ) {
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
      topics
      collaborators {
        login
        avatarUrl
        email
        bio
        name
        url
        isOwner
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

const initialState = {
  providerSelected: false,
  loadingProviderRepos: false,
  errorLoadingProviderRepos: false,
  providerRepos: [],
  selectedProviderRepo: { id: null },
  errorLoadingProviderDetailsRespo: false,
  hasPermissionForPrivateRepos: false,
};

const actions = {
  SELECT_PROVIDER_BUTTON: 'SELECT_PROVIDER_BUTTON',
  START_LOADING_PROVIDER_REPOS: 'START_LOADING_PROVIDER_REPOS',
  SET_ERROR_LOADING_PROVIDER_REPOS: 'SET_ERROR_LOADING_PROVIDER_REPOS',
  SET_PROVIDER_REPOS: 'SET_PROVIDER_REPOS',
  SELECT_PROVIDER_REPO: 'SELECT_PROVIDER_REPO',
  DESELECT_PROVIDER_REPO: 'DESELECT_PROVIDER_REPO',
  // START_LOADING_DETAIL_PROVIDER_REPO: 'START_LOADING_DETAIL_PROVIDER_REPO',
  SET_ERROR_LOADING_PROVIDER_DETAIL_REPO: 'SET_ERROR_LOADING_PROVIDER_DETAIL_REPO',
  // STOP_LOADING_DETAIL_PROVIDER_REPO: 'STOP_LOADING_DETAIL_PROVIDER_REPO',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SELECT_PROVIDER_BUTTON:
      return {
        ...state,
        providerSelected: action.value,
      };
    case actions.START_LOADING_PROVIDER_REPOS:
      return {
        ...state,
        loadingProviderRepos: true,
        errorLoadingProviderRepos: false,
      };
    case actions.SET_ERROR_LOADING_PROVIDER_REPOS:
      return {
        ...state,
        errorLoadingProviderRepos: action.data,
        loadingProviderRepos: false,
      };
    case actions.SET_PROVIDER_REPOS:
      return {
        ...state,
        providerRepos: action.data,
        loadingProviderRepos: false,
        errorLoadingProviderRepos: false,
        hasPermissionForPrivateRepos: action.hasPermision,
      };
    case actions.SELECT_PROVIDER_REPO:
      return {
        ...state,
        selectedProviderRepo: action.data,
        errorLoadingProviderDetailsRespo: false,
      };
    case actions.DESELECT_PROVIDER_REPO:
      return {
        ...state,
        selectedProviderRepo: null,
        errorLoadingProviderDetailsRespo: false,
      };
    case actions.SET_ERROR_LOADING_PROVIDER_DETAIL_REPO:
      return {
        ...state,
        errorLoadingProviderDetailsRespo: true,
      };
    default:
      return state;
  }
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
    providerSelected,
    loadingProviderRepos,
    errorLoadingProviderRepos,
    providerRepos,
    selectedProviderRepo,
    errorLoadingProviderDetailsRespo,
    hasPermissionForPrivateRepos,
  } = state;

  // styles

  const styles = useSyncStyles();

  const handleNavigateToGetAccess = useCallback(
    (provider, scope = '') => {
      const arrPath = router.asPath.split('?');
      const path = arrPath[0];
      router.push(
        `/api/customAuth/providerLoginCall?provider=${provider}${scope}&originalPath=${path}?provider=${provider}`
      );
    },
    [router]
  );

  // handlers
  const handleClickProviderButton = (provider) => {
    const newArrPath = router.asPath.split('?');
    const path = `${newArrPath[0]}?provider=${provider}`;
    router.push(path, null, { shallow: true });
  };

  const loadProviderRepos = (provider) => {
    dispatch({ type: actions.START_LOADING_PROVIDER_REPOS });

    fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: getReposQuery,
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
        if (data.errors && data.errors.length > 0) {
          if (data.errors[0].message === 'NO_PROVIDER_TOKEN') {
            dispatch({ type: actions.SET_ERROR_LOADING_PROVIDER_REPOS, data: 'NO_PROVIDER_TOKEN' });
            if (providerSelected === 'gitlab') {
              handleNavigateToGetAccess('gitlab', '&scope=read_user+openid+profile+email+read_api');
            }
            return;
          }
          const error = new Error('Cant load api data');
          throw error;
        }
        let hasPermision = true;
        if (provider === 'github') {
          if (data.data.providerRepos.scopes !== 'read:user, repo, user:email') {
            hasPermision = false;
          }
        }

        dispatch({
          type: actions.SET_PROVIDER_REPOS,
          data: data.data.providerRepos.repos,
          hasPermision,
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: actions.SET_ERROR_LOADING_PROVIDER_REPOS, data: err.message });
        dispatch({
          type: actions.SET_PROVIDER_REPOS,
          data: null,
        });
        selectRepo(null);
      });
  };

  const handleSelectButton = (provider) => {
    dispatch({ type: actions.SELECT_PROVIDER_BUTTON, value: provider });
    loadProviderRepos(provider);
  };

  const handleSelectProviderRepo = (event) => {
    if (!event.target.value || !event.target.value.id) {
      dispatch({ type: actions.DESELECT_PROVIDER_REPO });
      selectRepo(null);
      return;
    }

    dispatch({ type: actions.SELECT_PROVIDER_REPO, data: event.target.value });

    fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: getRepoData,
        variables: {
          provider: providerSelected,
          id: event.target.value.id,
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
        selectRepo(data.data.providerRepoData);
      })
      .catch((err) => {
        // TODO: Handle error
        console.error(err);
        dispatch({ type: actions.SET_ERROR_LOADING_PROVIDER_DETAIL_REPO });
      });
  };

  useEffect(() => {
    if (router.query.provider) {
      handleSelectButton(router.query.provider);
    }
  }, [router.query.provider]);

  return (
    <StepItem label={lang.syncStep.header.label}>
      <Grid container justify="center" spacing={4}>
        <SyncButton
          variant={providerSelected === 'github' ? 'contained' : 'outlined'}
          Icon={GitHubIcon}
          handleSelect={() => handleClickProviderButton('github')}
          text={lang.syncStep.body.buttons.common}
          syncProviderText="Github"
        />
        <SyncButton
          variant={providerSelected === 'gitlab' ? 'contained' : 'outlined'}
          Icon={GitLabIcon}
          handleSelect={() => handleClickProviderButton('gitlab')}
          text={lang.syncStep.body.buttons.common}
          syncProviderText="Gitlab"
        />
      </Grid>

      {providerSelected && (
        <Box className={styles.formcontrolWrapper}>
          {errorLoadingProviderRepos !== 'NO_PROVIDER_TOKEN' && (
            <Box style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <FormControl variant="standard" className={styles.formControl} fullWidth>
                {!loadingProviderRepos && (
                  <>
                    <InputLabel id="repos-select">
                      {providerSelected === 'github'
                        ? lang.syncStep.body.select.githubLabel
                        : lang.syncStep.body.select.gitlabLabel}
                    </InputLabel>
                    <Select
                      labelId="repos-select"
                      id="repos-select"
                      value={selectedProviderRepo || ''}
                      onChange={handleSelectProviderRepo}
                      label={lang.syncStep.body.select.githubLabel}
                      MenuProps={MenuProps}
                    >
                      <MenuItem value={{ id: null, name: '' }}>
                        <em>{lang.syncStep.body.select.selectNone}</em>
                      </MenuItem>
                      {Array.isArray(providerRepos) &&
                        providerRepos.map((repository) => (
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
                  </>
                )}
                {errorLoadingProviderRepos && (
                  <FormLabel error>{lang.syncStep.body.select.errorLoadingReposMsg}</FormLabel>
                )}
                {errorLoadingProviderDetailsRespo && (
                  <FormLabel error>
                    {lang.syncStep.body.select.errorLoadingDetailsReposMsg}
                  </FormLabel>
                )}
              </FormControl>
            </Box>
          )}
          {!hasPermissionForPrivateRepos && !loadingProviderRepos && !errorLoadingProviderRepos && (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<LockIcon />}
              style={{ margin: 8, width: 180 }}
              onClick={() => {
                if (providerSelected === 'github') {
                  handleNavigateToGetAccess('github', '&scope=repo,read:user,user:email');
                }
                if (providerSelected === 'gitlab') {
                  handleNavigateToGetAccess('gitlab', '&scope=read_repository');
                }
              }}
            >
              {lang.syncStep.body.buttons.grantPrivateAccess}
            </Button>
          )}
          {errorLoadingProviderRepos === 'NO_PROVIDER_TOKEN' && providerSelected === 'github' && (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<LockOpenIcon />}
              style={{ margin: 8, width: 180 }}
              onClick={() => {
                if (providerSelected === 'github') {
                  handleNavigateToGetAccess('github', '');
                }
              }}
            >
              {lang.syncStep.body.buttons.grantPublicAccess}
            </Button>
          )}
        </Box>
      )}

      <Backdrop open={loadingProviderRepos} />
    </StepItem>
  );
};

SyncForm.propTypes = {
  selectRepo: PropTypes.func.isRequired,
};

export default React.memo(SyncForm);
