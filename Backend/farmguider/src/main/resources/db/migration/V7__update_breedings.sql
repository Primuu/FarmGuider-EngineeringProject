ALTER TABLE public.breedings DROP COLUMN breeding_typ;
ALTER TABLE public.breedings ALTER COLUMN breeding_name SET NOT NULL;