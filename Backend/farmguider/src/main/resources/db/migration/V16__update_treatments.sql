ALTER TABLE public.treatments ALTER COLUMN quantity SET NOT NULL;
ALTER TABLE public.treatments ALTER COLUMN treatment_name TYPE VARCHAR(45);
ALTER TABLE public.treatments DROP COLUMN treatment_type;
