import { GoogleAuth } from 'google-auth-library';

export class OptimizationAIClient {
  /** @type {import('google-auth-library').Compute | import('google-auth-library/build/src/auth/googleauth').JSONClient} */
  #client;
  /** @type {string} */
  #apiURL;
  /** @type {string} */
  #projectID;

  static #BASE_OPTIMIZATION_AI_API_URL = 'https://cloudoptimization.googleapis.com';
  static #BASE_SCOPES = [
    'https://www.googleapis.com/auth/cloud-platform',
  ];

  constructor(client, apiURL, projectID) {
    this.#client = client;
    this.#apiURL = apiURL;
    this.#projectID = projectID;
  }

  // TODO: Implement
  async batchOptimizeTours() {
    return this.#client.request({
      method: 'POST',
      url: `${this.#buildBaseURL()}:batchOptimizeTours`,
    });
  }

  // TODO: Implement
  async optimizeTours() {
    return this.#client.request({
      method: 'POST',
      url: `${this.#buildBaseURL()}:optimizeTours`,
    });
  }

  #buildBaseURL() {
    return `${this.#apiURL}/v1/projects/${this.#projectID}`;
  }

  static async make() {
    const auth = new GoogleAuth({
      scopes: OptimizationAIClient.#BASE_SCOPES,
    });

    const client = await auth.getClient();
    const projectID = await auth.getProjectId();

    return new OptimizationAIClient(
      client,
      OptimizationAIClient.#BASE_OPTIMIZATION_AI_API_URL,
      projectID,
    );
  }
}
