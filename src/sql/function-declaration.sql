CREATE OR REPLACE FUNCTION jsonb_ary2text_ary(_js jsonb)
   RETURNS text[] AS
$func$
SELECT ARRAY(SELECT jsonb_array_elements_text(_js))
$func$
LANGUAGE sql IMMUTABLE;
