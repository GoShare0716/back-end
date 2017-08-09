UPDATE workshop
SET state = 'unreached'
WHERE state = 'judge_ac' AND deadline < $(now);
