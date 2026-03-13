interface Props {
  id: string;
  label: string;
  placeholder?: string;
}

export default function InputField({ id, label, placeholder = "" }: Props) {
  return (
    <fieldset className="input-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" placeholder={placeholder} />
    </fieldset>
  );
}
