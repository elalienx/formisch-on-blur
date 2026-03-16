import { useField, type FormStore } from "@formisch/react";
import { useEffect, useState, type FocusEvent } from "react";

import "./styles/input-field.css";

interface Props {
  form: FormStore;
  id: string;
  label: string;
  placeholder?: string;
}

type InputState = "default" | "error" | "success";

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

  // Properties
  const ariaErrorName = `aria-error-${id}`;

  // Methods
  useEffect(
    function calculateInputState() {
      // Show error after form submission
      if (form.isSubmitted && !field.isValid) setInputstate("error");

      // If the field already had an error, keep it even when focusing again
      if (fieldIsFocused && inputState === "error") return;

      // If the field already had a success, keep it even when focusing again
      if (fieldIsFocused && inputState === "success") return;

      // While editing a fresh field, stay in focus state
      if (fieldIsFocused) return;

      // Default before interaction
      if (!field.isDirty) return;

      // Validate success
      if (field.isValid) setInputstate("success");

      // Validate failure
      if (!field.isValid) setInputstate("error");
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
        aria-invalid={!!field.errors}
        aria-errormessage={ariaErrorName}
      />
      {inputState === "error" && (
        <small id={ariaErrorName} className="validation-message">
          {field.errors?.[0]}
        </small>
      )}
    </fieldset>
  );
}
