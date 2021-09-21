import { buildService } from './service/service.build';

async function main() {
  await buildService();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
