import { useState } from 'react';
import { Card } from '../..';
import { Tabs } from '../../../ContentFeedback/Tab';
import { Badge } from '../../../ContentFeedback/Badge';
import { Switch } from '../../../FormControls/Switch';

import styles from '../../../../components/DataDisplay/Card/Card.module.css';

import {
  notifications,
  recentActivities,
  statisticsCards,
} from '../../../../data/cardExampleData';

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
                          <Badge variant="info" size="small">
                            Accessibility Guide
                          </Badge>
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
                          <Badge variant="default" size="small">
                            Featured Resource
                          </Badge>
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
                          <Badge variant="info" size="small">
                            Community Workshop
                          </Badge>
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
                          <Badge variant="info" size="small">
                            3 new
                          </Badge>
                        </div>
                      }
                      footer={<a href="/components">View all notifications</a>}
                    >
                      <ul className={styles.notificationList}>
                        {notifications.map((notification) => (
                          <li key={notification.id}>
                            <span
                              className={`${styles.notificationIndicator} ${
                                styles[
                                  `notification${notification.variant.charAt(0).toUpperCase()}${notification.variant.slice(1)}`
                                ]
                              }`}
                              aria-hidden="true"
                            />

                            <div className={styles.notificationContent}>
                              <h6>{notification.title}</h6>
                              <p>{notification.description}</p>

                              {notification.linkLabel && (
                                <a href={notification.href}>
                                  {notification.linkLabel}
                                </a>
                              )}
                            </div>
                          </li>
                        ))}
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
                        {recentActivities.map((activity) => (
                          <li key={activity.id}>
                            <span
                              className={styles.activityMarker}
                              aria-hidden="true"
                            />
                            <div className={styles.activityContent}>
                              <h6>{activity.title}</h6>
                              <p>{activity.description}</p>
                              <time dateTime={activity.dateTime}>
                                {activity.dateLabel}
                              </time>
                            </div>
                          </li>
                        ))}
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
                    {statisticsCards.map((statistic) => (
                      <Card key={statistic.id} variant="elevated">
                        <div className={styles.statistic}>
                          <h5 className={styles.statisticLabel}>
                            {statistic.label}
                          </h5>

                          <p className={styles.statisticValue}>
                            {statistic.value}
                          </p>

                          <p className={styles.statisticDescription}>
                            {statistic.description}
                          </p>

                          <Badge variant={statistic.variant} size="small">
                            {statistic.status}
                          </Badge>
                        </div>
                      </Card>
                    ))}
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
