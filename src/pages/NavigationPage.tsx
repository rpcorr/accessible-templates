import { PageLayout } from '../components/PageLayout/PageLayout';
import { NavigationExamples } from '../examples';

export function NavigationPage() {
  return (
    <PageLayout title="Navigation Examples">
      <p>
        Accessible responsive navigation with nested submenus, keyboard
        navigation, focus management, and a mobile navigation drawer.
      </p>
      <NavigationExamples />
    </PageLayout>
  );
}
