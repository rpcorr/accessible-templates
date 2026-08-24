import { PageLayout } from '../components/PageLayout/PageLayout';
import { TabsExamples } from '../examples/Tab/TabExamples';

export function TabsPage() {
  return (
    <PageLayout title="Tab">
      <p>
        Accessible tabs with keyboard navigation, focus management, disabled
        tabs, and support for both horizontal and vertical orientations.
      </p>

      <TabsExamples />
    </PageLayout>
  );
}
