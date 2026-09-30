import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '3qbfjk9s',
    dataset: 'production',
  },
  typegen: {
    enabled: true,
    path: '../website/src/**/*.{ts,tsx,js,jsx}',
    schema: 'schema.json',
    generates: '../website/sanity.types.ts',
    overloadClientMethods: true,
  },
  deployment: {
    appId: 'g8a6b0bohg03tqcl5xexe20z',
    autoUpdates: true,
  },
})
