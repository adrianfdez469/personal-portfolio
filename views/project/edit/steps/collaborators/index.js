// Ext libs
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  IconButton,
  TextField,
  Grid,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { useLang } from '../../../../../store/contexts/langContext';
// Components
import StepItem from '../../../../../components/UI/StepForm/StepItem';
import OptimizedAvatar from '../../../../../components/UI/Avatar/OptimizedAvatar';
// Styles
import useCollaboratorsStyles from './styles';

const CollaboratorsForm = (props) => {
  const { collaborators, changeData } = props;
  const styles = useCollaboratorsStyles();
  // const [profiles, setProfiles] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const inputNameRef = useRef(null);
  const inputEmailRef = useRef(null);
  const { lang } = useLang();

  const handlerAddProfile = () => {
    if (inputNameRef.current.value !== null && inputNameRef.current.value !== '') {
      changeData([
        ...collaborators,
        {
          name: inputNameRef.current.value,
          email: inputEmailRef.current.value,
          isOwner: false,
          login: inputNameRef.current.value.replaceAll(' ', '_').toLowerCase(),
        },
      ]);
    }
  };

  const handleRemoveProfile = (profile) => {
    const newCollaborators = collaborators.filter(
      (coll) =>
        !(
          coll.login === profile.login &&
          coll.avatarUrl === profile.avatarUrl &&
          coll.email === profile.email &&
          coll.bio === profile.bio &&
          coll.name === profile.name &&
          coll.url === profile.url
        )
    );
    changeData(newCollaborators);
  };

  const handleChange = (expandedIdx) => (event, isExpanded) => {
    setExpanded(isExpanded ? expandedIdx : false);
  };

  return (
    <StepItem label={lang.collaboratorsStep.header.title}>
      {collaborators.map((profile, idx) => (
        <Accordion key={idx.toString()} expanded={idx === expanded} onChange={handleChange(idx)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <OptimizedAvatar
              alt={profile.name}
              src={profile.avatarUrl}
              quality={75}
              height={40}
              width={40}
            />

            <div style={{ marginLeft: 16, display: 'flex', flexDirection: 'column', flex: 1 }}>
              <Typography color="inherit">{profile.name}</Typography>
              <Typography variant="caption" color="textSecondary">
                {`${
                  profile.isOwner
                    ? `(${lang.collaboratorsStep.form.owner})`
                    : `(${lang.collaboratorsStep.form.collaborator})`
                }`}
              </Typography>
            </div>
            <IconButton onClick={() => handleRemoveProfile(profile, idx)}>
              <DeleteIcon />
            </IconButton>
          </AccordionSummary>
          <AccordionDetails className={styles.accordionDetails}>
            <Typography color="textPrimary">{profile.bio}</Typography>
            <Typography color="textSecondary">{profile.url}</Typography>
            <Typography color="textSecondary">{profile.email}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      <Accordion
        expanded={collaborators.length === expanded}
        onChange={handleChange(collaborators.length)}
      >
        <AccordionSummary expandIcon={<AddIcon />}>
          {collaborators.length !== expanded && <Avatar className={styles.smallAvatar} />}
          {collaborators.length === expanded && (
            <>
              <Grid
                container
                spacing={2}
                style={{ display: collaborators.length !== expanded && 'none' }}
              >
                <Grid item xs={12} sm={6}>
                  <TextField
                    label={lang.collaboratorsStep.form.nameLabel}
                    onClick={(event) => event.stopPropagation()}
                    fullWidth
                    inputRef={inputNameRef}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    label={lang.collaboratorsStep.form.emailLabel}
                    onClick={(event) => event.stopPropagation()}
                    fullWidth
                    inputRef={inputEmailRef}
                  />
                </Grid>
              </Grid>
              <IconButton onClick={handlerAddProfile} style={{ alignSelf: 'center' }}>
                <SaveIcon />
              </IconButton>
            </>
          )}
        </AccordionSummary>
        <AccordionDetails className={styles.accordionDetails} />
      </Accordion>
    </StepItem>
  );
};

CollaboratorsForm.propTypes = {
  changeData: PropTypes.func.isRequired,
  collaborators: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      contactLink: PropTypes.string,
      avatarUrl: PropTypes.string,
      url: PropTypes.string,
      bio: PropTypes.string,
      isOwner: PropTypes.bool,
    })
  ),
};
CollaboratorsForm.defaultProps = {
  collaborators: [],
};

export default React.memo(CollaboratorsForm);
