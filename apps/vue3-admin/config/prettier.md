C:\worksapce\pbnworkspace\front-workspace\monorepo-work\apps\vue3-admin>npx prettier
Usage: prettier [options] [file/dir/glob ...]
﻿
By default, output is written to stdout.
Stdin is read if it is piped to Prettier and no files are given.
﻿
Output options:
﻿
  -c, --check              Check if the given files are formatted, print a human-friendly summary
                           message and paths to unformatted files (see also --list-different).
  -l, --list-different     Print the names of files that are different from Prettier's formatting (see also --check).
  -w, --write              Edit files in-place. (Beware!)
﻿
Format options:
﻿
  --arrow-parens <always|avoid>
                           Include parentheses around a sole arrow function parameter.
                           Defaults to always.
  --bracket-same-line      Put > of opening tags on the last line instead of on a new line.
                           Defaults to false.
  --no-bracket-spacing     Do not print spaces between brackets.
  --embedded-language-formatting <auto|off>
                           Control how Prettier formats quoted code embedded in the file.
                           Defaults to auto.
  --end-of-line <lf|crlf|cr|auto>
                           Which end of line characters to apply.
                           Defaults to lf.
  --experimental-operator-position <start|end>
                           Where to print operators when binary expressions wrap lines.
                           Defaults to end.
  --no-experimental-ternaries
                           Default behavior of ternaries; keep question marks on the same line as the consequent.
  --html-whitespace-sensitivity <css|strict|ignore>
                           How to handle whitespaces in HTML.
                           Defaults to css.
  --jsx-single-quote       Use single quotes in JSX.
                           Defaults to false.
  --object-wrap <preserve|collapse>
                           How to wrap object literals.
                           Defaults to preserve.
  --parser <flow|babel|babel-flow|babel-ts|typescript|acorn|espree|meriyah|css|less|scss|json|json5|jsonc|json-stringify|graphql|markdown|mdx|vue|yaml|glimmer|html|angular|lwc|mjml>
                           Which parser to use.
  --print-width <int>      The line length where Prettier will try wrap.
                           Defaults to 80.
  --prose-wrap <always|never|preserve>
                           How to wrap prose.
                           Defaults to preserve.
  --quote-props <as-needed|consistent|preserve>
                           Change when properties in objects are quoted.
                           Defaults to as-needed.
  --no-semi                Do not print semicolons, except at the beginning of lines which may need them.
  --single-attribute-per-line
                           Enforce single attribute per line in HTML, Vue and JSX.
                           Defaults to false.
  --single-quote           Use single quotes instead of double quotes.
                           Defaults to false.
  --tab-width <int>        Number of spaces per indentation level.
                           Defaults to 2.
  --trailing-comma <all|es5|none>
                           Print trailing commas wherever possible when multi-line.
                           Defaults to all.
  --use-tabs               Indent with tabs instead of spaces.
                           Defaults to false.
  --vue-indent-script-and-style
                           Indent script and style tags in Vue files.
                           Defaults to false.
﻿
Config options:
﻿
  --config <path>          Path to a Prettier configuration file (.prettierrc, package.json, prettier.config.js).
  --no-config              Do not look for a configuration file.
  --config-precedence <cli-override|file-override|prefer-file>
                           Define in which order config files and CLI options should be evaluated.
                           Defaults to cli-override.
  --no-editorconfig        Don't take .editorconfig into account when parsing configuration.
  --find-config-path <path>
                           Find and print the path to a configuration file for the given input file.
  --ignore-path <path>     Path to a file with patterns describing files to ignore.
                           Multiple values are accepted.
                           Defaults to [.gitignore, .prettierignore].
  --plugin <path>          Add a plugin. Multiple plugins can be passed as separate `--plugin`s.
                           Defaults to [].
  --with-node-modules      Process files inside 'node_modules' directory.
