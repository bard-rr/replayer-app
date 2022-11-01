## Bard Replayer Application

This is the repository for Bard's replayer application. You can find our code for the React frontend in the `ui` directory and the code for the Express API in the `api` directory.

### Development workflow

We can start both pieces of the application separatly with the `npm run dev` command in the `api` directory and the `npm run start` command in the `ui` directory. You can access the ui at port `3000` and the server at port `3003`.

### Production workflow

The `npm run build` command in the `ui` directory will create a production build for the ui in `/api/build`. The `npm run start` command in the `api` directory will serve the content in the `/api/build` directory from the root of port `3003`. This is the workflow that creating a Docker image will use.

### Docker Notes

To build a docker image, run `docker build -t replayer .` in the root dir.

To create a container from the image, run `docker run -p 3003:3003 -d --name replayer replayer`. You'll be able to access the app at port 3003 of localhost.

To push the local image to the repo, use the docker desktop app
