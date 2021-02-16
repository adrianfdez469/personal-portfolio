// Ext libs
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
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
// Components
import ProjectStep from './ProjectStep';
// Styles
import { useStepsStyles, useCollaboratorsStyles } from '../styles';

export const COLLABORATORS = 'COLLABORATORS';

export const CollaboratorsForm = (props) => {
  const { stepId, collaborators } = props;
  const stepStyles = useStepsStyles();
  const styles = useCollaboratorsStyles();
  const [profiles, setProfiles] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const inputNameRef = useRef(null);
  const inputEmailRef = useRef(null);

  const handlerAddProfile = () => {
    setProfiles((prevProfiles) => [
      ...prevProfiles,
      {
        name: inputNameRef.current.value,
        email: inputEmailRef.current.value,
      },
    ]);
  };
  const handleChange = (expandedIdx) => (event, isExpanded) => {
    setExpanded(isExpanded ? expandedIdx : false);
  };

  useEffect(() => {
    if (collaborators && collaborators.length > 0) {
      setProfiles(collaborators);
    }
  }, [collaborators]);

  return (
    <Box className={stepStyles.mainContent} hidden={stepId !== COLLABORATORS}>
      <Box className={stepStyles.stepDescriptor}>
        <Typography align="center" variant="overline" className={stepStyles.stepDescriptionText}>
          Tabajaste solo? Quiénes colaboraron contigo?
        </Typography>
      </Box>

      {profiles.map((profile, idx) => (
        <Accordion key={idx.toString()} expanded={idx === expanded} onChange={handleChange(idx)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Avatar alt={profile.name} src={profile.avatarUrl} className={styles.smallAvatar} />
            <Typography color={profile.isOwner ? 'primary' : 'inherit'}>{profile.name}</Typography>
          </AccordionSummary>
          <AccordionDetails className={styles.accordionDetails}>
            <Typography color="textPrimary">{profile.bio}</Typography>
            <Typography color="textSecondary">{profile.url}</Typography>
            <Typography color="textSecondary">{profile.email}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      <Accordion expanded={profiles.length === expanded} onChange={handleChange(profiles.length)}>
        <AccordionSummary expandIcon={<AddIcon />}>
          {profiles.length !== expanded && <Avatar className={styles.smallAvatar} />}
          {profiles.length === expanded && (
            <Grid container spacing={2} style={{ display: profiles.length !== expanded && 'none' }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nombre"
                  onClick={(event) => event.stopPropagation()}
                  fullWidth
                  inputRef={inputNameRef}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  label="Correo"
                  onClick={(event) => event.stopPropagation()}
                  fullWidth
                  inputRef={inputEmailRef}
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={handlerAddProfile}>
                  <SaveIcon />
                </IconButton>
              </Grid>
            </Grid>
          )}
        </AccordionSummary>
        <AccordionDetails className={styles.accordionDetails} />
      </Accordion>
    </Box>
  );
};

CollaboratorsForm.propTypes = {
  stepId: PropTypes.string.isRequired,
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
export const collaboratorsObj = new ProjectStep(COLLABORATORS, 'Colaboradores');
