FROM node:alpine

RUN mkdir -p /var/www
WORKDIR /var/www
COPY . .

RUN npm install \
 && npm run build

EXPOSE 3000

CMD ["npm", "start"]
