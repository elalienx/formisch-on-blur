import { useField, type FormStore } from "@formisch/react";

import "../styles/input-field.css";
import { useEffect, useState, type FocusEvent } from "react";

interface Props {
  form: FormStore;
  id: string;
  label: string;
  placeholder?: string;
}

type UIState = "default" | "focus" | "error" | "success";

export default function InputField({
  form,
  id,
  label,
  placeholder = "",
}: Props) {
  // State
  const field = useField(form, { path: [id] });
  const [uiState, setUIState] = useState<UIState>("default");

  // Methods
  useEffect(() => {
    if (form.isSubmitted && !field.isValid) {
      setUIState("error");
    }
  }, [form.isSubmitted, field.isValid]);

  function onBlur(event: FocusEvent<HTMLInputElement>) {
    field.props.onBlur(event);

    if (field.isDirty) {
      console.log("running validation...");

      if (field.isValid) {
        console.log("field is valid ✅");
        setUIState("success");
      } else {
        console.log("field is invalid ❌");
        setUIState("error");
      }
    }
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
      />
      {uiState === "error" && (
        <small className="validation-message">{field.errors?.[0]}</small>
      )}
    </fieldset>
  );
}
