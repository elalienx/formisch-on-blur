import { useField, type FormStore } from "@formisch/react";
import { useEffect, useState, type FocusEvent } from "react";

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
  const [inputState, setInputstate] = useState<InputState>("default");
  const [fieldIsFocused, setFieldIsFocused] = useState(false);

  // Methods
  useEffect(
    function calculateInputState() {
      // Show error after form submission
      if (form.isSubmitted && !field.isValid) {
        setInputstate("error");
        return;
      }

      // If the field already had an error, keep it even when focusing again
      if (fieldIsFocused && inputState === "error") {
        setInputstate("error");
        return;
      }

      // If the field already had a success, keep it even when focusing again
      if (fieldIsFocused && inputState === "success") {
        setInputstate("success");
        return;
      }

      // While editing a fresh field, stay in focus state
      if (fieldIsFocused) {
        setInputstate("focus");
        return;
      }

      // Default before interaction
      if (!field.isDirty) {
        setInputstate("default");
        return;
      }

      // Validate success
      if (field.isValid) {
        setInputstate("success");
        return;
      }

      // Validate failure
      if (!field.isValid) {
        setInputstate("error");
        return;
      }
    },
    [
      fieldIsFocused,
      form.isSubmitted,
      field.isDirty,
      field.isValid,
      inputState,
    ],
  );

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
        className={inputState}
        type="text"
        placeholder={placeholder}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {inputState === "error" && (
        <small className="validation-message">{field.errors?.[0]}</small>
      )}
    </fieldset>
  );
}
