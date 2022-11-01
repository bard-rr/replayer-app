FROM node:alpine as build

WORKDIR /

# Copy assets from this directory onto the image's working DIR
COPY . .

#install dependancies onto the image
RUN npm install --production

#create a PRD build for the app.
RUN npm run build 

#run the PRD build of the app with nginx.
FROM nginx:stable-alpine as production
COPY --from=build /build usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
