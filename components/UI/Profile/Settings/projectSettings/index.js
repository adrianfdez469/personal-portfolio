import React, { useEffect, useCallback, useReducer } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Button,
  Box,
  Divider,
  FormControl,
  Select,
  MenuItem,
  TextField,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import { yellow } from '@material-ui/core/colors';
import WarningIcon from '@material-ui/icons/Warning';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useLang } from '../../../../../store/contexts/langContext';
import { useProfile, useChangeProfile } from '../../../../../store/contexts/profileContext';
import useUserPage from '../../../../../hooks/useUserPage';
import useMessage from '../../../../../hooks/useMessage';
import useStyles from '../styles';
import Backdrop from '../../../backdrop';

const getProjectsQuery = `
query getUserProjects($id: ID!) {
  user (id:$id) {
    id
    projects{
      id
      name
      description
      projectSlug
      publicProject
    }
  }
}
`;

const changeProjectVisibility = `
mutation updateProjectVisibility($id: ID!, $visibility: Boolean!) {
  changeProjectVisibility(id: $id, visibility: $visibility){
    code
    success
    message
    project {
      id
      publicProject
    }
  }
}
`;

const deleteProject = `
mutation deleteProject($projectId:ID!) {
  deleteProject(id:$projectId){
    code
    success
    message
  }
}
`;

const initialState = {
  projects: [],
  selectedProject: null,
  loading: false,
  deleteField: '',
};

const actions = {
  SET_PROJECTS: 'SET_PROJECTS',
  SELECT_PROJECT: 'SELECT_PROJECT',
  CHANGE_VISIBILITY: 'CHANGE_VISIBILITY',
  START_LOADING: 'START_LOADING',
  STOP_LOADING: 'STOP_LOADING',
  CHANGE_DELETE_FIELD: 'CHANGE_DELETE_FIELD',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.CHANGE_DELETE_FIELD:
      return {
        ...state,
        deleteField: action.data.toUpperCase(),
      };
    case actions.START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actions.STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    case actions.SET_PROJECTS:
      return {
        ...state,
        projects: action.data,
      };
    case actions.SELECT_PROJECT: {
      return {
        ...state,
        selectedProject: state.projects.find((project) => +project.id === +action.data.id),
      };
    }
    case actions.CHANGE_VISIBILITY: {
      const projects = state.projects.map((project) => {
        if (+project.id === +action.data.id) {
          return {
            ...project,
            publicProject: action.data.visibility,
          };
        }
        return project;
      });

      return {
        ...state,
        projects,
        selectedProject: projects.find((project) => +project.id === +action.data.id),
      };
    }
    default:
      return state;
  }
};

