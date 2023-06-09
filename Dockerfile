# stage 1 - get dependencies
FROM node:14-alpine as deps
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json ./yarn.lock ./lerna.json ./

COPY ./packages/app/package.json /app/packages/app/
COPY ./packages/authentication/package.json /app/packages/authentication/
COPY ./packages/api/package.json /app/packages/api/
COPY ./packages/localization/package.json /app/packages/localization/
COPY ./packages/user-interface/package.json /app/packages/user-interface/

RUN yarn global add lerna && yarn run bootstrap

# stage 2 - run build
FROM deps as build
WORKDIR /app
COPY . /app
RUN yarn run build

# stage 3 - run tests
FROM build as test
WORKDIR /app
RUN \
    yarn run prettier && \
    yarn run lint && \
    yarn run test

# stage 4 - build the final image and copy the react build files
FROM nginxinc/nginx-unprivileged:1.21-alpine as release
COPY --chown=1000:1000 --from=build /app/packages/app/build /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d

RUN \
    # # support running as arbitrary user which belongs to the root group
    # chmod g+rwx /var/cache/nginx /var/run /var/log/nginx && \
    # comment user directive as master process is run as user
    sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf && \
    # users are not allowed to listen on priviliged ports
    sed -i.bak 's/listen\(.*\)80;/listen 8080;/' /etc/nginx/conf.d/default.conf

USER 1000

CMD ["/bin/sh", "-c", "envsubst < /usr/share/nginx/html/config.template.js > /usr/share/nginx/html/config.js && exec nginx -g 'daemon off;'"]
# CMD ["nginx", "-g", "daemon off;"]

EXPOSE 8080