import { ButtonExamples, ModalExamples } from './examples';
import { DropdownExamples } from './examples/Dropdown/DropdownExamples';

function App() {
  return (
    <main className="container stack">
      <h1>Accessible Components</h1>

      <ButtonExamples />

      <ModalExamples />

      <DropdownExamples />
    </main>
  );
}

export default App;