﻿
Editor options:
﻿
  --cursor-offset <int>    Print (to stderr) where a cursor at the given position would move to after formatting.
                           Defaults to -1.
  --range-end <int>        Format code ending at a given character offset (exclusive).
                           The range will extend forwards to the end of the selected statement.
                           Defaults to Infinity.
  --range-start <int>      Format code starting at a given character offset.
                           The range will extend backwards to the start of the first line containing the selected statement.
                           Defaults to 0.
﻿
Other options:
﻿
  --cache                  Only format changed files. Cannot use with --stdin-filepath.
                           Defaults to false.
  --cache-location <path>  Path to the cache file.
  --cache-strategy <metadata|content>
                           Strategy for the cache to use for detecting changed files.
  --check-ignore-pragma    Check whether the file's first docblock comment contains '@noprettier' or '@noformat' to determine if it should be formatted.
                           Defaults to false.
  --no-color               Do not colorize error messages.
  --no-error-on-unmatched-pattern
                           Prevent errors when pattern is unmatched.
  --file-info <path>       Extract the following info (as JSON) for a given file path. Reported fields:
                           * ignored (boolean) - true if file path is filtered by --ignore-path
                           * inferredParser (string | null) - name of parser inferred from file path
  -h, --help <flag>        Show CLI usage, or details about the given flag.
                           Example: --help write
  -u, --ignore-unknown     Ignore unknown files.
  --insert-pragma          Insert @format pragma into file's first docblock comment.
                           Defaults to false.
  --log-level <silent|error|warn|log|debug>
                           What level of logs to report.
                           Defaults to log.
  --require-pragma         Require either '@prettier' or '@format' to be present in the file's first docblock comment in order for it to be formatted.
                           Defaults to false.
  --stdin-filepath <path>  Path to the file to pretend that stdin comes from.
  --support-info           Print support information as JSON.
  -v, --version            Print Prettier version.


C:\worksapce\pbnworkspace\front-workspace\monorepo-work\apps\vue3-admin>使用npx命令运行prettier
用法：prettier [选项] [文件/目录/通配符 ...]
﻿
默认情况下，输出会写入标准输出（stdout）。
如果将 Stdin 通过管道传递给 Prettier 且未指定任何文件，则读取 Stdin。
﻿
输出选项：
﻿
  -c, --check 检查给定文件是否已格式化，并打印易于理解的摘要
                           未格式化文件的信息和路径（另见 --list-different）。
  -l, --list-different 列出与 Prettier 格式不同的文件名（另见 --check）。
  -w, --write 原地编辑文件。（请注意！）
﻿
格式选项：
﻿
  --arrow-parens <总是|避免>
                           在唯一的箭头函数参数前后加上括号。
                           默认为始终。
  --bracket-same-line 将开始标签的 > 放在最后一行，而不是另起一行。
                           默认为假。
  --no-bracket-spacing     不在括号之间打印空格。
  --嵌入式语言格式化 <自动|关闭>
                           控制 Prettier 如何格式化文件中嵌入的引用代码。
                           默认为自动。
  --行尾 <lf|crlf|cr|auto>
                           要应用哪一端的换行符。
                           默认为lf。
  --experimental-operator-position <start|end>
                           当二元表达式换行时，运算符应打印在何处。
                           默认为结束。
  --no-experimental-ternaries
                           三元运算符的默认行为；将问号与结果保持在同一行。
  --html-whitespace-sensitivity <css|strict|ignore>
                           如何处理HTML中的空白字符。
                           默认为css。
  --jsx-single-quote 在JSX中使用单引号。
                           默认为假。
  --object-wrap <preserve|collapse>
                           如何包装对象字面量。
                           默认保留。
  --parser <flow|babel|babel-flow|babel-ts|typescript|acorn|espree|meriyah|css|less|scss|json|json5|jsonc|json-stringify|graphql|markdown|mdx|vue|yaml|glimmer|html|angular|lwc|mjml>
                           使用哪个解析器。
  --print-width <int>      这是 Prettier 尝试换行的行长限制。
                           默认为80。
  --prose-wrap <always|never|preserve>
                           如何包装散文。
                           默认为保留。
  --quote-props <按需|一致|保留>
                           当对象中的属性被引用时，进行更改。
                           默认为按需设置。
  --no-semi 除了在可能需要分号的行首之外，不打印分号。
  --每行一个属性
                           在HTML、Vue和JSX中，每行只允许有一个属性。
                           默认为假。
  --single-quote          使用单引号而不是双引号。
                           默认为假。
  --tab-width <int> 每个缩进级别的空格数。
                           默认为2。
  --trailing-comma <all|es5|none>
                           在多行时，尽可能在每行末尾加上逗号。
                           默认为全部。
  --use-tabs 使用制表符而非空格进行缩进。
                           默认为假。
  --vue-indent-script-and-style
                           在Vue文件中缩进script和style标签。
                           默认为假。
