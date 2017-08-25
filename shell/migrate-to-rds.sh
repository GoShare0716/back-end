DUMP_FILE='db.dump'

echo "migrate ${DUMP_FLIE} to ${RDS_DB_NAME}..."
psql -h ${RDS_HOSTNAME} -U ${RDS_USERNAME} ${RDS_DB_NAME} < ${DUMP_FILE}
