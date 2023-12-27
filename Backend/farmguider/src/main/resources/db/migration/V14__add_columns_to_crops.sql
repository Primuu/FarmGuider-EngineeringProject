ALTER TABLE public.crops ADD COLUMN expected_harvest_start_date DATE NOT NULL;
ALTER TABLE public.crops ADD COLUMN expected_harvest_end_date DATE NOT NULL;
ALTER TABLE public.crops ADD COLUMN expected_yield DECIMAL(6,3) NOT NULL;
