FROM nginx:latest

## Remove default NGINX web files
RUN rm -rf /usr/share/nginx/html/

## Copy the dist files to NGINX web folder
COPY /dist/fashionista-ui /usr/share/nginx/html

## Set the permission for NGINX web folder
RUN chmod 777 -R /usr/share/nginx/html

## Overwrit the default NGINX config using the custom config file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the docker port
EXPOSE 80

# Initiate the NGINX
CMD ["nginx", "-g", "daemon off;"]
