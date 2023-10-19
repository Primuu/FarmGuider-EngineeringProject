ALTER TABLE public.addresses
    ALTER COLUMN locality DROP NOT NULL,
    ALTER COLUMN street DROP NOT NULL,
    ALTER COLUMN zip_code DROP NOT NULL,
    ALTER COLUMN property_number DROP NOT NULL;