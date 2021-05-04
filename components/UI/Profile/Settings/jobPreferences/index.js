import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Box,
  Divider,
  FormControlLabel,
  FormControl,
  Switch,
  InputLabel,
  Input,
  InputAdornment,
  Button,
} from '@material-ui/core';
import { useLang } from '../../../../../store/contexts/langContext';
import { useProfile } from '../../../../../store/contexts/profileContext';
import useUserPage from '../../../../../hooks/useUserPage';
import Backdrop from '../../../backdrop';
import useMessage from '../../../../../hooks/useMessage';
import useStyles from '../styles';

const jobPreferenceQuery = `
query getUser($id:ID!) {
	user(id: $id) {
    jobPreference{
      userId
      openToWork
      openToRelocation
      remoteAvailable
      minSalary
    }
  }  
}
`;

const saveJobPreference = `
mutation saveJobPreference($userId:ID!, $jobPreference: JobPreferenceParams! ) {
  saveJobPreference(userId:$userId, jobPreference: $jobPreference) {
    code
    success
    message
    jobPreference {
      userId
      openToWork
      openToRelocation
      remoteAvailable
      minSalary
    }
  }
}
`;

const initialState = {
  loading: false,
  openToWork: null,
  openToRelocation: null,
  remoteAvailable: null,
  minSalary: null,
};
const actions = {
  SET_DATA: 'SET_DATA',
  LOADING_ON: 'LOADING_ON',
  LOADING_OFF: 'LOADING_OFF',

  SWITCH_OPEN_TO_WORK: 'SWITCH_OPEN_TO_WORK',

  SWITCH_FIELD: 'SWITCH_FIELD',
};
const reducer = (state, action) => {
  switch (action.type) {
    case actions.SWITCH_FIELD: {
      console.log(action);
      return {
        ...state,
        [action.field]: action.data,
      };
    }
    case actions.SET_DATA:
      return {
        ...state,
        ...action.data,
      };
    case actions.LOADING_ON:
      return {
        ...state,
        loading: true,
      };
    case actions.LOADING_OFF:
      return {
        ...state,
        loading: false,
      };
    case actions.SWITCH_OPEN_TO_WORK:
      return {
        ...state,
        openToWork: action.data,
        loading: false,
      };
    default:
      return state;
  }
};

const JobPreferences = (props) => {
  const { hidden } = props;
  const styles = useStyles();

  const { lang } = useLang();
  const { user } = useProfile();
  const [showMessage] = useMessage();

  const { fetchUri } = useUserPage();
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChangeSwitch = (field, checked) => {
    dispatch({ type: actions.SWITCH_FIELD, field, data: checked });
  };

  const handleSave = () => {
    dispatch({ type: actions.LOADING_ON });
    fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: saveJobPreference,
        variables: {
          userId: user.id,
          jobPreference: {
            openToWork: state.openToWork,
            openToRelocation: state.openToRelocation,
            remoteAvailable: state.remoteAvailable,
            minSalary: state.minSalary,
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
        if (resp.data.saveJobPreference.success) {
          dispatch({ type: actions.LOADING_OFF });
          fetchUri(user.slug);
          showMessage(lang.settings.msg.preferencesSaved, 'success');
          return;
        }
        throw new Error(resp.data.saveJobPreference.message);
      })
      .catch(() => {
        dispatch({ type: actions.LOADING_OFF });
        showMessage(lang.settings.msg.preferencesSavedError, 'error');
      });
  };

  const salaryChange = (event) => {
    const number = event.target.value;
    if (!Number.isNaN(+number)) {
      dispatch({ type: actions.SWITCH_FIELD, field: 'minSalary', data: +number });
    } else {
      dispatch({ type: actions.SWITCH_FIELD, field: 'minSalary', data: state.minSalary });
    }
  };

  useEffect(() => {
    dispatch({ type: actions.LOADING_ON });
    fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: jobPreferenceQuery,
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
        if (resp.data.user) {
          dispatch({
            type: actions.SET_DATA,
            data: resp.data.user.jobPreference,
          });

          return;
        }
        throw new Error('Error');
      })
      .catch(() => {
        showMessage(lang.settings.msg.errorLoadingJobPrefData, 'error');
      })
      .finally(() => {
        dispatch({ type: actions.LOADING_OFF });
      });
  }, [user.id]);

  return (
    <>
      <Box hidden={hidden}>
        <Typography variant="h5">{lang.settings.jobPreferences}</Typography>
        <Divider style={{ marginBottom: 8 }} />

        <Box mt={2} p={2} className={styles.bordered}>
          <Box className={[styles.flexRow, styles.spaceBetWeen].join(' ')}>
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  checked={state.openToWork}
                  onChange={(event, checked) => handleChangeSwitch('openToWork', checked)}
                />
              }
              label={lang.settings.SwitchWorkingStatusText}
            />

            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  checked={state.openToRelocation}
                  onChange={(event, checked) => handleChangeSwitch('openToRelocation', checked)}
                />
              }
              label={lang.settings.SwitchOpenRelocation}
            />
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  checked={state.remoteAvailable}
                  onChange={(event, checked) => handleChangeSwitch('remoteAvailable', checked)}
                />
              }
              label={lang.settings.SwitchRemoteAvailable}
            />
          </Box>
          <Box mt={2} className={[styles.flexRow, styles.spaceBetWeen].join(' ')}>
            <FormControl variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">{lang.settings.minSalary}</InputLabel>
              <Input
                id="standard-adornment-amount"
                value={state.minSalary}
                onChange={salaryChange}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              />
            </FormControl>
            <Button variant="contained" onClick={handleSave}>
              {lang.publicUrl.buttons.save}
            </Button>
          </Box>
        </Box>
      </Box>
      <Backdrop open={state.loading} />
    </>
  );
};
JobPreferences.propTypes = {
  hidden: PropTypes.bool.isRequired,
};

export default JobPreferences;
