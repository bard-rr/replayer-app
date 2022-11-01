FROM node:alpine as build

WORKDIR /

# Copy everything from this directory onto the image's working DIR
COPY . .

# Change dir to the ui component
WORKDIR /ui

#install ui dependancies onto the image
RUN npm install --production

#create a PRD build for the ui in the api dir.
RUN npm run build 

# Switch to the api directory
WORKDIR /api

#install api dependancies onto the image
RUN npm install --production 

# is this all we need?
CMD ["npm", "run", "start"]
