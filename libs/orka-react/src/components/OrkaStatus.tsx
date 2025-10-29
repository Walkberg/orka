import { useOrka } from '../providers/OrkaProvider';

interface OrkaStatusProps {
  children?: React.ReactNode;
}

export const OrkaLoading = ({ children }: OrkaStatusProps) => {
  const { status } = useOrka();
  return status !== 'loading' ? null : children;
};

export const OrkaLoaded = ({ children }: OrkaStatusProps) => {
  const { status } = useOrka();
  return status !== 'ready' && status !== 'degraded' ? null : children;
};

export const OrkaError = ({ children }: OrkaStatusProps) => {
  const { status } = useOrka();
  return status !== 'error' ? null : children;
};

export const OrkaDegraded = ({ children }: OrkaStatusProps) => {
  const { status } = useOrka();
  return status !== 'degraded' ? null : children;
};
