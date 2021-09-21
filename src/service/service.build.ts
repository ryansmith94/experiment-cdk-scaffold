import * as esbuild from 'esbuild';

export const serviceName = 'service';
export const serviceSrcFilePath = `${__dirname}/${serviceName}.api.ts`;
export const serviceDistFolderPath = `${__dirname}/dist`;
export const serviceDistFilePath = `${serviceDistFolderPath}/${serviceName}.js`;

export async function buildService() {
  // Async stuff here like bundling.
  await esbuild.build({
    entryPoints: [serviceSrcFilePath],
    bundle: true,
    outfile: serviceDistFilePath,
    platform: 'node',
  });
}
