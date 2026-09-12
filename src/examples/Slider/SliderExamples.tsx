import { useState } from 'react';
import { Slider } from '../../components/FormControls/Slider';
import { Tabs } from '../../components/Tab';

export function SliderExamples() {
  const [volume, setVolume] = useState(50);

  return (
    <Tabs
      tabs={[
        {
          id: 'basic',
          label: 'Basic',
          content: (
            <div className="stack">
              <div>
                <h4>Basic Slider</h4>

                <Slider label="Volume" />
              </div>
              <div>
                <h4>Custom Range</h4>

                <Slider
                  label="Temperature"
                  min={10}
                  max={30}
                  defaultValue={20}
                />
              </div>
              <div>
                <h4>Step Values</h4>

                <Slider
                  label="Rating"
                  min={0}
                  max={10}
                  step={1}
                  defaultValue={5}
                />
              </div>
              <div>
                <h4>Controlled Slider</h4>

                <Slider label="Volume" value={volume} onChange={setVolume} />

                <p>Current volume: {volume}</p>
              </div>
              <div>
                <h4>Colour Variants</h4>

                <div className="stack">
                  <Slider label="Default" colour="default" defaultValue={50} />

                  <Slider label="Success" colour="success" defaultValue={60} />

                  <Slider label="Warning" colour="warning" defaultValue={40} />

                  <Slider label="Error" colour="error" defaultValue={70} />

                  <Slider label="Info" colour="info" defaultValue={30} />
                </div>
              </div>

              <div>
                <h4>Formatted Values</h4>

                <div className="stack">
                  <Slider
                    label="Opacity"
                    defaultValue={75}
                    formatValue={(value) => `${value}%`}
                  />

                  <Slider
                    label="Price"
                    min={0}
                    max={1000}
                    step={10}
                    colour="success"
                    defaultValue={500}
                    formatValue={(value) => `$${value}`}
                  />

                  <Slider
                    label="Temperature"
                    min={0}
                    max={40}
                    colour="info"
                    defaultValue={20}
                    formatValue={(value) => `${value}°C`}
                  />
                </div>
              </div>

              <div>
                <h4>Vertical Slider</h4>

                <Slider
                  label="Volume"
                  orientation="vertical"
                  defaultValue={65}
                  colour="info"
                />
              </div>
            </div>
          ),
        },
        {
          id: 'states',
          label: 'States',
          content: (
            <div className="stack">
              <div>
                <h4>Without Visible Value</h4>

                <Slider
                  label="Brightness"
                  defaultValue={75}
                  showValue={false}
                />
              </div>

              <div>
                <h4>Disabled</h4>

                <Slider label="Disabled slider" defaultValue={50} disabled />
              </div>

              <div>
                <h4>With Description</h4>

                <Slider
                  label="Notification volume"
                  description="Adjust the volume used for notification sounds."
                  defaultValue={60}
                />
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}
