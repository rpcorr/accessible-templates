export type ModalExample = {
  id: string;
  exampleLabel: string;
  title: string;
  size?: 'small' | 'medium' | 'large';
  triggerLabel: string;
  type: 'basic' | 'accessible';
  content: React.ReactNode;
  disableClose?: boolean;
  variant?: 'primary' | 'secondary';
};
