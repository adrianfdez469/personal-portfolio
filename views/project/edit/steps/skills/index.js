// Ext libs
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@material-ui/core';
// Internal libs
import InputTextSelect from '../../../../../components/UI/ReactSelect';
import { existsObjWithPropValue } from '../../../../../libs/helpers';
// components
import StepItem from '../../../../../components/UI/StepForm/StepItem';
// Hooks
import { useLang } from '../../../../../store/contexts/langContext';
// Styles
import useSkillsStyles from './styles';
// Constants
import skillsCategories from '../../../../../constants/skillsCategorysConst';

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
  const { data, changeData } = props;
  // hooks
  const styles = useSkillsStyles();
  const [allProgrammingLangs, setAllProgrammingLangs] = useState([]);
  const [allTechnologies, setAllTechnologies] = useState([]);
  const { lang } = useLang();

  // hadlers
  const handleDelLang = (pl) => {
    const languages = data.languages.filter((devlang) => devlang.text !== pl.text);
    changeData({
      languages,
    });
  };
  const handleAddLanguage = (devlang) => {
    if (
      !existsObjWithPropValue(
        data.languages.map((pl) => ({ ...pl, text: pl.text.toLowerCase().trim() })),
        'text',
        devlang.text.toLowerCase().trim()
      )
    ) {
      changeData({
        languages: [...data.languages, devlang],
      });
    }
  };
  const handleDelTech = (tech) => {
    const technologies = data.technologies.filter((technology) => technology.text !== tech.text);
    changeData({
      technologies,
    });
  };
  const handleAddTechnologie = (tech) => {
    if (
      !existsObjWithPropValue(
        data.technologies.map((th) => ({ ...th, text: th.text.toLowerCase().trim() })),
        'text',
        tech.text.toLowerCase().trim()
      )
    ) {
      // setTechnologies((state) => [...state, tech]);
      changeData({
        technologies: [...data.technologies, tech],
      });
    }
  };

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
    <StepItem label={lang.skillsStep.header.title}>
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
              excludedOptions={data.languages}
              onAdd={handleAddLanguage}
            />
            <div className={styles.chipsContainer}>
              {data.languages.map((pl) => (
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
              excludedOptions={data.technologies}
              onAdd={handleAddTechnologie}
            />
            <div className={styles.chipsContainer}>
              {data.technologies.map((tech) => (
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
    </StepItem>
  );
};

SkillsForm.propTypes = {
  changeData: PropTypes.func.isRequired,
  data: PropTypes.shape({
    languages: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
      })
    ),
    technologies: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
      })
    ),
  }),
};
SkillsForm.defaultProps = {
  data: null,
};
export default React.memo(SkillsForm);
