import { LoadingSpinner } from '../../components/LoadingSpinner';

export const LoadingSpinnerExamples = () => {
  return (
    <section>
      <h3>Examples</h3>

      <h4>Size Variants</h4>

      <div className="row">
        <LoadingSpinner label="Loading content" size="small" />
        <LoadingSpinner label="Loading content" size="medium" />
        <LoadingSpinner label="Loading content" size="large" />
      </div>

      <h4>Colour Variants</h4>

      <div className="row">
        <LoadingSpinner label="Loading" colour="default" />
        <LoadingSpinner label="Loading" colour="success" />
        <LoadingSpinner label="Loading" colour="warning" />
        <LoadingSpinner label="Loading" colour="error" />
        <LoadingSpinner label="Loading" colour="info" />
      </div>

      <h4>Animation Variants</h4>

      <p>
        The Loading Spinner supports spinner, dots, pulse, bars, orbit, and
        comet presentations for communicating indeterminate activity.
      </p>

      <div className="row">
        <LoadingSpinner label="Loading content" variant="spinner" />
        <LoadingSpinner label="Loading content" variant="dots" />
        <LoadingSpinner label="Loading content" variant="pulse" />
        <LoadingSpinner label="Loading content" variant="bars" />
        <LoadingSpinner label="Loading content" variant="orbit" />
        <LoadingSpinner label="Loading content" variant="comet" />
      </div>

      <h4>Animation Variant Sizes</h4>

      <p>
        Animation variants can be combined with the <code>size</code> prop to
        create loading indicators of different visual sizes.
      </p>

      <div className="row loadingSpinnerSizes">
        <LoadingSpinner label="Loading" variant="spinner" size="small" />
        <LoadingSpinner label="Loading" variant="spinner" size="medium" />
        <LoadingSpinner label="Loading" variant="spinner" size="large" />
      </div>

      <div className="row loadingSpinnerSizes">
        <LoadingSpinner label="Loading" variant="dots" size="small" />
        <LoadingSpinner label="Loading" variant="dots" size="medium" />
        <LoadingSpinner label="Loading" variant="dots" size="large" />
      </div>

      <div className="row loadingSpinnerSizes">
        <LoadingSpinner label="Loading" variant="pulse" size="small" />
        <LoadingSpinner label="Loading" variant="pulse" size="medium" />
        <LoadingSpinner label="Loading" variant="pulse" size="large" />
      </div>

      <div className="row loadingSpinnerSizes">
        <LoadingSpinner label="Loading" variant="bars" size="small" />
        <LoadingSpinner label="Loading" variant="bars" size="medium" />
        <LoadingSpinner label="Loading" variant="bars" size="large" />
      </div>

      <div className="row loadingSpinnerSizes">
        <LoadingSpinner label="Loading" variant="orbit" size="small" />
        <LoadingSpinner label="Loading" variant="orbit" size="medium" />
        <LoadingSpinner label="Loading" variant="orbit" size="large" />
      </div>

      <div className="row loadingSpinnerSizes">
        <LoadingSpinner label="Loading" variant="comet" size="small" />
        <LoadingSpinner label="Loading" variant="comet" size="medium" />
        <LoadingSpinner label="Loading" variant="comet" size="large" />
      </div>

      <h4>Combined Options</h4>

      <p>
        Size, colour, animation variant, and accessible labels can be combined
        to create loading indicators appropriate for different interface
        contexts.
      </p>

      <div className="row">
        <LoadingSpinner
          label="Loading content"
          variant="dots"
          size="small"
          colour="info"
        />

        <LoadingSpinner
          label="Saving changes"
          variant="bars"
          size="medium"
          colour="success"
        />

        <LoadingSpinner
          label="Processing request"
          variant="pulse"
          size="large"
          colour="warning"
        />

        <LoadingSpinner
          label="Processing request"
          variant="comet"
          size="large"
          colour="error"
        />
      </div>

      <h4>Visible Labels</h4>

      <p>
        Use the <code>showLabel</code> prop to display the loading message
        alongside the indicator.
      </p>

      <div className="row">
        <LoadingSpinner label="Loading content" showLabel size="small" />

        <LoadingSpinner label="Saving changes" showLabel size="medium" />

        <LoadingSpinner
          label="Processing request"
          showLabel
          size="large"
          colour="success"
        />
      </div>
    </section>
  );
};
