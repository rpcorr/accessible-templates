import { Breadcrumbs, BreadcrumbItem } from '../../components/Breadcrumbs';

export function BreadcrumbsExamples() {
  return (
    <section>
      <h3>Examples</h3>

      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/products">Products</BreadcrumbItem>
        <BreadcrumbItem href="/products/accessibility">
          Web Accessibility Guidelines and Best Practices
        </BreadcrumbItem>
        <BreadcrumbItem current>Breadcrumbs</BreadcrumbItem>
      </Breadcrumbs>
    </section>
  );
}
