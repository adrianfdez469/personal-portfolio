// Ext libs
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Chip } from '@material-ui/core';
import ProjectStep from './ProjectStep';
import InputTextSelect from '../../Inputs/InputTextSelect/inputTextSelect';
// Internal libs
import { existsObjWithPropValue } from '../../../../libs/helpers';
// Styles
import { useSkillsStyles, useStepsStyles } from '../styles';

// TODO: Esto es temporal, realmente se deben cargar del backend
const allProgrammingLangs = [
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
];
// TODO: Esto es temporal, realmente se deben cargar del backend
const allTechnologies = [
  { id: '1', text: 'ReactJs' },
  { id: '2', text: 'NodeJs' },
  { id: '3', text: 'GraphQL' },
  { id: '4', text: 'ExpressJs' },
  { id: '5', text: 'React Redux' },
  { id: '6', text: 'React Hooks' },
  { id: '7', text: 'Spring Boot' },
  { id: '8', text: '.Net' },
];

export const SKILLS = 'SKILLS';

export const SkillsForm = (props) => {
  // constants
  const { stepId } = props;
  // hooks
  const styles = useSkillsStyles();
  const stepStyles = useStepsStyles();
  const [programmingLangs, setProgrammingLangs] = useState([]);
  const [technologies, setTechnologies] = useState([]);

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

  return (
    <Box className={stepStyles.mainContent} hidden={stepId !== SKILLS}>
      <Box className={stepStyles.stepDescriptor}>
        <Typography align="center" variant="overline" style={{ display: 'block' }}>
          Que habilidades pusiste en práctica para desarrollar tu proyecto.
        </Typography>
      </Box>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <InputTextSelect
              textFieldProps={{
                placeholder: 'Lenguajes',
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
                placeholder: 'Tecnologías',
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
};

export const skillsObj = new ProjectStep(SKILLS, 'Habilidades');
