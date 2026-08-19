import { PageLayout } from '../components/PageLayout/PageLayout';
import { DropdownExamples } from '../examples';

export function DropdownPage() {
  return (
    <PageLayout title="Dropdown Examples">
      <p>
        Accessible dropdown menus with keyboard navigation, nested submenus,
        typeahead support, focus management, and responsive behaviour.
      </p>
      <DropdownExamples />
    </PageLayout>
  );
}
