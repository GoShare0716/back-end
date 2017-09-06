-- workshop.update-all
UPDATE workshop
SET
    title = ${title},
    category = ${category},
    requirement = ${requirement},
    target_audience = ${targetAudience},
    goal = ${goal},
    image_url = ${imageUrl},
    start_datetime = ${startDatetime},
    end_datetime = ${endDatetime},
    location = ${location},
    pre_price = ${prePrice},
    price = ${price},
    min_number = ${minNumber},
    max_number = ${maxNumber},
    deadline = ${deadline},
    closing = ${closing},
    description = ${description},
    content = ${content},
    attended_msg = ${attendedMsg}
WHERE
    id = ${workshopId}
RETURNING
    id,
    title,
    category,
    requirement,
    target_audience,
    goal,
    image_url,
    start_datetime,
    end_datetime,
    location,
    pre_price,
    price,
    min_number,
    max_number,
    deadline,
    closing,
    description,
    content,
    attended_msg
;
