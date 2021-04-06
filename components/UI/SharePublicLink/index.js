import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import { getSession } from 'next-auth/client';
import Backdrop from '../backdrop';
import useUserPage from '../../../hooks/useUserPage';
import { useProfile, useChangeProfile } from '../../../store/contexts/profileContext';
import { useLang } from '../../../store/contexts/langContext';

import useStyles from './styles';

const saveUserSlug = `
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

const initialState = {
  slug: '',
  slugValid: true,
  saving: false,
};
const actions = {
  CHANGE_TEXT: 'CHANGE_TEXT',
  SAVE: 'SAVE',
  SAVED: 'SAVED',
  ERROR_SAVING: 'ERROR_SAVING',
};
const reducer = (state, action) => {
  switch (action.type) {
    case actions.CHANGE_TEXT:
      return {
        ...state,
        slug: action.text,
        slugValid: action.valid,
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
      };
    case actions.ERROR_SAVING:
      return {
        ...state,
        saving: false,
        slug: action.originalSlug,
      };
    default:
      return state;
  }
};

const SharePublicLink = (props) => {
  const { open, handleClose } = props;
  const { lang } = useLang();
  const { user } = useProfile();
  const changeProfile = useChangeProfile();
  const { fetchUri, getUri } = useUserPage();
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    slug: user.slug,
  });
  const styles = useStyles();

  const handleChange = (event) => {
    const text = event.target.value.toLowerCase();
    const isValid = /^[a-z][a-z0-9-]{3,98}[a-z0-9]$/.test(text);
    dispatch({ type: actions.CHANGE_TEXT, text, valid: isValid });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getUri(state.slug));
  };

  const handleSave = async () => {
    if (state.slugValid && state.slug !== user.slug) {
      dispatch({ type: actions.SAVE });
      const session = await getSession();
      if (session && session.userId) {
        fetch('/api/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: saveUserSlug,
            variables: {
              userId: session.userId,
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
              return;
            }
            throw new Error(data.data.updateUser.message);
          })
          .catch(() => {
            dispatch({ type: actions.ERROR_SAVING, originalSlug: user.slug });
          });
      }
    }
  };

  const handlePublic = async () => {
    if (state.slugValid) {
      dispatch({ type: actions.SAVE });
      const session = await getSession();
      if (session && session.userId) {
        fetch('/api/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: saveUserSlug,
            variables: {
              userId: session.userId,
              user: {
                publicProfile: !user.publicProfile,
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
              dispatch({
                type: actions.SAVED,
              });

              changeProfile({ publicProfile: data.data.updateUser.user.publicProfile });
              fetchUri(state.slug);
            }
            throw new Error(data.data.updateUser.message);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  return (
    <>
      <Dialog open={open} aria-labelledby="form-dialog-title" className={styles.dialog} fullWidth>
        <DialogTitle id="form-dialog-title">{lang.publicUrl.title}</DialogTitle>
        <DialogContent>
          <div className={styles.flexRow}>
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
              disabled={state.slug !== user.slug}
            >
              {lang.publicUrl.buttons.copy}
            </Button>
          </div>
          <div className={styles.flexRow}>
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
              className={styles.butotonMargin}
              onClick={handleSave}
              color="secondary"
              disabled={!(state.slug !== user.slug) || !state.slugValid}
            >
              {lang.publicUrl.buttons.save}
            </Button>
          </div>
          <Typography variant="subtitle2">{lang.publicUrl.note}</Typography>
          <Button
            // size="small"
            variant="contained"
            className={styles.publicButton}
            fullWidth
            onClick={handlePublic}
            color="secondary"
            disabled={state.slug !== user.slug}
          >
            {user.publicProfile ? lang.publicUrl.hideProfile : lang.publicUrl.publicProfile}
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {lang.publicUrl.buttons.close}
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop open={state.saving} />
    </>
  );
};

SharePublicLink.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default SharePublicLink;
