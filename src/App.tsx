import InputField from "./components/InputField";

export default function App() {
  return (
    <div id="App">
      <h1>This is a Sample Form Page</h1>
      <form>
        <InputField id="name" label="Full name" placeholder="Jhon Smith" />
        <InputField id="email" label="E-mail" placeholder="jhon@email.com" />
        <input type="submit" />
      </form>
    </div>
  );
}
