import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { FileUploadExamples } from './examples/FileUploadExamples';

export function FileUploadPage() {
  return (
    <PageLayout
      title="File Upload"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>File Upload</BreadcrumbItem>
        </>
      }
    >
      <main className="stack">
        <FileUploadExamples />
      </main>
    </PageLayout>
  );
}
