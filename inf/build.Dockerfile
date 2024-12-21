FROM node:22-alpine as build
WORKDIR /build
COPY . /build
COPY inf/prod.env /build/.env
RUN npm i
RUN npm run build

FROM nginx:latest
COPY --from=build /build/dist /usr/share/nginx/html