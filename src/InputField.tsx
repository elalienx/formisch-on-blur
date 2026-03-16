import { useField, type FormStore } from "@formisch/react";
import { useState, type FocusEvent } from "react";

import "./styles/input-field.css";

interface Props {
  form: FormStore;
  id: string;
  label: string;
  placeholder?: string;
}

type InputState = "default" | "focus" | "error" | "success";

export default function InputField({
  form,
  id,
  label,
  placeholder = "",
}: Props) {
  // State
  // @ts-ignore
  const field = useField(form, { path: [id] });
  const [fieldIsFocused, setFieldIsFocused] = useState(false);

  // Properties
  const uiState: InputState = setState();

  // Methods
  function setState(): InputState {
    if (!field.isValid && form?.isSubmitted) {
      return "error";
    }

    if (!field.isValid && field.isDirty) {
      return "error";
    }

    if (fieldIsFocused) {
      return "focus";
    }

    if (field.isValid && field.isDirty && !fieldIsFocused) {
      return "success";
    }

    return "default";
  }

  function onFocus(event: FocusEvent<HTMLInputElement>) {
    field.props.onFocus(event);
    setFieldIsFocused(true);
  }

  function onBlur(event: FocusEvent<HTMLInputElement>) {
    field.props.onBlur(event);
    setFieldIsFocused(false);
  }

  return (
    <fieldset className="input-field">
      <label htmlFor={id}>{label}</label>
      <input
        {...field.props}
        id={id}
        className={uiState}
        type="text"
        placeholder={placeholder}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {uiState === "error" && (
        <small className="validation-message">{field.errors?.[0]}</small>
      )}
    </fieldset>
  );
}
