echo "create database: ${RDS_DB_NAME} on ${RDS_HOSTNAME} with user: ${RDS_USERNAME}..."
createdb -h ${RDS_HOSTNAME} -p 5432 -U ${RDS_USERNAME} ${RDS_DB_NAME}
