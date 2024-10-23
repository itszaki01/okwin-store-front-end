FROM node:20.17.0 as base


FROM base as production
WORKDIR /app
COPY  package.json /app/
RUN npm install --force
COPY . .
RUN npm run build
EXPOSE 80
CMD [ "npm","run","start"]
