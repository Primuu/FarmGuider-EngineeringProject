CREATE SEQUENCE if NOT EXISTS public.id_seq AS bigint START WITH 1000;

CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE if NOT EXISTS public.addresses (
    id BIGINT NOT NULL DEFAULT nextval('id_seq') PRIMARY KEY,
    locality VARCHAR(45) NOT NULL,
    street VARCHAR(45) NOT NULL,
    zip_code VARCHAR(10) NOT NULL,
    property_number VARCHAR(6) NOT NULL
);

CREATE TABLE if NOT EXISTS public.users (
    id BIGINT NOT NULL DEFAULT nextval('id_seq') PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL,
    address_id BIGINT NOT NULL,
    CONSTRAINT fk_users_addresses FOREIGN KEY (address_id) REFERENCES addresses (id)
);

CREATE TABLE IF NOT EXISTS public.farms (
    id BIGINT NOT NULL DEFAULT nextval('id_seq') PRIMARY KEY,
    owner_id BIGINT NOT NULL,
    farm_name VARCHAR(45) NOT NULL,
    address_id BIGINT NOT NULL,
    CONSTRAINT fk_farms_users FOREIGN KEY (owner_id) REFERENCES users (id),
    CONSTRAINT fk_farms_addresses FOREIGN KEY (address_id) REFERENCES addresses (id)
);

CREATE TABLE IF NOT EXISTS public.fields (
    id BIGINT NOT NULL DEFAULT nextval('id_seq') PRIMARY KEY,
    farm_id BIGINT NOT NULL,
    field_name VARCHAR(45),
    field_area DECIMAL(5,2) NOT NULL,
    soil_class INT,
    coordinates GEOMETRY,
    CONSTRAINT fk_fields_farms FOREIGN KEY (farm_id) REFERENCES farms (id)
);

CREATE TABLE IF NOT EXISTS public.breedings (
    id BIGINT NOT NULL DEFAULT nextval('id_seq') PRIMARY KEY,
    farm_id BIGINT NOT NULL,
    breeding_typ VARCHAR(45) NOT NULL,
    breeding_name VARCHAR(45),
    CONSTRAINT fk_breedings_farms FOREIGN KEY (farm_id) REFERENCES farms (id)
);

CREATE TABLE IF NOT EXISTS public.crop_types (
    id BIGINT NOT NULL DEFAULT nextval('id_seq') PRIMARY KEY,
    crop_name VARCHAR(45) NOT NULL,
    optimal_planting_start_date DATE NOT NULL,
    optimal_planting_end_date DATE NOT NULL,
    optimal_harvest_start_date DATE NOT NULL,
    optimal_harvest_end_date DATE NOT NULL,
    average_yield DECIMAL(5,3)
);

CREATE TABLE IF NOT EXISTS public.crops (
    id BIGINT NOT NULL DEFAULT nextval('id_seq') PRIMARY KEY,
    field_id BIGINT NOT NULL,
    crop_type_id BIGINT NOT NULL,
    sowing_date DATE NOT NULL,
    harvest_date DATE,
    yield DECIMAL(5,3) NULL,
    CONSTRAINT fk_crops_fields FOREIGN KEY (field_id) REFERENCES fields (id),
    CONSTRAINT fk_crops_crop_types FOREIGN KEY (crop_type_id) REFERENCES crop_types (id)
);

CREATE TABLE IF NOT EXISTS public.treatments (
    id BIGINT NOT NULL DEFAULT nextval('id_seq') PRIMARY KEY,
    crop_id BIGINT NOT NULL,
    treatment_type VARCHAR(45) NOT NULL,
    treatment_date DATE NOT NULL,
    treatment_name VARCHAR(100) NOT NULL,
    quantity DECIMAL(10,2),
    details VARCHAR(255),
    CONSTRAINT fk_treatments_crops FOREIGN KEY (crop_id) REFERENCES crops (id)
);

CREATE TABLE IF NOT EXISTS public.cows (
    id BIGINT NOT NULL DEFAULT nextval('id_seq') PRIMARY KEY,
    breeding_id BIGINT NOT NULL,
    ear_tag_number VARCHAR(14) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(6) NOT NULL,
    CONSTRAINT fk_cows_breedings FOREIGN KEY (breeding_id) REFERENCES breedings (id)
);

CREATE TABLE IF NOT EXISTS public.milkings (
    id BIGINT NOT NULL DEFAULT nextval('id_seq') PRIMARY KEY,
    cow_id BIGINT NOT NULL,
    date_of_milking TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    milk_quantity DECIMAL(6,3) NOT NULL,
    milking_duration INT,
    CONSTRAINT fk_milkings_cows FOREIGN KEY (cow_id) REFERENCES cows (id)
);

CREATE TABLE IF NOT EXISTS public.weight_gains (
    id BIGINT NOT NULL DEFAULT nextval('id_seq') PRIMARY KEY,
    cow_id BIGINT NOT NULL,
    measurement_date DATE NOT NULL,
    weight DECIMAL(7,3) NOT NULL,
    CONSTRAINT fk_weight_gains_cows FOREIGN KEY (cow_id) REFERENCES cows (id)
);

CREATE TABLE IF NOT EXISTS public.daily_entries (
    id BIGINT NOT NULL DEFAULT nextval('id_seq') PRIMARY KEY,
    user_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    date DATE NOT NULL,
    CONSTRAINT fk_daily_entries_users FOREIGN KEY (user_id) REFERENCES users (id)
);
