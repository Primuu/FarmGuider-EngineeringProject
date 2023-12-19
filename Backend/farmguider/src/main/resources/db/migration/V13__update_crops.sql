ALTER TABLE public.crops ALTER COLUMN yield TYPE DECIMAL(6,3);

ALTER TABLE public.crops DROP CONSTRAINT fk_crops_crop_types;
ALTER TABLE public.crops ALTER COLUMN crop_type_id TYPE VARCHAR(20);
ALTER TABLE public.crops RENAME COLUMN crop_type_id TO crop_type;

ALTER TABLE public.crop_types ALTER COLUMN average_yield SET NOT NULL;

ALTER TABLE public.crop_types ALTER COLUMN crop_name TYPE VARCHAR(20);
ALTER TABLE public.crop_types RENAME COLUMN crop_name TO crop_type;

ALTER TABLE crop_types ALTER COLUMN optimal_planting_start_date TYPE VARCHAR(5);
ALTER TABLE crop_types ALTER COLUMN optimal_planting_end_date TYPE VARCHAR(5);
ALTER TABLE crop_types ALTER COLUMN optimal_harvest_start_date TYPE VARCHAR(5);
ALTER TABLE crop_types ALTER COLUMN optimal_harvest_end_date TYPE VARCHAR(5);