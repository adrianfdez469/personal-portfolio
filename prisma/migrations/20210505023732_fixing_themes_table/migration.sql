/*
  Warnings:

  - Added the required column `name` to the `themes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `json` to the `themes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "themes" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "json" JSON NOT NULL;



INSERT INTO public.themes
( name, json )
VALUES (
  'Dark',
  '{"palette": {"type": "dark"}}'
);

INSERT INTO public.themes
( name, json )
VALUES (
  'Orange Dark',
  '{"palette":{"primary":{"main":"#ff9100"},"secondary":{"main":"#1985ff"},"error":{"main":"#ff1744"},"type":"dark"}}'
);

INSERT INTO public.themes
( name, json )
VALUES (
  'Orange',
  '{"palette":{"primary":{"main":"#ff9100"},"secondary":{"main":"#1985ff"},"error":{"main":"#ff1744"}}}'
);
