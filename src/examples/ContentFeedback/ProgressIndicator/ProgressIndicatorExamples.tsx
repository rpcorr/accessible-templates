import { useEffect, useState } from 'react';
import { ProgressIndicator } from '../../../components/ContentFeedback/ProgressIndicator';
import { Tabs } from '../../../components/ContentFeedback/Tab';

export const ProgressIndicatorExamples = () => {
  const [progress, setProgress] = useState(0);
  const [circularProgress, setCircularProgress] = useState(0);
  const [iconProgress, setIconProgress] = useState(0);
  const [fillProgress, setFillProgress] = useState(0);

  const [isRunning, setIsRunning] = useState(false);
  const [isCircularRunning, setIsCircularRunning] = useState(false);
  const [isIconRunning, setIsIconRunning] = useState(false);
  const [isFillRunning, setIsFillRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const timer = window.setInterval(() => {
      setProgress((current) => {
        const next = Math.min(current + 10, 100);

        if (next === 100) {
          setIsRunning(false);
        }

        return next;
      });
    }, 500);

    return () => window.clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (!isCircularRunning) {
      return;
    }

    const timer = window.setInterval(() => {
      setCircularProgress((current) => {
        const next = Math.min(current + 10, 100);

        if (next === 100) {
          setIsCircularRunning(false);
        }

        return next;
      });
    }, 500);

    return () => window.clearInterval(timer);
  }, [isCircularRunning]);

  useEffect(() => {
    if (!isIconRunning) {
      return;
    }

    const timer = window.setInterval(() => {
      setIconProgress((current) => {
        const next = Math.min(current + 10, 100);

        if (next === 100) {
          setIsIconRunning(false);
        }

        return next;
      });
    }, 500);

    return () => window.clearInterval(timer);
  }, [isIconRunning]);

  useEffect(() => {
    if (!isFillRunning) {
      return;
    }

    const timer = window.setInterval(() => {
      setFillProgress((current) => {
        const next = Math.min(current + 10, 100);

        if (next === 100) {
          setIsFillRunning(false);
        }

        return next;
      });
    }, 500);

    return () => window.clearInterval(timer);
  }, [isFillRunning]);

  const startProgress = () => {
    setProgress(0);
    setIsRunning(true);
  };

  const resetProgress = () => {
    setProgress(0);
    setIsRunning(false);
  };

  const startCircularProgress = () => {
    setCircularProgress(0);
    setIsCircularRunning(true);
  };

  const resetCircularProgress = () => {
    setCircularProgress(0);
    setIsCircularRunning(false);
  };

  const startIconProgress = () => {
    setIconProgress(0);
    setIsIconRunning(true);
  };

  const resetIconProgress = () => {
    setIconProgress(0);
    setIsIconRunning(false);
  };

  const startFillProgress = () => {
    setFillProgress(0);
    setIsFillRunning(true);
  };

  const resetFillProgress = () => {
    setFillProgress(0);
    setIsFillRunning(false);
  };

  return (
    <section>
      <h3>Examples</h3>

      <Tabs
        tabs={[
          {
            id: 'basic',
            label: 'Basic',
            content: (
              <>
                <h4>Basic</h4>

                <ProgressIndicator value={50} label="Progress" showValue />

                <h4>Determinate Progress</h4>

                <div className="stack">
                  <ProgressIndicator
                    value={25}
                    label="Downloading files"
                    showValue
                  />

                  <ProgressIndicator
                    value={50}
                    label="Installing updates"
                    showValue
                  />

                  <ProgressIndicator
                    value={75}
                    label="Processing request"
                    showValue
                  />

                  <ProgressIndicator value={100} label="Complete" showValue />
                </div>

                <h4>Custom Maximum</h4>

                <ProgressIndicator
                  value={3}
                  max={5}
                  label="Step progress"
                  showValue
                  wavy
                  colour="error"
                />

                <h4>Dynamic Progress</h4>

                <div className="stack">
                  <ProgressIndicator
                    value={progress}
                    label="Uploading files"
                    showValue
                  />

                  <div>
                    <button
                      type="button"
                      onClick={startProgress}
                      disabled={isRunning}
                    >
                      Start upload
                    </button>

                    <button
                      type="button"
                      onClick={resetProgress}
                      disabled={!isRunning && progress === 0}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </>
            ),
          },

          {
            id: 'circular',
            label: 'Circular',
            content: (
              <>
                <h4>Circular Progress</h4>

                <div className="progress-circle-row">
                  <div className="progress-circle-item">
                    <ProgressIndicator
                      value={25}
                      label="Downloading files"
                      showValue
                      variant="circular"
                    />
                  </div>

                  <div className="progress-circle-item">
                    <ProgressIndicator
                      value={50}
                      label="Installing updates"
                      showValue
                      variant="circular"
                    />
                  </div>

                  <div className="progress-circle-item">
                    <ProgressIndicator
                      value={75}
                      label="Processing request"
                      showValue
                      variant="circular"
                    />
                  </div>

                  <div className="progress-circle-item">
                    <ProgressIndicator
                      value={100}
                      label="Complete"
                      showValue
                      variant="circular"
                    />
                  </div>
                </div>

                <h4>Dynamic Circular Progress</h4>

                <div>
                  <ProgressIndicator
                    value={circularProgress}
                    label="Uploading files"
                    showValue
                    variant="circular"
                  />

                  <div>
                    <button
                      type="button"
                      onClick={startCircularProgress}
                      disabled={isCircularRunning}
                    >
                      Start upload
                    </button>

                    <button
                      type="button"
                      onClick={resetCircularProgress}
                      disabled={!isCircularRunning && circularProgress === 0}
                    >
                      Reset
                    </button>
                  </div>
                </div>

                <h4>Indeterminate Circular Progress</h4>

                <ProgressIndicator label="Loading results" variant="circular" />
              </>
            ),
          },

          {
            id: 'icon',
            label: 'Icon',
            content: (
              <>
                <h4>Icon Progress</h4>

                <div className="stack">
                  <ProgressIndicator
                    value={35}
                    label="Flight progress"
                    showValue
                    variant="icon"
                    icon="✈️"
                  />

                  <ProgressIndicator
                    value={45}
                    label="Delivery progress"
                    showValue
                    variant="icon"
                    icon="🚚"
                  />

                  <ProgressIndicator
                    value={80}
                    label="Course progress"
                    showValue
                    variant="icon"
                    icon="🎓"
                  />

                  <ProgressIndicator
                    value={30}
                    label="Deployment progress"
                    showValue
                    variant="icon"
                    icon="🚀"
                  />
                </div>

                <h4>Dynamic Icon Progress</h4>

                <div className="stack">
                  <ProgressIndicator
                    value={iconProgress}
                    label="Flight progress"
                    showValue
                    variant="icon"
                    icon="✈️"
                  />

                  <div>
                    <button
                      type="button"
                      onClick={startIconProgress}
                      disabled={isIconRunning}
                    >
                      Start flight
                    </button>

                    <button
                      type="button"
                      onClick={resetIconProgress}
                      disabled={!isIconRunning && iconProgress === 0}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </>
            ),
          },

          {
            id: 'fill',
            label: 'Fill',
            content: (
              <>
                <h4>Fill Container Progress</h4>

                <div className="progress-circle-row">
                  <div className="progress-circle-item">
                    <ProgressIndicator
                      value={25}
                      label="Water level"
                      showValue
                      variant="fill"
                      colour="info"
                      wavy
                    />
                  </div>

                  <div className="progress-circle-item">
                    <ProgressIndicator
                      value={50}
                      label="Water level"
                      showValue
                      variant="fill"
                      colour="info"
                    />
                  </div>

                  <div className="progress-circle-item">
                    <ProgressIndicator
                      value={75}
                      label="Water level"
                      showValue
                      variant="fill"
                      colour="info"
                      wavy
                    />
                  </div>

                  <div className="progress-circle-item">
                    <ProgressIndicator
                      value={100}
                      label="Full"
                      showValue
                      variant="fill"
                      colour="info"
                    />
                  </div>
                </div>

                <h4>Dynamic Fill Container Progress</h4>

                <div className="stack">
                  <ProgressIndicator
                    value={fillProgress}
                    label="Water level"
                    showValue
                    variant="fill"
                    colour="info"
                    wavy
                  />

                  <div>
                    <button
                      type="button"
                      onClick={startFillProgress}
                      disabled={isFillRunning}
                    >
                      Fill container
                    </button>

                    <button
                      type="button"
                      onClick={resetFillProgress}
                      disabled={!isFillRunning && fillProgress === 0}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </>
            ),
          },

          {
            id: 'colours',
            label: 'Colours',
            content: (
              <>
                <h4>Colour Variants</h4>

                <div className="stack">
                  <ProgressIndicator
                    value={75}
                    label="Success"
                    showValue
                    colour="success"
                  />

                  <ProgressIndicator
                    value={50}
                    label="Warning"
                    showValue
                    colour="warning"
                    wavy
                  />

                  <ProgressIndicator
                    value={35}
                    label="Error"
                    showValue
                    colour="error"
                  />

                  <ProgressIndicator
                    value={60}
                    label="Information"
                    showValue
                    colour="info"
                  />
                </div>
              </>
            ),
          },
        ]}
      />
    </section>
  );
};

export default ProgressIndicatorExamples;
