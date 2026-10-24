import { Badge } from '../../../components/ContentFeedback/Badge';

export const BadgeExamples = () => {
  return (
    <section className="stack">
      <h4>Variants</h4>

      <div className="stack">
        <div>
          <p>Default</p>
          <Badge variant="default">Default</Badge>
        </div>

        <div>
          <p>Success</p>
          <Badge variant="success">Completed</Badge>
        </div>

        <div>
          <p>Warning</p>
          <Badge variant="warning">Pending</Badge>
        </div>

        <div>
          <p>Error</p>
          <Badge variant="error">Failed</Badge>
        </div>

        <div>
          <p>Info</p>
          <Badge variant="info">Information</Badge>
        </div>

        <div>
          <p>Neutral</p>
          <Badge variant="neutral">Draft</Badge>
        </div>
      </div>

      <h4>Sizes</h4>

      <div className="stack">
        <div>
          <p>Small</p>
          <Badge size="small">Small Badge</Badge>
        </div>

        <div>
          <p>Medium (default)</p>
          <Badge size="medium">Medium Badge</Badge>
        </div>
      </div>

      <h4>Resource Categories</h4>

      <p>
        Badges can identify the category or type of a resource without replacing
        its heading or description.
      </p>

      <div className="stack">
        <div>
          <Badge variant="info" size="small">
            Accessibility Guide
          </Badge>
          <h5>Getting Started with WCAG 2.2</h5>
          <p>
            Learn practical steps for creating more inclusive digital
            experiences.
          </p>
        </div>

        <div>
          <Badge variant="default" size="small">
            Documentation
          </Badge>
          <h5>Component Implementation Guide</h5>
          <p>
            Review implementation guidance for reusable interface components.
          </p>
        </div>
      </div>

      <h4>Project Status</h4>

      <p>
        Status badges combine meaningful text with a visual variant, so status
        is not communicated by colour alone.
      </p>

      <div className="stack">
        <div>
          <Badge variant="success" size="small">
            On track
          </Badge>
          <p>Project milestones are progressing as planned.</p>
        </div>

        <div>
          <Badge variant="warning" size="small">
            At risk
          </Badge>
          <p>This project may need additional attention.</p>
        </div>

        <div>
          <Badge variant="error" size="small">
            Delayed
          </Badge>
          <p>This project is behind its planned schedule.</p>
        </div>

        <div>
          <Badge variant="neutral" size="small">
            Not started
          </Badge>
          <p>Work on this project has not yet begun.</p>
        </div>
      </div>

      <h4>Notification Count</h4>

      <p>
        A badge can summarize the number of new notifications when its meaning
        is clear from the surrounding context.
      </p>

      <div>
        <span>Notifications </span>
        <Badge variant="info" size="small">
          3 new
        </Badge>
      </div>

      <h4>Combined Variants and Sizes</h4>

      <p>
        The variant and size props can be combined to suit different interface
        contexts.
      </p>

      <div className="stack">
        <div>
          <Badge variant="success" size="small">
            Saved
          </Badge>
          <Badge variant="warning" size="small">
            Review required
          </Badge>
          <Badge variant="error" size="small">
            Failed
          </Badge>
        </div>

        <div>
          <Badge variant="success" size="medium">
            Completed
          </Badge>
          <Badge variant="warning" size="medium">
            Pending review
          </Badge>
          <Badge variant="neutral" size="medium">
            Archived
          </Badge>
        </div>
      </div>

      <h4>Accessibility</h4>

      <ul>
        <li>
          Badges are non-interactive labels and are not keyboard-focusable by
          default.
        </li>
        <li>
          Use descriptive text so the meaning is not conveyed through colour
          alone.
        </li>
        <li>
          Maintain sufficient text and background contrast for every variant.
        </li>
        <li>
          Do not rely on a Badge to announce dynamic updates. Use an appropriate
          live-region or status component when an announcement is needed.
        </li>
      </ul>
    </section>
  );
};

export default BadgeExamples;
