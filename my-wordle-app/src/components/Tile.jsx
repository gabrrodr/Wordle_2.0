import React, {useEffect, useRef} from 'react';
import './Tile.css';


export function Tile({ letter, isActive, onChange, onKeyDown, className}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  return (
    <input
      ref={inputRef}
      type="text"
      value={letter}
      maxLength="1"
      className={`${className || ""}`}
      onChange={onChange}
      onKeyDown={onKeyDown}
      //readOnly={!isActive}
    />
  );
}
