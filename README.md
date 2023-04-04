# Government Fee Schedule API
## Purpose
I wrote this app in conjunction with [https://github.com/Jriles/fee_schedule_server](https://github.com/Jriles/fee_schedule_server) as a means of persisting and maintaining government costs associated with different corporate services in a single source of truth. An example would be "how much does it cost to form an LLC in Alabama?". At the time I worked at a corporate services company and I thought I saw a potential pain point with regard to that problem. Corporate services companies need to maintain internal databases of government cost data related to the services they offer in order to automate their order/quote flows. By centralizing this information and maintaining it, the idea was that corporate service companies could avoid the process, tech debt, and cost of persisting and maintaining the data themselves.

This repository in particular is an interface for staff to maintain that government data. This was supposed to be an internal tool (for me not for the company I was working for at the time).

## Architecture

### Tech Stack
* React
* Typescript
* Bootstrap

The project is headless, meaning that the frontend (this repo) is completely decoupled from the backend. So while you can run this repository locally on its own, you should really run it in conjunction with the repo listed above if you want to CRUD anything. Steps for getting that started are listed there, but I'll add them here as well. 

I chose React/Typescript because I hate learning about syntax errors in the console. Typescript can feel limiting at first, but I grew to love its lack of ambiguity. I like React because of its modular nature and its ease of use if one cares about being DRY (as I did, you be the judge of how well I did in that regard). I also enjoyed using React because of the strength of the community; an example would be the excellent react-router library. I chose bootstrap because I was already comfortable with it and I love the power of being able to throw stuff together that is visually acceptable.

## Run Frontend (This Repo) Locally

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Run Backend (Repo Listed Above) Locally
