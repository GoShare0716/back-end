DUMP_FILE=db.dump

echo "dump local database ${PG_DB_NAME}..."
pg_dump -h ${PG_HOSTNAME} -U ${PG_USERNAME} --no-owner -c ${$PG_DB_NAME} > ${DUMP_FILE}
echo "dump done. (${DUMP_FILE})"
