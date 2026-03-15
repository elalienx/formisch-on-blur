import { useField, type FormStore } from "@formisch/react";

import "../styles/input-field.css";

interface Props {
  form: FormStore;
  id: string;
  label: string;
  placeholder?: string;
}

export default function InputField({
  form,
  id,
  label,
  placeholder = "",
}: Props) {
  // State
  const field = useField(form, { path: [id] });

  return (
    <fieldset className="input-field">
      <label htmlFor={id}>{label}</label>
      <input {...field.props} id={id} type="text" placeholder={placeholder} />
      {field.errors && (
        <small className="validation-message">{field.errors[0]}</small>
      )}
    </fieldset>
  );
}
