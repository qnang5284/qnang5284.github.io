import type {ReactNode} from 'react';
import CamundaMap from './CamundaMap';

export default function Root({children}: {children: ReactNode}): ReactNode {
  return (
    <>
      {children}
      <CamundaMap />
    </>
  );
}
