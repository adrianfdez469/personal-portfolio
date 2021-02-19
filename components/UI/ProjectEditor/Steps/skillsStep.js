// Ext libs
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Chip } from '@material-ui/core';
import InputTextSelect from 'react-material-selectable-inputtext';
import ProjectStep from './ProjectStep';
// Internal libs
// import InputTextSelect from '../../Inputs/InputTextSelect/inputTextSelect';
import { existsObjWithPropValue } from '../../../../libs/helpers';
// Styles
import { useSkillsStyles, useStepsStyles } from '../styles';
// Constants
import skillsCategories from '../../../../constants/skillsCategorysConst';

// TODO: Esto es temporal, realmente se deben cargar del backend
/* const allProgrammingLangs = [
  { id: '1', text: 'C#' },
  { id: '2', text: 'JAVA' },
  { id: '3', text: 'JavaScript' },
  { id: '4', text: 'C++' },
  { id: '5', text: 'Dart' },
  { id: '6', text: 'Php' },
  { id: '7', text: 'Sql' },
  { id: '8', text: 'TypeScript' },
  { id: '9', text: 'COBOL' },
  { id: '10', text: 'PASCAL' },
  { id: '11', text: 'PEARL' },
]; */
// TODO: Esto es temporal, realmente se deben cargar del backend
/* const allTechnologies = [
  { id: '1', text: 'ReactJs' },
  { id: '2', text: 'NodeJs' },
  { id: '3', text: 'GraphQL' },
  { id: '4', text: 'ExpressJs' },
  { id: '5', text: 'React Redux' },
  { id: '6', text: 'React Hooks' },
  { id: '7', text: 'Spring Boot' },
  { id: '8', text: '.Net' },
]; */

const getSkillsQuery = () => `
    query {
      skills{
        id
        name
        category
      }
    }
  `;

export const SKILLS = 'SKILLS';

export const SkillsForm = (props) => {
  // constants
  const { stepId, data } = props;
  // hooks
  const styles = useSkillsStyles();
  const stepStyles = useStepsStyles();
  const [programmingLangs, setProgrammingLangs] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [allProgrammingLangs, setAllProgrammingLangs] = useState([]);
  const [allTechnologies, setAllTechnologies] = useState([]);

  // hadlers
  const handleDelLang = (pl) => {
    setProgrammingLangs((state) => state.filter((lang) => lang.text !== pl.text));
  };
  const handleAddLanguage = (lang) => {
    if (
      !existsObjWithPropValue(
        programmingLangs.map((pl) => ({ ...pl, text: pl.text.toLowerCase().trim() })),
        'text',
        lang.text.toLowerCase().trim()
      )
    ) {
      setProgrammingLangs((state) => [...state, lang]);
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
    <Box className={stepStyles.mainContent} hidden={stepId !== SKILLS}>
      <Box className={stepStyles.stepDescriptor}>
        <Typography align="center" variant="overline" className={stepStyles.stepDescriptionText}>
          Que habilidades pusiste en práctica para desarrollar tu proyecto.
        </Typography>
      </Box>

      <div className={styles.divContainer}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <InputTextSelect
              textFieldProps={{
                label: 'Lenguajes',
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
                label: 'Tecnologías',
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
  stepId: PropTypes.string.isRequired,
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
};

export const skillsObj = new ProjectStep(SKILLS, 'Habilidades');
