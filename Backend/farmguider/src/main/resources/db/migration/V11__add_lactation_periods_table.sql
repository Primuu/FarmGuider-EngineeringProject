CREATE TABLE IF NOT EXISTS public.lactation_periods (
    id BIGINT NOT NULL DEFAULT nextval('id_seq') PRIMARY KEY,
    cow_id BIGINT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NULL,
    CONSTRAINT fk_lactation_periods_cows FOREIGN KEY (cow_id) REFERENCES cows (id)
);
