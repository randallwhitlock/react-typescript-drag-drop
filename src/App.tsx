import * as React from 'react';
import Container from '@mui/material/Container';
import { ImageUploader } from './components/ImageUploader/ImageUploader';

export default function App() {
  return (
    <Container maxWidth="sm">
          <ImageUploader limit={5} />
    </Container>
  );
}
