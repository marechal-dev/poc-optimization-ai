import { OptimizationAIClient } from './OptimizationAIClient.mjs';

async function main() {
  const client = await OptimizationAIClient.make();

  client.batchOptimizeTours();
  client.optimizeTours();
}

main();
