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
    </section>
  );
}
