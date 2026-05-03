import React from 'react';
import { TimelineItem as TimelineItemType } from '../../types';
import { useLang } from '../../contexts/LangContext';

interface TimelineItemProps {
  key?: React.Key;
  item: TimelineItemType;
  isLast: boolean;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ item, isLast }) => {
  const { resolveField } = useLang();
  return (
    <div style={{ 
      display: "flex", 
      gap: "1.5rem", 
      paddingBottom: "2.5rem", 
      paddingInlineStart: "2rem", // Slightly less padding on mobile
      position: "relative" 
    }}>
      {/* The Line - Precisely Centered Axis */}
      {!isLast && (
        <div style={{
          position: "absolute",
          insetInlineStart: "7px", 
          transform: "none",
          marginInlineStart: "-0.75px", // Center the 1.5px border on the 11px mark
          top: "11px",
          bottom: "-14px",
          width: 0,
          borderInlineStart: "1.5px dashed var(--ink-light)",
          opacity: 0.6
        }} />
      )}
      
      {/* The Dot */}
      <div 
        className="timeline-dot" 
        style={{ 
          position: "absolute", 
          insetInlineStart: "7px", 
          transform: "none",
          marginInlineStart: "-7px", // Center the 14px dot on the 11px mark
          top: "4px", 
          zIndex: 2,
          marginTop: 0
        }} 
      />

      <div style={{ width: "100%" }}>
        <p style={{ fontFamily: "var(--font-sketch)", fontSize: "1.3rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1.2, marginBottom: "0.2rem" }}>{resolveField(item.role)}</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--sepia)", fontWeight: 600 }}>{resolveField(item.company)}</p>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--ink-light)", margin: "0.3rem 0 0.6rem", letterSpacing: "1px" }}>{resolveField(item.year)}</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--ink-faded)", lineHeight: 1.6, fontStyle: "normal" }}>{resolveField(item.description)}</p>
      </div>
    </div>
  );
};
