import { ButtonExamples, ModalExamples } from './examples';
import { DropdownExamples } from './examples/Dropdown/DropdownExamples';
import { NavigationExamples } from './examples/Navigation/NavigationExamples';

function App() {
  return (
    <main className="container stack">
      <h1>Accessible Components</h1>

      <ButtonExamples />

      <ModalExamples />

      <DropdownExamples />

      <NavigationExamples />
    </main>
  );
}

export default App;
