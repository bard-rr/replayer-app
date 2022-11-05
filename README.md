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

This is Bard's replayer application. It includes a Nodejs API and a React frontend. The replayer application has connections to both the Clickhouse and Postgres databases. The connection to the Clickhouse database is to request session data and the Postgres database is to create and request funnel data. 

The Frontend is divided into two major sections. The first is a table of all the sessions in the Clickhouse database. The sessions can be sorted and filtered by data based on date, length, and errors. You can also view a replay of each of the sessions.

The second section is the creation and use of conversion funnels. This section is all about defining a conversion funnel on a website and viewing the sessions that completed or failed to complete each step in the funnel. This will allow you to learn why users are not making it to each step of the funnel and converting. 

## Setup

Clone the open source reposatory from [here](https://github.com/bard-rr/replayer-app). Run the application using:

`npm run start`

## Website

You can read more about our project [here](oursupercoolwebsite.com).
