import React, { useCallback, useState } from 'react';
import { useSnackbar, SnackbarContent } from 'notistack';
import { Card, CardActions, Collapse, IconButton, Paper, Typography } from '@material-ui/core';
import { Close, ExpandMore } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import ES from '../../../i18n/locales/message/message.es.json';
import EN from '../../../i18n/locales/message/message.en.json';
import useStyles from './styles';

const languageLocales = {
  en: EN,
  es: ES,
};

const CustomSnackbar = React.forwardRef(({ message, type, id }, ref) => {
  const router = useRouter();
  const idioma = languageLocales[router.locale];
  const classes = useStyles();
  const { closeSnackbar } = useSnackbar();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = useCallback(() => {
    setExpanded((oldExpanded) => !oldExpanded);
  }, []);

  const handleDismiss = useCallback(() => {
    closeSnackbar(id);
  }, [id, closeSnackbar]);

  // const expandedTitle = {
  //   info: 'Information',
  //   warning: 'Warning',
  //   success: 'Success',
  //   error: 'Error',
  //   default: 'Message',
  // };

  return (
    <SnackbarContent ref={ref} className={classes.rootCSB}>
      <Card className={`${classes[type]} ${classes.cardCSB}`}>
        <CardActions classes={{ root: classes.actionRootCSB }}>
          <Typography
            variant="subtitle2"
            className={`${classes.typographyCSB} ${classes.textOverflow}`}
          >
            {expanded ? idioma.expandedMessageTitle[type] : message}
          </Typography>
          <div className={classes.iconsCSB}>
            <IconButton
              aria-label="Show more"
              // className={classnames(classes.expand, { [classes.expandOpen]: expanded })}
              className={`${classes.expandCSB} ${expanded ? classes.expandOpenCSB : classes.clase}`}
              onClick={handleExpandClick}
            >
              <ExpandMore />
            </IconButton>
            <IconButton className={classes.expandCSB} onClick={handleDismiss}>
              <Close />
            </IconButton>
          </div>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Paper className={`${classes.collapseCSB} ${classes[`light${type}`]}`}>
            <Typography gutterBottom>{message}</Typography>
            {/* <Button size="small" className={classes.buttonCSB}>
              <CheckCircle className={classes.checkIconCSB} />
              Download now
            </Button> */}
          </Paper>
        </Collapse>
      </Card>
    </SnackbarContent>
  );
});

CustomSnackbar.propTypes = {
  message: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error', 'default']).isRequired,
};

export default CustomSnackbar;
