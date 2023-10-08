import React from 'react';
import { createRoot } from 'react-dom/client';
import { NodeCgThemer } from './NodeCgThemer';

const root = createRoot(document.getElementById('root')!);
root.render(<NodeCgThemer />);
