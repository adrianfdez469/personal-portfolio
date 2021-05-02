-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_fk";

ALTER TABLE public.accounts
  ADD CONSTRAINT accounts_fk FOREIGN KEY (user_id)
    REFERENCES public.users(id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
    NOT DEFERRABLE;

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_fk";

ALTER TABLE public.sessions
  ADD CONSTRAINT sessions_fk FOREIGN KEY (user_id)
    REFERENCES public.users(id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
    NOT DEFERRABLE;

-- DropForeignKey
ALTER TABLE "user_tokens" DROP CONSTRAINT "user_tokens_fk";

ALTER TABLE public.user_tokens
  ADD CONSTRAINT user_tokens_fk FOREIGN KEY (user_id)
    REFERENCES public.users(id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
    NOT DEFERRABLE;
