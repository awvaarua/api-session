-- Table: public."user"

-- DROP TABLE public."user";

CREATE TABLE public."user"
(
    id integer NOT NULL DEFAULT nextval('user_id_seq'::regclass),
    name character varying(150) COLLATE pg_catalog."default" NOT NULL,
    password character varying(300) COLLATE pg_catalog."default" NOT NULL,
    email character varying(150) COLLATE pg_catalog."default",
    CONSTRAINT user_pkey PRIMARY KEY (id),
    CONSTRAINT user_name_unique UNIQUE (name)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."user"
    OWNER to postgres;

-- Index: user_name_idx

-- DROP INDEX public.user_name_idx;

CREATE INDEX user_name_idx
    ON public."user" USING btree
    (name COLLATE pg_catalog."default")
    TABLESPACE pg_default;


-- Table: public.refresh_token

-- DROP TABLE public.refresh_token;

CREATE TABLE public.refresh_token
(
    token character varying(256) COLLATE pg_catalog."default" NOT NULL,
    "userId" integer NOT NULL,
    expiration timestamp with time zone NOT NULL DEFAULT (CURRENT_TIMESTAMP + '1 day'::interval),
    CONSTRAINT refres_token_pkey PRIMARY KEY (token),
    CONSTRAINT fk_token_user FOREIGN KEY ("userId")
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.refresh_token
    OWNER to postgres;
    
