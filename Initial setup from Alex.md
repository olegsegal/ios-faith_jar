English

Phase 1  Cursor and terminal basics
1  Install Homebrew (macOS) if missing

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

2  Install Cursor, then open a project folder and open the integrated terminal
3  Confirm you can run commands in Cursor terminal

Phase 2  Install Claude Code (recommended via Homebrew)
1  Install Claude Code

brew install --cask claude-code

Alternative installer (macOS, Linux, WSL)

curl -fsSL https://claude.ai/install.sh | bash

2  Start Claude Code and authenticate

claude

3  Quick sanity checks

claude --version

Claude Code install methods are documented here.  

Phase 3  Subscribe to Claude Max and connect it to Claude Code
1  In Claude: Settings, Billing, Upgrade to Max
2  Pick tier (5x or 20x), pay, confirm
3  When Claude Code prompts you, log in with the same Claude account so the subscription applies
Official Max plan and signup steps.  

Phase 4  Install BMad Method v6 (v6 alpha) in the repo
Prereq: Node.js 20+ is required for the installer.  

Option A  Recommended installer (fastest)
1  Go to the project folder

cd /path/to/your/project

2  Run the v6 installer

npx bmad-method@alpha install

3  In the installer UI
Select Claude Code and Cursor as your AI tools
Select only the module(s) you need to start, usually BMM
BMad install guide.  

Option B  Direct from GitHub (if you explicitly want that)
1  Clone

git clone https://github.com/bmad-code-org/BMAD-METHOD.git
cd BMAD-METHOD

2  Use the project docs as the source of truth, then run their CLI entrypoint if needed
Repo reference.  

Phase 5  MCP servers in Claude Code (start with Context7 only)
Claude Code MCP overview and scopes.  

1  Add Context7 (best first server)

claude mcp add --transport stdio context7 npx -- -y @upstash/context7-mcp

Context7 setup command.  
API: ctx7sk-9a03012e-c54b-4e94-9c9c-8c95983e4d79

2  Verify it is registered

claude mcp list

3  Optional Browser MCP (pick one)

Option A  Playwright MCP (simple and common)

claude mcp add playwright npx @playwright/mcp@latest

Playwright MCP with Claude Code example.  

Option B  Browser MCP with a browser extension (if he prefers controlling his real browser)
Follow their docs to install the server plus the extension.  

Tip: With MCP servers, only install what you trust. The MCP ecosystem has had malicious packages before, so stick to well known repos and verify names carefully.  

Русский

Фаза 1  Cursor и терминал
1  Установи Homebrew (macOS), если его нет

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

2  Установи Cursor, открой проект и открой встроенный терминал
3  Проверь, что команды выполняются в терминале Cursor

Фаза 2  Установка Claude Code (лучше через Homebrew)
1  Установи Claude Code

brew install --cask claude-code

Альтернатива (macOS, Linux, WSL)

curl -fsSL https://claude.ai/install.sh | bash

2  Запусти Claude Code и пройди авторизацию

claude

3  Быстрая проверка

claude --version

Официальные способы установки Claude Code.  

Фаза 3  Подписка Claude Max и привязка к Claude Code
1  В Claude открой Settings, затем Billing, затем Upgrade to Max
2  Выбери уровень (5x или 20x), оплати и подтверди
3  Когда Claude Code попросит войти, используй тот же аккаунт Claude, чтобы подписка применялась
Страница Max и официальная инструкция по подписке.  

Фаза 4  Установка BMad Method v6 (v6 alpha) в проект
Требование: Node.js 20+ нужен для установщика.  

Вариант A  Через установщик (самый простой)
1  Перейди в папку проекта

cd /path/to/your/project

2  Запусти установщик v6

npx bmad-method@alpha install

3  В установщике
Выбери Claude Code и Cursor
Для старта поставь только нужный модуль, обычно BMM
Официальный гайд по установке BMad.  

Вариант B  Прямо из GitHub (если принципиально нужно именно так)
1  Клонируй репозиторий

git clone https://github.com/bmad-code-org/BMAD-METHOD.git
cd BMAD-METHOD

2  Дальше следуй документации репозитория
Репозиторий BMad.  

Фаза 5  MCP сервера в Claude Code (сначала только Context7)
Обзор MCP в Claude Code и режимы установки.  

1  Добавь Context7
claude mcp add --transport stdio context7 npx -- -y @upstash/context7-mcp

Команда Context7.  

2  Проверь список MCP серверов

claude mcp list

3  Опционально Browser MCP

Вариант A  Playwright MCP

claude mcp add playwright npx @playwright/mcp@latest

Пример Playwright MCP для Claude Code.  

Вариант B  Browser MCP через расширение браузера
Установи MCP сервер и расширение по их документации.  

Важно: MCP серверы ставь только из доверенных источников, были случаи вредоносных пакетов.