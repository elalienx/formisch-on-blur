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
    function showErrorOnFormSubmit() {
      if (form.isSubmitted && !form.isValid && !fieldIsFocused) {
        setInputstate("error");
      }
    },
    [form.isSubmitted, field.isValid, fieldIsFocused],
  );

  function onFocus(event: FocusEvent<HTMLInputElement>) {
    field.props.onFocus(event);
    setFieldIsFocused(true);

    if (inputState === "default") setInputstate("focus");
  }

  function onBlur(event: FocusEvent<HTMLInputElement>) {
    field.props.onBlur(event);
    setFieldIsFocused(false);

    if (!field.isDirty) setInputstate("default");
    if (field.isDirty && field.isValid) setInputstate("success");
    if (field.isDirty && !field.isValid) setInputstate("error");
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
