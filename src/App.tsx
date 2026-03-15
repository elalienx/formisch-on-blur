// Node modules
import * as v from "valibot";
import { Form, useForm } from "@formisch/react";

// Project files
import InputField from "./components/InputField";

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

  function onSubmit() {
    alert("submitted");
  }

  return (
    <div id="App">
      <h1>This is a Sample Form Page</h1>
      <p>The goal is to validate the fields on blur instead of typing.</p>
      <p>
        I have manage to make it work with the first field but the 2nd one
        behaves closer to validate on input rather than on blur.
      </p>
      <Form of={form} onSubmit={onSubmit}>
        <InputField id="name" label="Full name" placeholder="Jhon Smith" />
        <InputField id="email" label="E-mail" placeholder="jhon@email.com" />
        <input type="submit" />
      </Form>
    </div>
  );
}
