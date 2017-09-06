-- workshop.attend
INSERT INTO attend_workshop
    (user_id, workshop_id, created_at)
VALUES (${userId}, ${workshopId}, ${now});
