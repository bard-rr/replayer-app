<img src="https://github.com/bard-rr/.github/blob/main/profile/logo2.png?raw=true" width="300">
<br/>

[![Version](https://img.shields.io/npm/v/bardrr)](https://www.npmjs.com/package/bardrr)
[![Downloads/week](https://img.shields.io/npm/dt/bardrr)](https://npmjs.org/package/bardrr)
[![License](https://img.shields.io/npm/l/monsoon-load-testing.svg)](https://github.com/minhphanhvu/bardrr/blob/master/package.json)

# Replayer Application

<p align="center">
  <img src="https://github.com/bard-rr/.github/blob/main/profile/sessionPlayer.jpg?raw=true" width="600">
</p>

## Description

This is Bard's replayer application. It includes a Node.js API and a React frontend. The replayer application has connections to both the Clickhouse and Postgres databases. The connection to the Clickhouse database is to request session data and the Postgres database is to create and request funnel data.

The Frontend is divided into two major sections. The first is a table of all the sessions in the Clickhouse database. The sessions can be sorted and filtered by data based on date, length, and errors. You can also view a replay of each of the sessions.

The second section is about the creation and use of conversion funnels. This section is all about defining a conversion funnel for a website and viewing the sessions that completed or failed each step in the funnel. This will allow you to learn why users are not making it to each step of the funnel and converting.

## Required Software

Clickhouse: [Download Here](https://clickhouse.com/docs/en/install/) Will run on port 8123. The schema can be found here [Schema](https://github.com/bard-rr/deploy)

Postgres: [Download Here](https://www.postgresql.org/download/) Will run on port 5432. The schema can be found here [Schema](https://github.com/bard-rr/deploy)

## Setup

Clone the open source repository from [here](https://github.com/bard-rr/replayer-app). After installing the required software above and the dependancies in the `api` directory, you can run the application from the `api` directory with the following command:

`npm run start`

The api will run on port `3003` and will serve our React ui using static files from the `/api/build` directory. The source code for our React application lives in the `ui` directory of this repo.

## Website

You can read more about our project [here](https://bard-rr.com/).
