import { useState } from 'react';
import { Card } from '../../../../components/DataDisplay';
import { Tabs } from '../../../../components/ContentFeedback/Tab';

import { Switch } from '../../../../components/FormControls/Switch';

import styles from '../../../../components/DataDisplay/Card/Card.module.css';

export default function CardExamples() {
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <div>
      <h3>Examples</h3>

      <Tabs
        tabs={[
          {
            id: 'basic-cards',
            label: 'Basic Cards',
            content: (
              <div className="stack">
                <section>
                  <h4>Basic Card</h4>
                  <p>
                    A simple card containing a heading and descriptive text.
                  </p>

                  <Card>
                    <h5>Accessible Design</h5>
                    <p>
                      Build inclusive digital experiences with semantic HTML,
                      keyboard support, and clear visual presentation.
                    </p>
                  </Card>
                </section>

                <section>
                  <h4>Card with Header and Footer</h4>
                  <p>
                    Optional header and footer sections help organize related
                    content.
                  </p>

                  <Card
                    header={<h5>Account Summary</h5>}
                    footer={<p>Last updated: October 22, 2026</p>}
                  >
                    <p>
                      View your account information and review your recent
                      activity.
                    </p>
                  </Card>
                </section>

                <section>
                  <h4>Elevated Card</h4>
                  <p>
                    The elevated variant adds a subtle shadow to distinguish the
                    card from its surroundings.
                  </p>

                  <Card variant="elevated">
                    <h5>Featured Resource</h5>
                    <p>
                      Explore practical resources for creating accessible
                      websites and applications.
                    </p>
                  </Card>
                </section>
              </div>
            ),
          },
          {
            id: 'content-cards',
            label: 'Content Cards',
            content: (
              <div className="stack">
                <section>
                  <h4>Product or Resource Card</h4>
                  <p>
                    A resource card combines an image, category, title,
                    description, and action link to help users discover relevant
                    content.
                  </p>

                  <div className={styles.resourceCard}>
                    <Card>
                      <div
                        className={styles.resourceImage}
                        role="img"
                        aria-label="Illustration placeholder for an accessibility guide"
                      >
                        <span>Image placeholder</span>
                      </div>

                      <div className={styles.resourceContent}>
                        <p className={styles.resourceCategory}>
                          Accessibility Guide
                        </p>
                        <h5>Getting Started with WCAG 2.2</h5>
                        <p>
                          Learn the key principles of web accessibility and
                          practical steps for creating more inclusive digital
                          experiences.
                        </p>
                        <a href="/components">Explore the guide</a>
                      </div>
                    </Card>
                  </div>
                </section>

                <section>
                  <h4>Featured Content Card</h4>

                  <p>
                    Similar to the Product or Resource Card, a featured card
                    combines an image, heading, description, and action link. It
                    differs by emphasizing important content through a more
                    prominent presentation and visual hierarchy.
                  </p>

                  <div className={styles.featuredCard}>
                    <Card>
                      <div
                        className={styles.featuredImage}
                        role="img"
                        aria-label="Illustration placeholder for an accessibility resource"
                      >
                        <span>Featured image placeholder</span>
                      </div>

                      <div className={styles.featuredContent}>
                        <p className={styles.featuredCategory}>
                          Featured Resource
                        </p>

                        <h5>Building Accessible Websites</h5>

                        <p>
                          Discover practical techniques for creating inclusive
                          websites with accessible components and thoughtful
                          design.
                        </p>

                        <a href="/components">
                          Explore accessibility resources
                        </a>
                      </div>
                    </Card>
                  </div>
                </section>

                <section>
                  <h4>Profile Card</h4>
                  <p>
                    A card can combine images, headings, descriptive text, and
                    links to present a person's information.
                  </p>

                  <div className={styles.profileCard}>
                    <Card
                      header={<h5>Team Member</h5>}
                      footer={<a href="/components">View profile details</a>}
                    >
                      <div className="stack">
                        <div
                          className={styles.profilePlaceholder}
                          role="img"
                          aria-label="Profile photo placeholder"
                        >
                          <span>Profile photo</span>
                        </div>

                        <div>
                          <h5>Alex Morgan</h5>
                          <p>Web Accessibility Specialist</p>
                        </div>

                        <p>
                          Alex helps teams build inclusive digital experiences
                          through accessible design, semantic HTML, and
                          keyboard-friendly interactions.
                        </p>
                      </div>
                    </Card>
                  </div>
                </section>

                <section>
                  <h4>Event Card</h4>
                  <p>
                    An event card highlights the date, time, location, and
                    registration link for an upcoming event.
                  </p>

                  <div className={styles.eventCard}>
                    <Card>
                      <div className={styles.eventDate}>
                        <span>OCT</span>
                        <strong>29</strong>
                        <span>2026</span>
                      </div>

                      <div className={styles.eventContent}>
                        <p className={styles.eventCategory}>
                          Community Workshop
                        </p>
                        <h5>Building More Accessible Websites</h5>
                        <p>
                          Join us for a practical introduction to inclusive
                          design and accessible web development.
                        </p>

                        <dl className={styles.eventDetails}>
                          <div>
                            <dt>Date and time</dt>
                            <dd>
                              <time dateTime="2026-10-29T18:00">
                                October 29, 2026 · 6:00 PM
                              </time>
                            </dd>
                          </div>

                          <div>
                            <dt>Location</dt>
                            <dd>Community Learning Centre, Toronto</dd>
                          </div>
                        </dl>

                        <a href="/components">Register for event</a>
                      </div>
                    </Card>
                  </div>
                </section>

                <section>
                  <h4>Notification Summary Card</h4>
                  <p>
                    A notification summary groups multiple updates into one
                    card, helping users review important information and
                    navigate to relevant actions.
                  </p>

                  <div className={styles.notificationCard}>
                    <Card
                      header={
                        <div className={styles.notificationHeader}>
                          <h5>Notifications</h5>
                          <span className={styles.notificationCount}>
                            3 new
                          </span>
                        </div>
                      }
                      footer={<a href="/components">View all notifications</a>}
                    >
                      <ul className={styles.notificationList}>
                        <li>
                          <span
                            className={`${styles.notificationIndicator} ${styles.notificationInfo}`}
                            aria-hidden="true"
                          />
                          <div className={styles.notificationContent}>
                            <h6>Accessibility review completed</h6>
                            <p>The latest component review is ready to read.</p>
                            <a href="/components">Read review</a>
                          </div>
                        </li>

                        <li>
                          <span
                            className={`${styles.notificationIndicator} ${styles.notificationWarning}`}
                            aria-hidden="true"
                          />
                          <div className={styles.notificationContent}>
                            <h6>Action required</h6>
                            <p>Two outstanding items need your attention.</p>
                            <a href="/data-display/card">Review items</a>
                          </div>
                        </li>

                        <li>
                          <span
                            className={`${styles.notificationIndicator} ${styles.notificationSuccess}`}
                            aria-hidden="true"
                          />
                          <div className={styles.notificationContent}>
                            <h6>Changes saved</h6>
                            <p>Your latest updates were saved successfully.</p>
                          </div>
                        </li>
                      </ul>
                    </Card>
                  </div>
                </section>

                <section>
                  <h4>Recent Activity Card</h4>
                  <p>
                    A recent activity card presents a chronological summary of
                    updates, uploads, and milestones in one easy-to-scan list.
                  </p>

                  <div className={styles.activityCard}>
                    <Card
                      header={<h5>Recent Activity</h5>}
                      footer={<a href="/components">View all activity</a>}
                    >
                      <ol className={styles.activityList}>
                        <li>
                          <span
                            className={styles.activityMarker}
                            aria-hidden="true"
                          />
                          <div className={styles.activityContent}>
                            <h6>Profile updated</h6>
                            <p>Contact information was updated.</p>
                            <time dateTime="2026-10-23T09:15">
                              Today, 9:15 AM
                            </time>
                          </div>
                        </li>

                        <li>
                          <span
                            className={styles.activityMarker}
                            aria-hidden="true"
                          />
                          <div className={styles.activityContent}>
                            <h6>Document uploaded</h6>
                            <p>Accessibility audit report was added.</p>
                            <time dateTime="2026-10-22T14:30">
                              Yesterday, 2:30 PM
                            </time>
                          </div>
                        </li>

                        <li>
                          <span
                            className={styles.activityMarker}
                            aria-hidden="true"
                          />
                          <div className={styles.activityContent}>
                            <h6>Project milestone completed</h6>
                            <p>Initial component review was completed.</p>
                            <time dateTime="2026-10-21T11:00">
                              October 21, 11:00 AM
                            </time>
                          </div>
                        </li>
                      </ol>
                    </Card>
                  </div>
                </section>

                <section>
                  <h4>Settings Card</h4>
                  <p>
                    A settings card groups a preference with explanatory text
                    and an accessible control.
                  </p>

                  <div className={styles.settingsCard}>
                    <Card header={<h5>Notification Settings</h5>}>
                      <Switch
                        label="Email notifications"
                        description="Receive email updates about important announcements and changes."
                        checked={emailNotifications}
                        onChange={setEmailNotifications}
                      />
                    </Card>
                  </div>
                </section>
              </div>
            ),
          },
          {
            id: 'dashboard-cards',
            label: 'Dashboard Cards',
            content: (
              <div className="stack">
                <section>
                  <h4>Statistics Cards</h4>
                  <p>
                    Statistics cards emphasize key metrics with clear labels,
                    supporting context, and status indicators.
                  </p>

                  <div className={styles.statisticsGrid}>
                    <Card variant="elevated">
                      <div className={styles.statistic}>
                        <h5 className={styles.statisticLabel}>
                          Active Projects
                        </h5>
                        <p className={styles.statisticValue}>24</p>
                        <p className={styles.statisticDescription}>
                          Projects currently in progress across the
                          organization.
                        </p>
                        <span
                          className={`${styles.statisticStatus} ${styles.statusOnTrack}`}
                        >
                          On track
                        </span>
                      </div>
                    </Card>

                    <Card variant="elevated">
                      <div className={styles.statistic}>
                        <h5 className={styles.statisticLabel}>
                          Projects at Risk
                        </h5>
                        <p className={styles.statisticValue}>6</p>
                        <p className={styles.statisticDescription}>
                          Projects requiring attention to meet their deadlines.
                        </p>
                        <span
                          className={`${styles.statisticStatus} ${styles.statusAtRisk}`}
                        >
                          At risk
                        </span>
                      </div>
                    </Card>

                    <Card variant="elevated">
                      <div className={styles.statistic}>
                        <h5 className={styles.statisticLabel}>
                          Delayed Projects
                        </h5>
                        <p className={styles.statisticValue}>3</p>
                        <p className={styles.statisticDescription}>
                          Projects currently behind their planned schedule.
                        </p>
                        <span
                          className={`${styles.statisticStatus} ${styles.statusDelayed}`}
                        >
                          Delayed
                        </span>
                      </div>
                    </Card>
                  </div>
                </section>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
