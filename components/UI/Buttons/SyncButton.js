import React from 'react';
import PropTypes from 'prop-types';
import { Button, Box, Typography } from '@material-ui/core';

const SyncButton = (props) => {
  const { variant, Icon, handleSelect, text, syncProviderText } = props;
  return (
    <Button
      variant={variant}
      size="large"
      startIcon={<Icon fontSize="large" />}
      onClick={handleSelect}
      style={{
        width: 136,
        margin: 16,
      }}
    >
      <Box style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="body1"
          style={{ textTransform: 'none', fontSize: 10, textAlign: 'left' }}
        >
          {text}
        </Typography>
        <Typography variant="button" style={{ fontSize: 14, textAlign: 'left' }}>
          {syncProviderText}
        </Typography>
      </Box>
    </Button>
  );
};

SyncButton.propTypes = {
  variant: PropTypes.string.isRequired,
  Icon: PropTypes.element.isRequired,
  handleSelect: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  syncProviderText: PropTypes.string.isRequired,
};

export default SyncButton;
