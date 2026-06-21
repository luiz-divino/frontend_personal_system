const commitlintConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Aqui você pode sobrescrever regras se necessário no futuro
    "type-enum": [
      2,
      "always",
      [
        "feat", // Nova funcionalidade
        "fix", // Correção de bug
        "docs", // Mudanças na documentação
        "style", // Formatação, ponto e vírgula, etc (não afeta o código)
        "refactor", // Refatoração de código
        "perf", // Melhoria de performance
        "test", // Adição ou correção de testes
        "chore", // Atualização de tarefas de build, pacotes, etc
        "ci", // Mudanças em arquivos de CI/CD
        "build", // Mudanças no sistema de build ou dependências externas
        "revert", // Reversão de um commit anterior
      ],
    ],
  },
};

export default commitlintConfig;
