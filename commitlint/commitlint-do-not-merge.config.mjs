const error_message = `
This step failed because you have at least one commit that starts with DO NOT MERGE (case-insensitive).

Resolve this sentiment and rebase your branch to update your commit messages so this does not appear.
`.trim();

export default {
  plugins: [
    {
      rules: {
        "do-not-merge-checker": (commitMessage, when, pattern) => {
          const { raw } = commitMessage;
          if (!pattern) return [false, "missing pattern"];
          const regex = new RegExp(pattern);
          let result = regex.test(raw ?? "");
          if (when === "never") result = !result;
          return [result, error_message];
        },
      },
    },
  ],
  rules: {
    "do-not-merge-checker": [
      2,  // error
      "never",  // value must NOT match
      /^(DO NOT MERGE)(?:.*?\r?\n?)*$/mi,
    ],
  },
};
