# Afrianska

## Команды

- `npm install` — Установка зависимостей
- `npm run dev` — Запуск сервера разработки
- `npm run build` — Сборка проекта для продакшена
- `npm run preview` — Локальный предпросмотр сборки
- `npm run type-check` — Проверка типов TS
- `npm run lint:ts` — Проверка стиля кода TS
- `npm run fix:ts` — Исправление стиля кода TS
- `npm run lint:scss` — Проверка стиля кода SCSS
- `npm run fix:scss` — Исправление стиля кода SCSS
- `npm run format` — Форматирование

## Структура проекта

```
afrianska/
├── public/
│   ├── favicon.svg
│   └── favicon.png
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   │   ├── Gilroy-Light.woff2
│   │   │   ├── Gilroy-Regular.woff2
│   │   │   └── ...
│   │   └── images/
│   │       ├── hero__image.webp
│   │       ├── card__image-1.webp
│   │       └── ...
│   ├── styles/
│   │   ├── base/
│   │   │   ├── _fonts.scss
│   │   │   ├── _globals.scss
│   │   │   ├── _media.scss
│   │   │   ├── _normalize.scss
│   │   │   └── _variables.scss
│   │   ├── blocks/
│   │   │   ├── _advantages.scss
│   │   │   ├── _burger-button.scss
│   │   │   └── ...
│   │   └── main.scss
│   └── scripts/
│       ├── modules/
│       │   ├── Modal.ts               # Управление модальным окном
│       │   ├── FormValidator.ts       # Валидации формы
│       │   ├── FormSend.ts            # Сбор и отправка данных
│       │   ├── Popup.ts               # Управление попапом с сообщением об отправке данных
│       │   └── ScrollToTopButton.ts   # Управление видимостью кнопки скролла наверх
│       └── main.ts
├── .gitignore
├── .prettierrc.json
├── .stylelintrc.json
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```
