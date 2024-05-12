FROM rabbitmq:latest

EXPOSE 5672 15672

ENV RABBITMQ_DEFAULT_USER=guest
ENV RABBITMQ_DEFAULT_PASS=guest

COPY rabbitmq.conf /etc/rabbitmq/

RUN rabbitmq-plugins enable rabbitmq_management

CMD ["rabbitmq-server"]
