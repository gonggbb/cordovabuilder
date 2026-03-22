## Cordovabuilder：基于 Docker 的 Cordova 应用构建工具

## 项目简介

**Cordovabuilder** 是一个专为开发者设计的自动化构建平台，旨在简化 Cordova 混合应用的打包流程。通过集成 Docker 容器技术，它实现了跨平台、一致性的构建环境，支持从开发到生产的全流程部署。

> ✅ 支持 Cordova 10、12、13 版本  
> ✅ 兼容 Android 平台  
> ✅ 提供多语言支持（中文/英文）  
> ✅ 集成签名、证书管理、Gradle 缓存优化等功能

## 核心功能

| 功能                   | 描述                                                                            |
| ---------------------- | ------------------------------------------------------------------------------- |
| **Docker 化构建环境**  | 使用预配置镜像（如 `gamesg/cordovabuilder:v2.0.0-rc.5`），确保构建环境一致性    |
| **自动签名与证书管理** | 支持 `apksigner` 和 `jarsigner` 签名方式，兼容旧版与新版标准                    |
| **多版本兼容**         | 支持 Cordova 10（兼容遗留项目）、Cordova 12（推荐生产）、Cordova 13（最新发布） |
| **CI/CD 集成**         | 可轻松接入 GitHub Actions、Jenkins 等 CI 工具，实现自动化部署                   |
| **多语言支持**         | 提供中英双语界面，满足国际化需求                                                |

## 适用场景

- **新项目开发**：推荐使用 `v3.0.0-rc.2`（Cordovabuilder 13）
- **生产环境部署**：推荐使用 `v2.0.0-rc.5`（Cordovabuilder 12）
- **遗留项目维护**：可使用 `v1.0.0-rc.6`（Cordovabuilder 10）

## 实践建议

1. **避免中文路径**：Cordovabuilder 对非 ASCII 路径敏感，建议使用英文路径。
2. **挂载 Gradle 缓存**：提升构建速度，减少重复下载。
3. **使用 PKCS12 格式证书**：兼容性更好，推荐使用 `apksigner` 签名。
4. **日志排查**：启用 `nohup.log` 输出，便于调试构建过程。

## 多语言支持

- **English**: 默认语言，适合国际团队
- **简体中文**: 本地化支持，方便中文用户阅读

## 文档与资源

- [GitHub 仓库](https://github.com/gonggbb/cordovabuilder)
- [官方文档](https://gonggbb.github.io/cordovabuilder/)
- [GitHub 镜像](https://github.com/gonggbb/docker-cordovabuilder/pkgs/container/docker-cordovabuilder)
- [Docker Hub 镜像](https://hub.docker.com/r/gamesg/cordovabuilder)

## 目标用户

- 移动应用开发者
- DevOps 工程师
- CI/CD 构建负责人
- 企业级混合应用团队

## 附录：版本对比表

![cordova/version](/cordova/version.png)

<!-- ## 附录：版本对比表 -->

<!--
| 版本        | Cordova | Java    | Gradle | Node.js | 推荐用途     |
| -- | - | - |  | - |  |
| v3.0.0-rc.1 | 13      | 17.0.10 | 8.7    | 20.19.5 | 新项目开发   |
| v2.0.0-rc.4 | 12      | 11/17   | 7.6    | 18.20.8 | 生产环境     |
| v1.0.0-rc.5 | 10      | 1.8     | 6.5    | 10.15.3 | 遗留项目维护 | -->

<!-- <table>
  <thead>
    <tr>
      <th>版本</th>
      <th>核心组件</th>
      <th>适用场景</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>v3.0.0-rc.1</strong><br>Cordova 13<br>📅 2025.11.25（最新发布）</td>
      <td>
        • Java 17.0.10<br>
        • Gradle 8.7<br>
        • Node.js 20.19.5<br>
        • Build Tools ^34.0.0
      </td>
      <td style="color:green;">✅ <strong>新项目开发</strong></td>
    </tr>
    <tr>
      <td><strong>v2.0.0-rc.4</strong><br>Cordova 12<br>📅 2023.5.22</td>
      <td>
        • Java 11/17<br>
        • Gradle 7.6<br>
        • Node.js 18.20.8<br>
        • Build Tools ^33.0.2
      </td>
      <td style="color:green;">✅ <strong>推荐生产环境</strong></td>
    </tr>
    <tr>
      <td><strong>v1.0.0-rc.5</strong><br>Cordova 10<br>📅 2021.7.20</td>
      <td>
        • Java 1.8<br>
        • Gradle 6.5<br>
        • Node.js 10.15.3<br>
        • SDK 30
      </td>
      <td style="color:orange;">⚠️ <strong>遗留项目维护</strong></td>
    </tr>
  </tbody>
</table> -->

## 联系我们

如有问题或建议，请提交 Issue 至 [GitHub 仓库](https://github.com/gonggbb/cordovabuilder/issues) 或联系维护者：[github.com/gonggbb](https://github.com/gonggbb)

> ✨ **让 Cordova 构建更简单，让开发更高效！**
