import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Box, Divider } from '@material-ui/core';
import { useLang } from '../../../../../store/contexts/langContext';
import { useProfile } from '../../../../../store/contexts/profileContext';
import useMessage from '../../../../../hooks/useMessage';
import useStyles from '../styles';

const getTokensQuery = `
query getUserTokens ($userId: ID!) {
  getUserTokens(userId:$userId) {
    id
    userId
    provider
  }
}
`;
const deleteTokenQuery = `
mutation deleteToken ($id: ID!) {
	deleteToken(id:$id){
    code
    success
    message
  }
}
`;

const SecurityPrivacy = (props) => {
  const { hidden } = props;
  const { user } = useProfile();
  const [showMessage] = useMessage();
  const [tokens, setTokens] = useState([]);
  const styles = useStyles();
  const { lang } = useLang();

  const getUserTokes = useCallback(() => {
    fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: getTokensQuery,
        variables: {
          userId: user.id,
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
        setTokens(resp.data.getUserTokens);
      })
      .catch(() => {
        showMessage(lang.settings.msg.errorLoadingToken, 'error');
      });
  }, []);

  const deleteToken = useCallback((tokenId) => {
    showMessage(
      lang.settings.msg.deleteTokenAks,
      'warning',
      null,
      {
        action: (close) => {
          close();
          fetch('/api/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: deleteTokenQuery,
              variables: {
                id: tokenId,
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
              if (resp.data.deleteToken.success !== true) throw new Error('Error');
              setTokens((providerTokens) => providerTokens.filter((token) => token.id !== tokenId));
              showMessage(lang.settings.msg.tokenDeleted, 'success');
            })
            .catch(() => {
              showMessage(lang.settings.msg.errorDeletingToken, 'error');
            });
        },
        text: lang.settings.yes,
      },
      {
        action: (close) => {
          close();
        },
        text: lang.settings.no,
      }
    );
  }, []);

  useEffect(() => {
    getUserTokes();
  }, [getUserTokes]);

  return (
    <Box hidden={hidden}>
      <Typography variant="h5">{lang.settings.SecAndPriv}</Typography>
      <Divider />
      {tokens.length > 0 ? (
        <>
          <Typography variant="overline">{lang.settings.providerTokens}</Typography>

          {tokens.map((token) => (
            <Box mb={1} p={1} key={token.id} className={[styles.bordered, styles.rowBox].join(' ')}>
              <Typography color="primary">{token.provider.toUpperCase()}</Typography>
              <Typography>XXXXX-XXXXX-XXXXX-XXXXX-XXXXX</Typography>
              <Button variant="contained" onClick={() => deleteToken(token.id)}>
                {lang.settings.delete}
              </Button>
            </Box>
          ))}
          <Box mt={2} />
          <Typography variant="body1">{lang.settings.securityText1}</Typography>
          <Typography variant="body1">{lang.settings.securityText2}</Typography>
        </>
      ) : (
        <Typography variant="overline">{lang.settings.noTokens}</Typography>
      )}
    </Box>
  );
};
SecurityPrivacy.propTypes = {
  hidden: PropTypes.bool.isRequired,
};

export default SecurityPrivacy;
