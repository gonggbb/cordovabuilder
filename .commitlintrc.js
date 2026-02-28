module.exports = {
  // 继承 @commitlint/config-conventional 的默认规则
  extends: ['@commitlint/config-conventional'],

  rules: {
    // 规则1：subject（简短描述）必须使用 sentence-case（句首大写）
    'subject-case': [2, 'always', 'sentence-case'],
    //           [错误级别, 应用时机, 具体规则]
    // 2 = error（不满足则报错），1 = warning，0 = off
    // 'always' = 必须满足，'never' = 必须不满足

    // 规则2：type（提交类型）必须是以下枚举值之一
    'type-enum': [
      2,        // 错误级别：error
      'always', // 必须满足
      [         // 允许的 type 列表
        'feat',     // 新功能（feature）
        'fix',      // 修复 bug
        'docs',     // 文档更新
        'style',    // 代码格式（不影响代码含义）
        'refactor', // 重构（既不修复bug也不添加功能）
        'perf',     // 性能优化
        'test',     // 测试相关
        'build',    // 构建系统或外部依赖
        'ci',       // CI 配置更改
        'chore',    // 其他不修改src或test的改动
        'revert'    // 回滚提交
      ]
    ]
  }
}
