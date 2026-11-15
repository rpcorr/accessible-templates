export type PasswordStrengthScore = 0 | 1 | 2 | 3 | 4;

let estimatorPromise: Promise<import('@zxcvbn-ts/core').ZxcvbnFactory> | null =
  null;

async function getEstimator() {
  if (!estimatorPromise) {
    estimatorPromise = Promise.all([
      import('@zxcvbn-ts/core'),
      import('@zxcvbn-ts/language-common'),
      import('@zxcvbn-ts/language-en'),
    ]).then(([core, common, english]) => {
      return new core.ZxcvbnFactory({
        dictionary: {
          ...common.dictionary,
          ...english.dictionary,
        },
        graphs: common.adjacencyGraphs,
        translations: english.translations,
        useLevenshteinDistance: true,
      });
    });
  }

  return estimatorPromise;
}

export async function getPasswordStrength(
  password: string,
): Promise<PasswordStrengthScore> {
  const estimator = await getEstimator();
  const result = estimator.check(password);

  return result.score as PasswordStrengthScore;
}
