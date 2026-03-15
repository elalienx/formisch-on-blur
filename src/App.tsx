// Node modules
import { Form, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import InputField from "./InputField";

const schema = v.object({
  name: v.pipe(
    v.string("Please enter your full name."),
    v.nonEmpty("Please enter your full name."),
    v.minLength(3, "Your names must have 3 characters or more."),
  ),
  email: v.pipe(
    v.string("Please enter your email."),
    v.nonEmpty("Please enter your email."),
    v.email("The email address is badly formatted."),
  ),
});

export default function App() {
  const form = useForm({
    schema: schema,
    validate: "blur",
    revalidate: "blur",
  });

  function submitForm() {
    if (form.isValid) alert("Success!");
  }

  return (
    <div>
      <h1>Sample Form Page</h1>

      <Form of={form} onSubmit={submitForm}>
        <InputField
          form={form}
          id="name"
          label="Full name"
          placeholder="Jhon Smith"
        />
        <InputField
          form={form}
          id="email"
          label="E-mail"
          placeholder="jhon@email.com"
        />
        <button type="submit">Submit</button>
      </Form>

      <small>Created with Formisch</small>
    </div>
  );
}