﻿
配置选项：
﻿
  --config <path>          指向 Prettier 配置文件（.prettierrc、package.json、prettier.config.js）的路径。
  --no-config              不查找配置文件。
  --config-precedence <cli-override|file-override|prefer-file>
                           定义配置文件和命令行选项应按何种顺序进行评估。
                           默认为 cli-override。
  --no-editorconfig 在解析配置时，不考虑 .editorconfig 文件。
  --find-config-path <path>
                           为给定的输入文件找到并打印其配置文件的路径。
  --ignore-path <path> 指向一个文件的路径，该文件包含描述要忽略的文件的模式。
                           接受多个值。
                           默认为[.gitignore, .prettierignore]。
  --plugin <path>          添加插件。可以分别使用多个`--plugin`来指定多个插件。
                           默认为 []。
  --with-node-modules 用于处理“node_modules”目录中的文件。
﻿

编辑选项：
﻿
  --cursor-offset <int>    打印（到标准错误输出）在给定位置的光标在格式化后会移动到的位置。
                           默认为-1。
  --range-end <int> 格式化代码，结束于给定的字符偏移量（不包括该偏移量）。
                           范围将向前扩展到所选语句的末尾。
                           默认为无穷大。
  --range-start <int>      从给定字符偏移量开始格式化代码。
                           范围将向后扩展到包含所选语句的第一行的开头。
                           默认为0。
﻿
其他选项：
﻿
  --cache 仅格式化已更改的文件。不能与 --stdin-filename 一起使用。
                           默认为假。
  --cache-location <path> 缓存文件的路径。
  --cache-strategy <metadata|content>
                           缓存用于检测已更改文件的策略。
  --check-ignore-pragma 检查文件的第一个文档块注释中是否包含 '@noprettier' 或 '@noformat'，以确定是否应对其进行格式化。
                           默认为假。
  --no-color               不对错误信息进行彩色化处理。
  --no-error-on-unmatched-pattern
                           在模式不匹配时防止出错。
  --file-info <path>       为给定的文件路径提取以下信息（以JSON格式）。报告的字段：
                           * ignored (boolean) - 如果文件路径被 --ignore-path 过滤，则为 true
                           * inferredParser (string | null) - 从文件路径推断出的解析器名称
  -h, --help <flag> 显示命令行界面（CLI）用法，或关于给定标志的详细信息。
                           示例：--help write
  -u, --ignore-unknown 忽略未知文件。
  --insert-pragma          在文件的第一个文档块注释中插入 @format 编译指示。
                           默认为假。
  --log-level <silent|error|warn|log|debug>
                           要报告的日志级别。
                           默认为记录日志。
  --require-pragma 选项要求文件中的第一个文档块注释中必须包含 '@prettier' 或 '@format' 之一，才能进行格式化。
                           默认为假。
  --stdin-filepath <path> 指定一个文件路径，假装标准输入（stdin）来源于该文件。
  --support-info           以JSON格式打印支持信息。
  -v, --version 输出 Prettier 的版本信息。