const ProjectSettings = (props) => {
  const { hidden } = props;
  const { user } = useProfile();
  const changeProfile = useChangeProfile();
  const { lang } = useLang();
  const [showMessage] = useMessage();
  const { fetchUri } = useUserPage();
  const [state, dispatch] = useReducer(reducer, initialState);
  const styles = useStyles();

  const handleSelectProject = (event) => {
    dispatch({ type: actions.SELECT_PROJECT, data: event.target.value });
  };

  const handleChangeDeleteField = (event) => {
    dispatch({ type: actions.CHANGE_DELETE_FIELD, data: event.target.value });
  };

  const loadProjects = useCallback(() => {
    fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: getProjectsQuery,
        variables: {
          id: user.id,
        },
      }),
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error('ERROR');
      })
      .then((resp) => {
        dispatch({ type: actions.SET_PROJECTS, data: resp.data.user.projects });
      })
      .catch(() => {
        showMessage(lang.settings.msg.errorLoadingProjects, 'error');
      });
  }, []);

  const handleDelete = useCallback(() => {
    showMessage(
      lang.settings.msg.deleteProject,
      'warning',
      null,
      {
        action: (close) => {
          close();
          dispatch({ type: actions.START_LOADING });
          fetch('/api/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: deleteProject,
              variables: {
                projectId: state.selectedProject.id,
              },
            }),
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              }
              throw new Error(response.statusText);
            })
            .then((resp) => {
              if (resp.data.deleteProject.success) {
                showMessage(lang.settings.msg.projectDeleted, 'success');
                if (user.publicProfile) {
                  fetchUri(user.slug);
                  if (state.selectedProject.publicSlug) {
                    fetchUri(`${user.slug}/${state.selectedProject.projectSlug}`);
                  }
                }
                dispatch({
                  type: actions.SET_PROJECTS,
                  data: state.projects.filter((p) => +p.id !== +state.selectedProject.id),
                });
                changeProfile({
                  projects: user.projects.filter((p) => +p.id !== +state.selectedProject.id),
                });
                return;
              }
              throw new Error(resp.data.deleteProject.message);
            })
            .catch(() => {
              showMessage(lang.settings.msg.errorDeletingProfile, 'error');
            })
            .finally(() => {
              dispatch({ type: actions.STOP_LOADING });
            });
        },
        text: lang.settings.yes,
      },
      {
        action: (close) => close(),
        text: lang.settings.no,
      }
    );
  }, [state.selectedProject]);

  const handleChangeVisbility = useCallback(
    (event, checked) => {
      fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: changeProjectVisibility,
          variables: {
            id: state.selectedProject.id,
            visibility: checked,
          },
        }),
      })
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error('ERROR');
        })
        .then((resp) => {
          if (resp.data.changeProjectVisibility.success) {
            showMessage(lang.settings.msg.visibilityChanged, 'success');

            dispatch({
              type: actions.CHANGE_VISIBILITY,
              data: {
                id: state.selectedProject.id,
                visibility: checked,
              },
            });

            return;
          }
          throw new Error('ERROR');
        })
        .catch(() => {
          showMessage(lang.settings.msg.errorSwtchingProjectVisibility, 'error');
        });
    },
    [state.selectedProject]
  );

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return (
    <>
      <Box hidden={hidden}>
        <Typography variant="h5">{lang.settings.projectSettings}</Typography>
        <Divider />
        <Box mt={1}>
          <Typography variant="h6">{lang.settings.selectProject}</Typography>
          <FormControl style={{ width: '100%', margin: '8px 0' }} variant="outlined">
            <Select
              value={state.selectedProject}
              onChange={handleSelectProject}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              fullWidth
            >
              <MenuItem value="">
                <em>{lang.settings.none}</em>
              </MenuItem>
              {state.projects.map((project) => (
                <MenuItem key={project.id} value={project}>
                  <Box>
                    <Typography variant="body1">{project.name}</Typography>
                    <Typography variant="caption">{project.description}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box mt={1} p={2} className={[styles.bordered, styles.flexSpaced].join(' ')}>
            <FormControlLabel
              control={
                <Switch
                  checked={state.selectedProject && state.selectedProject.publicProject}
                  onChange={handleChangeVisbility}
                  disabled={!state.selectedProject}
                />
              }
              label={lang.settings.projectSettingText1}
            />
            {state.selectedProject && state.selectedProject.publicProject && <VisibilityIcon />}
            {state.selectedProject && !state.selectedProject.publicProject && <VisibilityOffIcon />}
          </Box>

          <Box mt={2} p={2} className={styles.bordered}>
            <Box style={{ display: 'flex' }}>
              <WarningIcon style={{ marginRight: 8, color: yellow[600] }} />
              <Typography>{lang.settings.deleteProject}</Typography>
            </Box>
            <Typography variant="overline" className={styles.text}>
              {lang.settings.deleteProjectDesc}
            </Typography>
            <Box className={styles.delete}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                value={state.deleteField}
                onChange={handleChangeDeleteField}
                disabled={!state.selectedProject}
              />
              <Button
                variant="outlined"
                color="primary"
                className={styles.button}
                disabled={state.deleteField !== 'DELETE' || !state.selectedProject}
                onClick={handleDelete}
              >
                {lang.settings.delete}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Backdrop open={state.loading} />
    </>
  );
};
ProjectSettings.propTypes = {
  hidden: PropTypes.bool.isRequired,
};

export default ProjectSettings;
