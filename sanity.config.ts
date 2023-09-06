import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';

import {
  sanityAPIVersion as apiVersion,
  sanityDataset as dataset,
  sanityProjectId as projectId,
  sanityTitle as title,
} from './lib/environment';
import schemas from './sanity/schemas';
import { defaultDocumentNode } from './sanity/desk/defaultDocumentNode';
import SanityNavBar from './src/components/SanityNavBar';
import { myTheme } from './theme';

const config = defineConfig({
  apiVersion,
  basePath: '/admin',
  dataset,
  plugins: [deskTool(), visionTool()],
  projectId,
  schema: { types: schemas },
  studio: {
    components: {
      navbar: SanityNavBar,
    },
  },
  theme: myTheme,
  title,
});

export default config;
