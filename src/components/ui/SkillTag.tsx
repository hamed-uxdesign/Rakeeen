import React from 'react';
import { LocalizedField } from '../../types';
import { useLang } from '../../contexts/LangContext';

interface SkillTagProps {
  key?: React.Key;
  title: LocalizedField;
  description: LocalizedField;
  index: number;
}

export const SkillTag: React.FC<SkillTagProps> = ({ title, description, index }) => {
  const { resolveField } = useLang();
  
  const tagIndex = (index % 6) + 1;
  const themeBg = `var(--tag-bg-${tagIndex})`;
  const themeTxt = `var(--tag-txt-${tagIndex})`;

  return (
    <span 
      className="skill-tag" 
      style={{ color: themeTxt, background: themeBg, borderColor: themeTxt }} 
      title={resolveField(description)}
    >
      {resolveField(title)}
    </span>
  );
};
