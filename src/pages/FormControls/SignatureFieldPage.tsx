import { PageLayout } from '../../components/PageLayout/PageLayout';
import { BreadcrumbItem } from '../../components/Navigations/Breadcrumbs';
import { SignatureExamples } from './examples/SignatureExamples';

export function SignatureFieldPage() {
  return (
    <PageLayout
      title="Signature Field"
      breadcrumbs={
        <>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/components">Components</BreadcrumbItem>
          <BreadcrumbItem current>Signature Field</BreadcrumbItem>
        </>
      }
    >
      <p>
        The Signature Field allows users to provide a signature by drawing with
        a mouse, finger, or stylus, or by entering a typed signature as an
        alternative. It supports controlled and uncontrolled usage, clearing
        signatures, and restoring saved drawn signatures.
      </p>

      <h3>Accessibility</h3>

      <p>
        A visible label, optional instructions, and validation error messages
        help users understand and interact with the field. The drawing area
        supports mouse, touch, and stylus input through pointer events.
      </p>

      <p>
        Drawing directly on the canvas is not inherently keyboard-operable.
        Users who cannot or prefer not to draw can select the typed-signature
        alternative, which uses a standard text input and keyboard controls.
        Interactive buttons provide visible focus styling.
      </p>

      <h3>Signature Values and States</h3>

      <p>
        Drawn signatures are represented by PNG data URLs, while typed
        signatures are represented by text. The <code>onChange</code> callback
        returns a discriminated value identifying the signature type, or
        <code> null</code> when the field is cleared.
      </p>

      <p>
        Provide both <code>value</code> and <code>onChange</code> to manage the
        signature from a parent component. Omit <code>value</code> to let the
        component manage its own signature state.
      </p>

      <p>
        The field supports required and disabled states, custom instructions,
        and error messages. The <code>required</code> prop indicates that a
        signature is expected, but the consuming form must validate the value
        and prevent submission when a required signature is missing.
      </p>

      <h3>Saved Signatures</h3>

      <p>
        A saved drawn signature can be restored from its PNG data URL when the
        component receives that value. Typed signatures are restored as text.
        Applications should protect signature data and avoid logging signature
        contents unnecessarily.
      </p>

      <h3>Examples</h3>

      <SignatureExamples />
    </PageLayout>
  );
}

export default SignatureFieldPage;
