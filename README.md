# intellij-mac-frequent-keymap

本仓库是一个经过精简的Intellij快捷键子集，并提供在线的cheatsheet快速备查表：[intellij.linesh.tw](http://intellij.linesh.tw)。

Intellij的快捷键多而繁杂，处女座的我也由此阅读了大量的文档和资料，从[官方推荐的keymap](https://resources.jetbrains.com/assets/products/intellij-idea/IntelliJIDEA_ReferenceCard_mac.pdf)到市面能看到的大多数资料和总结。这个cheatsheet，是我结合平时的工作和个人项目经验，整理总结出的一套最常用、最精简的快捷键子集。适合以下场景/人群使用：

* 想要快速上手Intellij快捷键的同学。毕竟大而无当，等于无用。优先学习最高效最常用的快捷键，节省时间，提高效率
* **备查**。这个是最主要的目的，存个书签或者记个网址，需要的时候只要有网络，随时可查

![](http://7xqu8w.com1.z0.glb.clouddn.com/intellij-keymap-homepage.png)

## 声明

* 本子集的选择标准是主观的。可以通过其他工具实现的，不录入，比如VCS；目前，我使用Intellij IDEA写Java代码最多
* 本cheatsheet全部以Intellij Mac OSX 10.5+这套keymap为基准，除了一个快捷键以外，全部使用该模板默认快捷键，以保持最大限度通用性、减少维护成本

## 常用快捷键

本章主要分七个部分展开总结：生产力大杀器、编辑、语言要素生成、导航、重构、搜索、运行时。版本控制的部分未录入，原因是我倾向于使用命令行提交，而非IDE内置VCS支持。见仁见智。最后一栏是该操作在IDEA中的操作名称，可以在keymap中检索对应的action/shortcut找到。

关于快捷本身的理念和思维模式，可以参考我在 [Mac优雅的工具集——Intellij快捷键](http://mac.linesh.tw/publish/development-tools/intellij-shortcuts.html) 一节中展开的讨论。总结起来就两句话：**更高的抽象层次** 和 **声明式使用**。同时[这本书](http://mac.linesh.tw)旨在探讨如何更高效地使用Mac进行编程工作，有兴趣的朋友可前往阅读反馈。


### 生产力（Productivity）

| Operation | Mac OSX 10.5+ | Comments | Description |
| :---      | :---:        | :---:          | :---     |
| 模板补全 | ⌘+J | 插入一个符合某结构特征的模板，详解见下 | Insert live template |
| 命令查询 | ⇧+⌘+S | 以名称的形式查询某个操作或快捷键，是声明式编程思想的完美体现 | Find actions |
| 意图预测与智能帮助 | ⌥+Enter | 简单重构、移除死代码、结构调整、自动导包等| Show intention actions |

#### 模板补全（Live Template）

敲完以下模板补全的keyword之后可以直接通过tab或回车触发模板补全，$1/$2...是需要你填充的模板变量。

| Operation | Mac OSX 10.5+ Keyword | Expands to | Comments |
| :---: | :---: | :---: | :---: |
| 判空 | `ifn` | `if ($1 == null) {}` | 后向声明也有同样功能，读者可拣顺手的用 |
| 判非空 | `inn` | `if ($1 != null) {}` | |
| 创建索引循环 | `fori` | `for (int $1 = 0; $1 < $2; $1++) {}` | |
| 添加TODO | `todo` | `// TODO: $1` | 非常声明式的用法 |
| 添加Fixme | `fixme` | `// FIXME: 7/19/16 $1` | 同上 |
| 类型关系判定 | `inst` | `if ($1 instanceof $2) {} ` | |
| System.out | `sout` | `System.out.println($1); `| 必须入手的黑技能，调试打log的时候非常有用 |

#### 后向声明（Postfix Completion）

[后向声明](https://blog.jetbrains.com/idea/2014/03/postfix-completion)是JetBrains系IDE的一项新功能，旨在减少光标经常性的前后移动，提高开发效率，形成这样的编程思维：先使用元素，再考虑变量声明或结构补全。它的主要功能是根据当前元素的属性，提供可能的行为建议，例如使用if-else结构包围、判（非）空、格式化、进行类型转换等。因此，后向声明所能提供的选择视元素（主要是变量）的不同而不同。

所有元素都拥有的一些后向声明选择，仅选择我认为常用的：

| Operation | Postfix Completion Keyword | Expands To | Comments | 
| :---: | :---: | :---: | :---: |
| 变量声明 | element.`var` | `Type $name = element;` | 必备技能，声明式使用的典范 |
| 转换为类字段 | element.`field` | `private $Type element; ` | 刚发现的 |
| 将当前变量打印到输出流 | element.`sout` | `System.out.println(element);` ||
| 返回当前值 | element.`return` | `return element;` | |
| 类型转换 | element.`cast` | `(($Type) element)` | |

然后，对于特定的元素类型，有的后向声明还有非常实用的选项，比如字符串的判空、布尔值的if-else、列表的循环等等：

| ElementType | Operation | Postfix Completion Keyword | Expands To | Comments | 
| :--- | :---: | :---: | :---: | :---: |
| 字符串 | 判空 | string.`null`| `if (string == null) {}` | |
| | 判非空 | string.`notnull` | `if (string != null) {}` | |
| 整数 | 分支 | int.`switch` | `switch (int) {}` | |
| 布尔值 | 如果为真 | boolean.`if` | `if (boolean) {}` | |
| | 如果为假 | boolean.`else` | `if (!boolean) {}` | |
| | 反义 | boolean.`not` | `!boolean` | |
| 列表 | 循环元素 | lists.`for` | `for (Type element : lists) {}` | 非常常用 |
| | 带索引循环 | lists.`fori` | `for (int i = 0; i < lists.size(); i++) {}` | |


### 编辑（Editing）

| Operation | Mac OSX 10.5+ | Comments | Description |
| :---:      | :---:        | :---:          | :---     |
| 基本代码补全 | ^+Space | 一般都用这个补全，变量命名时及方法补全时常用 | Code/Completion/Basic |
| 智能补全 | ^+⇧+Space | 是否有必要记得两个快捷键？可以统一设成一个 | Code/Completion/SmartType |
| 语句补全 | ⇧+⌘+Enter | 直接补全当前语句，在括号特别多时非常有用 | Complete Current Statement |
|||||
| 从上方开始一行 | ⌥+⌘+Enter | | Start New Line Before Current |
| 从下方开始一行 | ⇧+Enter | | Start New Line |
| 上移/下移一行 | ⇧+⌥+↑/↓ | 上下移一行。一般用于以单行出现的元素，否则会破坏元素间的关系 | Move Line Up/Down |
| 上移/下移一个块 | ⇧+⌘+↑/↓ | | Move Statement Up/Down |
| 选中一个代码块 | ⌥+↑ | 常用 | Extend Selection |
| 取消代码块选中 | ⌥+↓ | | Shrink Selection |
|||||
| 重复当前行 | ⌘+D | | Duplicate Current Line or Block |
| 复制并且不删除当前行 | ⌘+C | | Edit/Copy |
| 剪切当前行并复制到粘贴板 | ⌘+X | | Edit/Cut |
| 关闭当前标签 | ⌘+W | 跟通常编辑器快捷键一致 | Edit Tabs/Close |
| 注释当前行 | ⌘+/ | 随手一注释 | Comment with Line Comment |
|||||
| 优化import | ^+⌥+O | 没啥用 | Optimize Imports |
| 格式化代码 | ⌥+⌘+L | 没啥用 | Reformat Code |

### 语言要素生成（Language Elements/Features）

| Operation | Mac OSX 10.5+ | Comments | Description |
| :---      | :---:        | :---:          | :---     |
| 测试、方法生成 | ^+Enter/ ⌘+N | 非常常用于创建测试方法、构造方法、覆写接口方法、覆写基类方法 | Code/Generate |
| 创建类、文件、目录 | ⌘+N | 常用 | Code/Generate |
| 创建override方法 | ^+O | 有用 | Override Methods |
| 创建接口方法实现 | ^+I | 有用 | Implement Methods |

### 导航（Navigation）

| Operation | Mac OSX 10.5+ | Comments | Description |
| :---:      | :---:        | :---:          | :---     |
| 转到方法/字段的声明 | ⌘+B | 调试跟代码都很常用 | Navigation/Declaration |
| 转到方法/字段的实现点 | ⌥+⌘+B | 同上，常用 | Navigation/Implementation(s) |
| 转到方法/字段类型的类定义处 | ⇧+⌘+B/ ⇧+^+B | 常由下两个快捷键取代 | Navigation/Type Declaration |
| 当前类与单元测试间跳转 | ⇧+⌘+T | 非常方便 | Navigate/Test |
|||||
| 跳转到当前类的基类 | ⌘+U | 配套食用，效果更佳 | Super Method |
| 类继承体系 | ^+H | | Type Hierarchy |
| 方法继承层次 | ⇧+⌘+H | | Method Hierarchy |
| 当前方法调用链 | ^+⌥+H || Call Hierarchy |
| 本类及所有基类方法列表 | ⌘+F12 || File Structure |
|||||
| 类/方法/字段定义的快速预览 | ⌥+Space/ ⌘+Y | 小览实现，一般可以看到方法/字段参数、返回值、前几行实现，快速的信息足够了 | Quick Definition |
| 方法文档快速预览 | ^+J | 看文档，我不常用 | Quick Documentation |
| 方法参数快速预览 | ⌘+P | 常用 | Parameter Info |
|||||
| 前一个标签 | ⇧+⌘+[ | 导航常用，不过是否能以其他方式取代，比如声明式使用类查找⌘+O等。仍在探索 | Select Previous Tab |
| 后一个标签 | ⇧+⌘+] | | Select Next Tab |
| 往上一级 | ⌥+⌘+←/ ⌘+[ | 调代码，跟方法体系时，非常有用，下同 | Navigate/Back |
| 往下一级 | ⌥+⌘+→/ ⌘+] | | Navigate/Forward |
|||||
| 转到下一个错误或警告 | F2 | 代码见红时，常用此快捷键快速定位，并配合万能快捷键⌥+Enter快速修复 | Next Highlighted Error |
| 提示错误信息 | ⌘+F1 | 不常用 | Error Description |
| 意图预测与智能帮助 | ⌥+Enter | 简单重构、移除死代码、结构调整、自动导包等| Show intention actions |
|||||
| project视图 | ⌘+1 | 有时导航项目结构时常用，不知是否有替代方案 | Other/Project |
| search/find视图 | ⌘+3 | 除了这几个，其他视图都不常用 | Other/Find |
| run视图 | ⌘+4 | 有时开关测试视图 | Other/Run |
| debug视图 | ⌘+5 | | Other/Debug |
| VCS视图 | ⌘+9 | | Other/VCS |
| terminal视图 | * ⌘+0 | 自己改过，一是和各种视图快捷键保持一致，另外是原生的⌘+F12实在有点难按 | Other/Terminal |
| 隐藏所有工具视图 | ⇧+⌘+F12 | 同时开了工程和终端视图时一键回编程页面 | Hide All Tool Windows |
|||||
| 跳转到第...行 | ⌘+L | 属于细节型的活，能少用就多思考替代方案 | Navigate/Line... |


### 重构（Refactor）

| Operation | Mac OSX 10.5+ | Comments | Description |
| :---:      | :---:        | :---:          | :---     |
| 复制类/目录等 | F5 | | Refactor/Copy |
| 移动类/目录等 | F6 | | Refactor/Move |
| 元素(类/方法/变量/…)重命名 | ⇧+F6 | 最常用的重构快捷键之一了吧 | Refactor/Rename |
| 类/方法签名修改 | ⌘+F6 | | Refactor/Change Signature |
|||||
| 字段(类级别)抽取 | ⌥+⌘+F | | Extract/Field |
| 常量(类级别)抽取 | ⌥+⌘+C | | Extract/Constant |
| 变量(方法级别)抽取 | ⌥+⌘+V | | Extract/Variable |
| 参数(方法级别)抽取 | ⌥+⌘+P | | Extract/Parameter |
| 方法抽取 | ⌥+⌘+M | 最常用的重构快捷键之一 | Extract/Method |
| 方法内联 | ⌥+⌘+N | | Refactor/Inline |


### 搜索（Searching)

| Operation | Mac OSX 10.5+ | Comments | Description |
| :---:      | :---:        | :---:          | :---     |
| 搜索 | ⌘+F | 通常快捷键 | Find/Find |
| 替换 | ⌘+R | 正则发挥作用的地方 | Find/Replace |
| 查找引用点 | ⌥+F7 | 重构或调试的时候经常用到，使用频率高 | Find/Find usages |
|||||
| 查找类 | ⌘+O | 声明式编程，使用频率很高的快捷键 | Navigate/Class |
| 查找文件 | ⇧+⌘+O | 同上，使用频率很高 | Navigate/File |
| 查找symbol | ⌥+⌘+O | 基本不用，不知道与上两者有什么区别 | Navigate/Symbol |
| 全项目文本搜索 | ⇧+⌘+F | 搜索引用点和文本出现、改bug时非常有用 | Find/Find in path |
|||||
| 查找下一个 | ⌘+G | | Find/Find Next |
| 查找上一个 | ⇧+⌘+G | | Find/Find Previous |

### 运行时（Runtime）

| Operation | Mac OSX 10.5+ | Comments | Description |
| :---:      | :---:        | :---:          | :---     |
| 编译 | ⌘+F9 | 调bug时可能是忘了编译最新代码 | Make Project |
| 运行(最近一个测试) | ^+R | 非常有用，有时可能节省在测试代码和源文件之间的切换 | Run/Run |
| 调试 | ^+D | | Run/Debug |
|||||
| 打断点/取消断点 | ⌘+F8 | | Toggle Breakpoints |
| 查看所有断点 | ⇧+⌘+F8 | | View Breakpoints |
| 跳入 | F7 | | Run/Step Into |
| 跳出 | ⇧+F8 | | Run/Step Out |
| 智能跳入(当前行多个调用时) | ⇧+F7 |
| 跳过(下一步) | F8 | | Run/Step Over |
| 求表达式值 | ⌥+F8 | | Evaluate Expression |
| 停止调试 | ⌘+F2 | | Run/Stop |

## TODOLIST

* [x] 新建一个子域名：intellij.linesh.tw
* [ ] 将本页所列出的快捷键和思想以UI友好的方式展示、备查
* [ ] 添加模板补全和后向声明部分的快捷键
* [ ] Responsiveness
* [ ] 打印Print支持
* [ ] 寻找或自己造一个轮子，能将日常intellij操作的快捷键记录下来，分析频率，同样展示在主页
* [ ] 自动化以上两步：本文更新到展示主页的同步、以及每天频率的自动提交与更新
