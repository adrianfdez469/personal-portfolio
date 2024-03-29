import React, { useReducer, useRef, useEffect, useCallback } from 'react';
import { TextField, CircularProgress, Typography, useMediaQuery, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import Image from 'next/image';
// Internal libs
import { isStringValidUrl } from '../../../libs/helpers';
// styles
import useStyles from './styles';

const getLinkPrevQuery = (url) => `
  query {
    link(url:"${url}") {
      url
      title
      description
      imageUrl
    }
  }
`;

const initialState = {
  error: false,
  processing: false,
  link: '',
  preview: null,
  typing: false,
  // validUrl: false,
  timeout: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'START_TYPING':
      return {
        ...state,
        typing: true,
      };
    case 'CHANGE_LINK':
      return {
        ...state,
        link: action.value,
        error: false,
        preview: null,
        processing: false,
      };
    case 'STOP_TYPING':
      return {
        ...state,
        typing: false,
      };
    case 'START_LOADING':
      return {
        ...state,
        processing: true,
      };
    case 'PREVIEW_ERROR': {
      return {
        ...state,
        error: true,
        preview: null,
        processing: false,
      };
    }
    case 'SET_PREVIEW': {
      return {
        ...state,
        error: false,
        preview: action.data,
        processing: false,
      };
    }
    default:
      return state;
  }
};

const ImageLoader = ({ src }) => src;

const LinkPreview = (props) => {
  // constants
  const { setLink, url, setPreview, readOnly, label, logoScale, scale, ...rest } = props;
  const abortController = useRef();

  // hooks
  const [{ link, error, preview, processing, typing }, dispatch] = useReducer(reducer, {
    ...initialState,
  });
  const greaterMdSize = useMediaQuery((theme) => theme.breakpoints.up('800'));
  const greaterXxsSize = useMediaQuery((theme) => theme.breakpoints.up('400'));
  const styles = useStyles({ logoScale, scale });

  // functions
  const getData = useCallback(() => {
    if (isStringValidUrl(link)) {
      if (abortController.current) {
        abortController.current.abort();
      }
      dispatch({ type: 'START_LOADING' });
      abortController.current = new AbortController();
      fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: getLinkPrevQuery(link),
        }),
        signal: abortController.current.signal,
      })
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error();
        })
        .then((resp) => {
          const { data } = resp;
          dispatch({ type: 'SET_PREVIEW', data: { ...data.link } });
          setPreview({ ...data.link });
        })
        .catch(() => {
          dispatch({ type: 'PREVIEW_ERROR' });
        });
    }
  }, [link]);

  // efects
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (link !== '') {
        dispatch({ type: 'STOP_TYPING' });
      }
    }, 1500);
    return () => {
      clearTimeout(timeout);
    };
  }, [typing, link]);

  useEffect(() => {
    if (!typing) {
      getData(link);
    }
  }, [typing, link, getData]);

  useEffect(() => {
    dispatch({ type: 'CHANGE_LINK', value: url });
  }, [url]);

  // handlers
  const onChange = (event) => {
    dispatch({ type: 'START_TYPING' });
    dispatch({
      type: 'CHANGE_LINK',
      value: event.target.value,
    });
    setLink(event.target.value);
  };

  let previewView = null;
  if (!error && processing) {
    previewView = (
      <div className={styles.divProcessing}>
        <CircularProgress size={16} />
      </div>
    );
  }
  if (preview !== null) {
    previewView = (
      <div className={styles.prevDataContainer}>
        {greaterXxsSize && (
          <div
            className={styles.image}
            style={{ overflow: !preview.imageUrl ? 'hidden' : 'visible' }}
          >
            <Image
              layout="intrinsic"
              loader={ImageLoader}
              src={preview.imageUrl || '/images/no-image-red-2.png'}
              alt={preview.title}
              width={50 * scale}
              height={50 * scale}
            />
          </div>
        )}
        <div style={{ overflow: 'auto' }}>
          <Typography variant="button" display="block" className={styles.typografy}>
            {preview.title}
          </Typography>
          <Typography variant="caption" className={styles.typografy}>
            {preview.description}
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.divContainer}>
      {!readOnly ? (
        <TextField
          value={link || ''}
          onChange={onChange}
          label={label}
          variant="outlined"
          margin="dense"
          className={styles.linkField}
          fullWidth={!greaterMdSize}
          {...rest}
        />
      ) : (
        <Box padding={2}>
          <Typography variant="h4" style={{ fontSize: 16 * scale }}>
            {label}
          </Typography>
          <Typography variant="h5" style={{ fontSize: 14 * scale }}>
            {link}
          </Typography>
        </Box>
      )}
      {previewView}
    </div>
  );
};

LinkPreview.propTypes = {
  setLink: PropTypes.func.isRequired,
  setPreview: PropTypes.func,
  url: PropTypes.string,
  readOnly: PropTypes.bool,
  label: PropTypes.string.isRequired,
  logoScale: PropTypes.number,
  scale: PropTypes.number,
};
LinkPreview.defaultProps = {
  url: null,
  setPreview: () => {},
  readOnly: false,
  logoScale: 1,
  scale: 1,
};

export default React.memo(LinkPreview);
