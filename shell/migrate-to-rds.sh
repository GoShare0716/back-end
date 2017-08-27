BASEDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DUMP_FILE="${BASEDIR}/db.dump"
echo "DUMP_FILE = ${DUMP_FILE}"

echo "dumping schema of local database ${PG_DB_NAME}..."
pg_dump -h ${PG_HOSTNAME} -U ${PG_USERNAME} --no-owner --schema-only -c ${PG_DB_NAME} > ${DUMP_FILE}
echo "migrate to ${RDS_DB_NAME}..."
psql -h ${RDS_HOSTNAME} -U ${RDS_USERNAME} ${RDS_DB_NAME} < ${DUMP_FILE}
rm ${DUMP_FILE}
