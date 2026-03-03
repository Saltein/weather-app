# Weather App (React Native)
Мобильное приложение погоды, разработанное на React Native с использованием Redux Toolkit и RTK Query.
Приложение позволяет выбирать город и просматривать текущую погоду и прогноз на несколько дней.

## Возможности
 - Выбор города
 - Отображение текущей температуры
 - Описание погодных условий
 - Прогноз по дням
 - Быстрая загрузка данных через RTK Query
 - Глобальное состояние через Redux Toolkit
 - Архитектура Feature-Sliced Design (FSD)

## Технологии
 - React Native
 - TypeScript
 - Redux Toolkit
 - RTK Query
 - Expo
 - React Navigation
 - FlatList
 - Open-Meteo API

### Приложение использует:
##### Open-Meteo API https://open-meteo.com/
##### Для получения:
 - текущей погоды
 - почасового прогноза
 - прогноза по дням

### Управление состоянием
 - Хранение выбранного города — в Redux slice
 - Запросы к API — через RTK Query
 - Кэширование данных
 - Автоматический refetch при изменении города

# Планы на развитие
  - Добавить геолокацию

# Скриншоты
<img height="598" alt="Аккаунты" src="https://github.com/user-attachments/assets/0d1f2e60-4156-471e-8b71-a55d5e399a6b" />
<img height="598" alt="Аккаунты" src="https://github.com/user-attachments/assets/3adf17a4-16ee-4ae9-9e3d-078f66b88aa4" />
