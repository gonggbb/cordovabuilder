## Cordovabuilder: A Docker-based Cordova application building tool

## Project Introduction

**Cordovabuilder** is an automated build platform designed specifically for developers, aiming to simplify the packaging process of Cordova hybrid applications. By integrating Docker container technology, it achieves a cross-platform and consistent build environment, supporting the full deployment process from development to production.

## Core functions

| Function                                           | Description                                                                                                                     |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Dockerized build environment**                   | Use preconfigured images (such as `gamesg/cordovabuilder:v2.0.0-rc.5`) to ensure consistency in the build environment           |
| **Automatic Signature and Certificate Management** | Supports `apksigner` and `jarsigner` signature methods, compatible with both old and new standards                              |
| **Multi-version Compatibility**                    | Supports Cordova 10 (compatible with legacy projects), Cordova 12 (recommended for production), and Cordova 13 (latest release) |
| **CI/CD Integration**                              | Easily integrates with CI tools such as GitHub Actions and Jenkins to achieve automated deployment                              |
| **Multi-language support**                         | Provides bilingual Chinese and English interfaces to meet internationalization needs                                            |

## Documentation and Resources

- [GitHub repository](https://github.com/gonggbb/cordovabuilder)
- [Official documentation](https://gonggbb.github.io/cordovabuilder/)
- [GitHub Image](https://github.com/gonggbb/docker-cordovabuilder/pkgs/container/docker-cordovabuilder)
- [Docker Hub Image](https://hub.docker.com/r/gamesg/cordovabuilder)

## Target Users

- Mobile application developer
- DevOps Engineer
- CI/CD build manager
- Enterprise-level hybrid application team

## Appendix: Version Comparison Table

![cordova/version](/cordova/version.png)

<!-- ## Appendix: Version Comparison Table -->

<!--
| Version | Cordova | Java | Gradle | Node.js | Recommended Usage |
| -- | - | - |  | - |  |
| v3.0.0-rc.1 | 13      | 17.0.10 | 8.7    | 20.19.5 | New project development |
| v2.0.0-rc.4 | 12      | 11/17   | 7.6    | 18.20.8 | Production environment |
| v1.0.0-rc.5 | 10      | 1.8     | 6.5    | 10.15.3 | Legacy project maintenance | -->

<!-- <table>
  <thead>
    <tr>
      <th>Version</th>
      <th>Core Components</th>
      <th>Applicable Scenario</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>v3.0.0-rc.1</strong><br>Cordova 13<br>📅 2025.11.25 (Latest Release)</td>
      <td>
        • Java 17.0.10<br>
        • Gradle 8.7<br>
        • Node.js 20.19.5<br>
        • Build Tools ^34.0.0
      </td>
      <td style="color:green;">✅ <strong>New project development</strong></td>
    </tr>
    <tr>
      <td><strong>v2.0.0-rc.4</strong><br>Cordova 12<br>📅 2023.5.22</td>
      <td>
        • Java 11/17<br>
        • Gradle 7.6<br>
        • Node.js 18.20.8<br>
        • Build Tools ^33.0.2
      </td>
      <td style="color:green;">✅ <strong>Recommended for Production Environment</strong></td>
    </tr>
    <tr>
      <td><strong>v1.0.0-rc.5</strong><br>Cordova 10<br>📅 2021.7.20</td>
      <td>
        • Java 1.8<br>
        • Gradle 6.5<br>
        • Node.js 10.15.3<br>
        • SDK 30
      </td>
      <td style="color:orange;">⚠️ <strong>Legacy project maintenance</strong></td>
    </tr>
  </tbody>
</table> -->

## Contact Us

If you have any questions or suggestions, please submit an issue to the [GitHub repository](https://github.com/gonggbb/cordovabuilder/issues) or contact the maintainer at [github.com/gonggbb](https://github.com/gonggbb)

✨ **Simplify Cordova building and enhance development efficiency!**
