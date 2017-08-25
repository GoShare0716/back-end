echo "connect to ${RDS_DB_NAME}..."
psql -h ${RDS_HOSTNAME} -U ${RDS_USERNAME} ${RDS_DB_NAME}
