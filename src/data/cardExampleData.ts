import type { BadgeVariant } from '../components/ContentFeedback/Badge/Badge';

export const notifications = [
  {
    id: 'review',
    title: 'Accessibility review completed',
    description: 'The latest component review is ready to read.',
    linkLabel: 'Read review',
    href: '/components',
    variant: 'info',
  },
  {
    id: 'action',
    title: 'Action required',
    description: 'Two outstanding items need your attention.',
    linkLabel: 'Review items',
    href: '/data-display/card',
    variant: 'warning',
  },
  {
    id: 'saved',
    title: 'Changes saved',
    description: 'Your latest updates were saved successfully.',
    variant: 'success',
  },
];

export const recentActivities = [
  {
    id: 'profile',
    title: 'Profile updated',
    description: 'Contact information was updated.',
    dateTime: '2026-10-23T09:15',
    dateLabel: 'Today, 9:15 AM',
  },
  {
    id: 'document',
    title: 'Document uploaded',
    description: 'Accessibility audit report was added.',
    dateTime: '2026-10-22T14:30',
    dateLabel: 'Yesterday, 2:30 PM',
  },
  {
    id: 'milestone',
    title: 'Project milestone completed',
    description: 'Initial component review was completed.',
    dateTime: '2026-10-21T11:00',
    dateLabel: 'October 21, 11:00 AM',
  },
];

export const statisticsCards: {
  id: string;
  label: string;
  value: number;
  description: string;
  status: string;
  variant: BadgeVariant;
}[] = [
  {
    id: 'active',
    label: 'Active Projects',
    value: 24,
    description: 'Projects currently in progress across the organization.',
    status: 'On track',
    variant: 'success',
  },
  {
    id: 'risk',
    label: 'Projects at Risk',
    value: 6,
    description: 'Projects requiring attention to meet their deadlines.',
    status: 'At risk',
    variant: 'warning',
  },
  {
    id: 'delayed',
    label: 'Delayed Projects',
    value: 3,
    description: 'Projects currently behind their planned schedule.',
    status: 'Delayed',
    variant: 'error',
  },
];
