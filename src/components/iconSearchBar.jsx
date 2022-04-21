import React, { useEffect, useState } from "react";
import { FormFeedback, Input } from "reactstrap";

function IconSearchBar({
  iconChange,
  iconPosition,
  icon,
  icon2,
  invalidText,
  required,
  minLength,
  name,
  disabled,
  title,
  pattern,
  placeholder,
  invalid,
  className,
  inputClass,
  onChange,
  type,
  type2,
}) {
  const [inpTyp, setInpTyp] = useState(type);
  const [cIcon, setCIcon] = useState(icon);
  const [inv, setInv] = useState(invalid);
  const [pttn, setPttn] = useState(pattern);

  useEffect(() => {
    setInv(invalid);
  }, [invalid]);

  useEffect(() => {
    setPttn(pattern);
  }, [pattern]);

  const changeIcon = () => {
    if (iconChange) {
      setCIcon((prev) => {
        return prev === icon ? icon2 : icon;
      });
      setInpTyp((prev) => {
        return prev === type ? type2 : type;
      });
    }
  };

  return (
    <div className={`icon-search-bar ${className}`}>
      <span
        onClick={() => changeIcon()}
        className={`icon ${iconPosition || "l"} ${
          inv ? iconPosition + iconPosition : ""
        } ${iconChange && "pointer"}`}
      >
        <i className={cIcon || "ri-search-line"}></i>
      </span>
      <Input
        type={inpTyp}
        invalid={inv || false}
        name={name}
        title={title}
        onChange={onChange}
        pattern={pttn || ".*"}
        minLength={minLength}
        disabled={disabled || false}
        required={required || false}
        className={
          (inputClass + inv ? inputClass + inputClass : "") || "l radius"
        }
        placeholder={placeholder || "Search"}
      />
      <FormFeedback>
        {invalidText || "This is invalid, try again!"}
      </FormFeedback>
    </div>
  );
}

export default IconSearchBar;
