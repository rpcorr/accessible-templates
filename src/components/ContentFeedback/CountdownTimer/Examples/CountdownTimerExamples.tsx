import { CountdownTimer } from '..';
import { countdownTimerExamples } from '../../../../data/countdownTimerExampleData';

const exampleStartTime = Date.now();

export function CountdownTimerExamples() {
  return (
    <section>
      {countdownTimerExamples.map((example) => (
        <div key={example.id}>
          <h4>{example.title}</h4>

          <CountdownTimer
            targetDate={
              new Date(exampleStartTime + example.durationMinutes * 60 * 1000)
            }
            label={example.label}
            completionMessage={example.completionMessage}
          />
        </div>
      ))}

      <div>
        <h4>Flip Countdown Timer</h4>

        <CountdownTimer
          targetDate={new Date(exampleStartTime + 10 * 60 * 1000)}
          label="Time until the flip countdown ends"
          completionMessage="The flip countdown has ended."
          variant="flip"
        />
      </div>
    </section>
  );
}
