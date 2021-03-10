// Ext libs
import React, { useState, useRef } from 'react';
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
import { useLang } from '../../../../store/contexts/langContext';
// Styles
import useStepsStyles from '../../styles';
import useCollaboratorsStyles from './styles';

const CollaboratorsForm = (props) => {
  const { collaborators, changeData } = props;
  const stepStyles = useStepsStyles();
  const styles = useCollaboratorsStyles();
  // const [profiles, setProfiles] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const inputNameRef = useRef(null);
  const inputEmailRef = useRef(null);
  const { lang } = useLang();

  const handlerAddProfile = () => {
    changeData([
      ...collaborators,
      {
        name: inputNameRef.current.value,
        email: inputEmailRef.current.value,
      },
    ]);
  };
  const handleChange = (expandedIdx) => (event, isExpanded) => {
    setExpanded(isExpanded ? expandedIdx : false);
  };

  // TODO: Add a remove button
  // TODO: Disable the Save Button if no name is entered

  return (
    <Box className={stepStyles.mainContent}>
      <Box className={stepStyles.stepDescriptor}>
        <Typography align="center" variant="overline" className={stepStyles.stepDescriptionText}>
          {lang.collaboratorsStep.header.title}
        </Typography>
      </Box>

      {collaborators.map((profile, idx) => (
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
      <Accordion
        expanded={collaborators.length === expanded}
        onChange={handleChange(collaborators.length)}
      >
        <AccordionSummary expandIcon={<AddIcon />}>
          {collaborators.length !== expanded && <Avatar className={styles.smallAvatar} />}
          {collaborators.length === expanded && (
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
