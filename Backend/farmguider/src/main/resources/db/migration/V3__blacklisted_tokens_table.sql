CREATE TABLE IF NOT EXISTS public.blacklisted_tokens
(
    id BIGINT NOT NULL DEFAULT nextval('id_seq') PRIMARY KEY,
    token TEXT NOT NULL,
    revoke_date TIMESTAMP WITHOUT TIME ZONE NOT NULL
);