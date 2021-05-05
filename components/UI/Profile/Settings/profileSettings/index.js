import React, { useState, useReducer } from 'react';
import PropTypes from 'prop-types';
import { signOut } from 'next-auth/client';
import {
  Typography,
  Button,
  Box,
  Divider,
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

const saveUser = `
    mutation updateUser($userId: ID!, $user: UserParams!) {
      updateUser(userId: $userId, user: $user){
        code
        success
        message
        user {
          slug
          publicProfile
        }
      }
    }
`;

const deleteProfile = `
mutation deleteProfile ($id: ID!){
  deleteProfile(id:$id){
    code
    success
    message
  }
}  
`;

const initialState = {
  slug: '',
  slugValid: true,
  saving: false,
  dirty: false,
};
const actions = {
  CHANGE_TEXT: 'CHANGE_TEXT',
  SAVE: 'SAVE',
  SAVED: 'SAVED',
  ERROR_SAVING: 'ERROR_SAVING',
  DELETE_ERROR: 'DELETE_ERROR',

  SWITCH_VISIBILITY: 'SWITCH_VISIBILITY',
  VISIBILITY_SWITCHED: 'VISIBILITY_SWITCHED',
  SWITCHED_VISIBILITY_ERROR: 'SWITCHED_VISIBILITY_ERROR',
};
const reducer = (state, action) => {
  switch (action.type) {
    case actions.CHANGE_TEXT:
      return {
        ...state,
        slug: action.text,
        slugValid: action.valid,
        dirty: true,
      };
    case actions.SAVE:
      return {
        ...state,
        saving: true,
      };
    case actions.SAVED:
      return {
        ...state,
        saving: false,
        dirty: false,
      };
    case actions.ERROR_SAVING:
      return {
        ...state,
        saving: false,
        slug: action.originalSlug,
        dirty: false,
      };
    case actions.DELETE_ERROR:
      return {
        ...state,
        saving: false,
      };
    case actions.SWITCH_VISIBILITY:
      return {
        ...state,
        saving: true,
      };
    case actions.VISIBILITY_SWITCHED:
      return {
        ...state,
        saving: false,
      };
    case actions.SWITCHED_VISIBILITY_ERROR:
      return {
        ...state,
        saving: false,
      };
    default:
      return state;
  }
};

const ProfileSettings = (props) => {
  const { hidden } = props;
  const styles = useStyles();
  const [deleteField, setDeleteField] = useState('');
  const { lang } = useLang();
  const { user } = useProfile();
  const [showMessage] = useMessage();
  const changeProfile = useChangeProfile();
  const { fetchUri, getUri } = useUserPage();
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    slug: user.slug,
  });

  const handleChange = (event) => {
    const text = event.target.value.toLowerCase();
    const isValid = /^[a-z][a-z0-9-]{3,98}[a-z0-9]$/.test(text);
    dispatch({ type: actions.CHANGE_TEXT, text, valid: isValid });
  };

  const handleSaveSlug = async () => {
    if (state.slugValid && state.slug !== user.slug) {
      dispatch({ type: actions.SAVE });
      fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: saveUser,
          variables: {
            userId: user.id,
            user: {
              slug: state.slug,
            },
          },
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
        })
        .then((data) => {
          if (data.data.updateUser.success) {
            dispatch({ type: actions.SAVED });
            changeProfile({ slug: data.data.updateUser.user.slug });
            fetchUri(state.slug);
            showMessage(lang.settings.msg.userSlugSaved, 'success');
            return;
          }
          throw new Error(data.data.updateUser.message);
        })
        .catch(() => {
          dispatch({ type: actions.ERROR_SAVING, originalSlug: user.slug });
          showMessage(lang.settings.msg.userSlugSavedError, 'error');
        });
    }
  };

  const handleDelete = () => {
    showMessage(
      lang.settings.msg.deleteUserProfile,
      'warning',
      null,
      {
        action: (close) => {
          close();
          dispatch({ type: actions.SAVE });
          fetch('/api/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: deleteProfile,
              variables: {
                id: user.id,
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
              if (resp.data.deleteProfile.success) {
                fetchUri(state.slug);
                signOut({
                  callbackUrl: '/',
                });
                return;
              }
              throw new Error(resp.data.deleteProfile.message);
            })
            .catch(() => {
              dispatch({ type: actions.DELETE_ERROR });
              showMessage(lang.settings.msg.errorDeletingProfile, 'error');
            });
        },
        text: lang.settings.yes,
      },
      {
        action: (close) => close(),
        text: lang.settings.no,
      }
    );
  };

  const handleChangeDeleteField = (event) => {
    setDeleteField(event.target.value.toUpperCase());
  };

  const handleChangeUserVisbility = (event, checked) => {
    dispatch({ type: actions.SWITCH_VISIBILITY });
    fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: saveUser,
        variables: {
          userId: user.id,
          user: {
            publicProfile: checked,
          },
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
        if (resp.data.updateUser.success) {
          dispatch({ type: actions.VISIBILITY_SWITCHED });

          changeProfile({ publicProfile: checked });
          fetchUri(state.slug);
          showMessage(lang.settings.msg.userVisibilityChanged, 'success');
          return;
        }
        throw new Error(resp.data.updateUser.message);
      })
      .catch(() => {
        dispatch({ type: actions.SWITCHED_VISIBILITY_ERROR });
        showMessage(lang.settings.msg.errorChangingUserVisibility, 'error');
      });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getUri(state.slug));
    showMessage(lang.settings.msg.urlCopied, 'info');
  };

  return (
    <>
      <Box hidden={hidden}>
        <Typography variant="h5">{lang.settings.profileSettings}</Typography>
        <Divider style={{ marginBottom: 8 }} />
        <Box mt={1} p={2} className={styles.bordered}>
          <Typography>{lang.settings.publicUrl}</Typography>
          <Box className={[styles.flexRow, styles.spaceBetWeen].join(' ')}>
            <Typography color="textSecondary" style={{ display: 'flex', flexFlow: 'wrap' }}>
              {`${getUri()}/`}
              <Typography color="primary">{`${state.slug}`}</Typography>
            </Typography>
            <Button
              size="small"
              variant="outlined"
              className={styles.butotonMargin}
              onClick={handleCopy}
              color="secondary"
              disabled={state.dirty}
            >
              {lang.buttons.copy}
            </Button>
          </Box>
          <Box className={[styles.flexRow, styles.spaceBetWeen].join(' ')}>
            <TextField
              autoFocus
              margin="dense"
              label={lang.publicUrl.label}
              fullWidth
              value={state.slug}
              onChange={handleChange}
              helperText={state.slugValid ? lang.publicUrl.helperText : lang.publicUrl.errorText}
              error={!state.slugValid}
            />
            <Button
              size="small"
              variant="outlined"
              onClick={handleSaveSlug}
              color="secondary"
              className={styles.butotonMargin}
              disabled={!state.dirty || !state.slugValid}
            >
              {lang.buttons.save}
            </Button>
          </Box>
          <Typography variant="subtitle2">{lang.publicUrl.note}</Typography>
        </Box>

        <Box mt={2} p={2} className={[styles.bordered, styles.flexSpaced].join(' ')}>
          <FormControlLabel
            control={
              <Switch
                color="primary"
                checked={user.publicProfile}
                onChange={handleChangeUserVisbility}
              />
            }
            label={lang.settings.profileSwitchText}
          />
          {user.publicProfile && <VisibilityIcon color="primary" />}
          {!user.publicProfile && <VisibilityOffIcon color="disabled" />}
        </Box>

        <Box mt={2} p={2} className={styles.bordered}>
          <Box style={{ display: 'flex' }}>
            <WarningIcon style={{ marginRight: 8, color: yellow[500] }} color="primary" />
            <Typography>{lang.settings.deleteProfile}</Typography>
          </Box>
          <Typography variant="overline" className={styles.text}>
            {lang.settings.deleteProfileDesc}
          </Typography>
          <Box mb={2} className={styles.delete}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              value={deleteField}
              onChange={handleChangeDeleteField}
            />
            <Button
              variant="outlined"
              color="primary"
              style={{ marginLeft: 8 }}
              disabled={deleteField !== 'DELETE'}
              onClick={handleDelete}
            >
              {lang.settings.delete}
            </Button>
          </Box>
          <Typography variant="subtitle2" color="primary">
            {lang.settings.deleteNote}
          </Typography>
        </Box>
      </Box>
      <Backdrop open={state.saving} />
    </>
  );
};
ProfileSettings.propTypes = {
  hidden: PropTypes.bool.isRequired,
};

export default ProfileSettings;
