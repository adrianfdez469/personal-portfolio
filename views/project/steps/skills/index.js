// Ext libs
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Chip } from '@material-ui/core';
// Internal libs
import InputTextSelect from '../../../../components/UI/ReactSelect';
import { existsObjWithPropValue } from '../../../../libs/helpers';
// Hooks
import { useLang } from '../../../../store/contexts/langContext';
// Styles
import { useStepsStyles } from '../../styles';
import useSkillsStyles from './styles';
// Constants
import skillsCategories from '../../../../constants/skillsCategorysConst';

const getSkillsQuery = () => `
    query {
      skills{
        id
        name
        category
      }
    }
  `;

const SkillsForm = (props) => {
  // constants
  const { show, data } = props;
  // hooks
  const styles = useSkillsStyles();
  const stepStyles = useStepsStyles();
  const [programmingLangs, setProgrammingLangs] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [allProgrammingLangs, setAllProgrammingLangs] = useState([]);
  const [allTechnologies, setAllTechnologies] = useState([]);
  const { lang } = useLang();

  // hadlers
  const handleDelLang = (pl) => {
    setProgrammingLangs((state) => state.filter((devlang) => devlang.text !== pl.text));
  };
  const handleAddLanguage = (devlang) => {
    if (
      !existsObjWithPropValue(
        programmingLangs.map((pl) => ({ ...pl, text: pl.text.toLowerCase().trim() })),
        'text',
        devlang.text.toLowerCase().trim()
      )
    ) {
      setProgrammingLangs((state) => [...state, devlang]);
    }
  };
  const handleDelTech = (tech) => {
    setTechnologies((state) => state.filter((th) => th.text !== tech.text));
  };
  const handleAddTechnologie = (tech) => {
    if (
      !existsObjWithPropValue(
        technologies.map((th) => ({ ...th, text: th.text.toLowerCase().trim() })),
        'text',
        tech.text.toLowerCase().trim()
      )
    ) {
      setTechnologies((state) => [...state, tech]);
    }
  };

  // effects setting loaded data from repo
  useEffect(() => {
    if (data && data.languages && data.languages.length > 0) {
      setProgrammingLangs(data.languages);
    }
  }, [data]);

  // loading skils
  useEffect(() => {
    fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: getSkillsQuery(),
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        const error = new Error('Cant load skills');
        throw error;
      })
      .then((repdata) => {
        const [languages, tecnologies] = repdata.data.skills.reduce(
          (acum, skill) => {
            if (skill.category === skillsCategories.PROG_LANG) {
              acum[0].push({
                id: skill.id,
                text: skill.name,
              });
            }
            if (skill.category === skillsCategories.PROG_TECH) {
              acum[1].push({
                id: skill.id,
                text: skill.name,
              });
            }
            return acum;
          },
          [[], []]
        );
        setAllProgrammingLangs(languages);
        setAllTechnologies(tecnologies);
      })
      .catch(() => {
        // TODO: handle exception
      });
  }, []);

  return (
    <Box className={stepStyles.mainContent} hidden={!show}>
      <Box className={stepStyles.stepDescriptor}>
        <Typography align="center" variant="overline" className={stepStyles.stepDescriptionText}>
          {lang.skillsStep.header.title}
        </Typography>
      </Box>

      <div className={styles.divContainer}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <InputTextSelect
              textFieldProps={{
                label: lang.skillsStep.form.languagesLabel,
                variant: 'outlined',
                margin: 'dense',
              }}
              // helperText="Adiciona los lenguajes de programación utilizados"
              optionsList={allProgrammingLangs}
              excludedOptions={programmingLangs}
              onAdd={handleAddLanguage}
            />
            <div className={styles.chipsContainer}>
              {programmingLangs.map((pl) => (
                <Chip
                  key={pl.text}
                  label={pl.text}
                  onDelete={() => handleDelLang(pl)}
                  color="default"
                  variant="default"
                />
              ))}
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <InputTextSelect
              textFieldProps={{
                label: lang.skillsStep.form.techLabel,
                variant: 'outlined',
                margin: 'dense',
              }}
              // helperText="Adiciona las tecnologías utilizadas"
              optionsList={allTechnologies}
              excludedOptions={technologies}
              onAdd={handleAddTechnologie}
            />
            <div className={styles.chipsContainer}>
              {technologies.map((tech) => (
                <Chip
                  key={tech.text}
                  label={tech.text}
                  onDelete={() => handleDelTech(tech)}
                  color="default"
                  variant="outlined"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

SkillsForm.propTypes = {
  show: PropTypes.bool,
  data: PropTypes.shape({
    languages: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
      })
    ),
  }),
};
SkillsForm.defaultProps = {
  data: null,
  show: false,
};
export default SkillsForm;
