# Тестовое задание для "Neo Stack Technology"

## Развертывание приложения

### Через Docker-образ

1. Установить образ:

```console
$ docker pull cooldude4642/test-task-1
```

2. Запустить контейнер:

```console
$ docker run -d -p 3000:3000 cooldude4642/test-task-1
```

3. Перейти на [http://localhost:3000](http://localhost:3000).

### Через Github-репозиторий

1. Клонировать репозиторий:

```console
$ git clone https://github.com/cooldude4642/test-task-1.git
```

2. Перейти в дирректорию проекта и установить зависимости:

```console
$ cd test-task-1
$ npm i
```

3. Собрать билд:

```console
$ npm run build
```

4. Запустить приложение:

```console
$ npm run start
```

5. Перейти на [http://localhost:3000](http://localhost:3000).
