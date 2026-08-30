import { Breadcrumbs, BreadcrumbItem } from '../../components/Breadcrumbs';

export function BreadcrumbsExamples() {
  return (
    <section>
      <h3>Examples</h3>

      <h4>Slash separator</h4>

      <Breadcrumbs separator="slash">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/products">Products</BreadcrumbItem>
        <BreadcrumbItem href="/products/accessibility">
          Accessibility
        </BreadcrumbItem>
        <BreadcrumbItem current>Breadcrumbs</BreadcrumbItem>
      </Breadcrumbs>

      <h4>Chevron separator</h4>

      <Breadcrumbs separator="chevron">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/products">Products</BreadcrumbItem>
        <BreadcrumbItem href="/products/accessibility">
          Accessibility
        </BreadcrumbItem>
        <BreadcrumbItem current>Breadcrumbs</BreadcrumbItem>
      </Breadcrumbs>

      <h4>Greater-than separator</h4>

      <Breadcrumbs separator="greater-than">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/products">Products</BreadcrumbItem>
        <BreadcrumbItem href="/products/accessibility">
          Accessibility
        </BreadcrumbItem>
        <BreadcrumbItem current>Breadcrumbs</BreadcrumbItem>
      </Breadcrumbs>

      <h4>Pill</h4>

      <Breadcrumbs separator="pill">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/products">Products</BreadcrumbItem>
        <BreadcrumbItem href="/products/accessibility">
          Accessibility
        </BreadcrumbItem>
        <BreadcrumbItem current>Breadcrumbs</BreadcrumbItem>
      </Breadcrumbs>

      <h4>Pill with background</h4>

      <Breadcrumbs separator="pill" variant="pill-background">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/products">Products</BreadcrumbItem>
        <BreadcrumbItem href="/products/accessibility">
          Accessibility
        </BreadcrumbItem>
        <BreadcrumbItem current>Breadcrumbs</BreadcrumbItem>
      </Breadcrumbs>

      <h4>Pill with background and active page indication</h4>

      <Breadcrumbs separator="pill" variant="pill-active">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/products">Products</BreadcrumbItem>
        <BreadcrumbItem href="/products/accessibility">
          Accessibility
        </BreadcrumbItem>
        <BreadcrumbItem current>Breadcrumbs</BreadcrumbItem>
      </Breadcrumbs>

      <h4>Arrow with background and active page indication</h4>

      <Breadcrumbs separator="arrow">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/products">Products</BreadcrumbItem>
        <BreadcrumbItem href="/products/accessibility">
          Accessibility
        </BreadcrumbItem>
        <BreadcrumbItem current>Breadcrumbs</BreadcrumbItem>
      </Breadcrumbs>
    </section>
  );
}
