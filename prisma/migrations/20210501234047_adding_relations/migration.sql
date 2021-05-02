-- This is an empty migration.
ALTER TABLE public.accounts
  ADD CONSTRAINT accounts_fk FOREIGN KEY (user_id)
    REFERENCES public.users(id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
    NOT DEFERRABLE;

ALTER TABLE public.sessions
  ADD CONSTRAINT sessions_fk FOREIGN KEY (user_id)
    REFERENCES public.users(id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
    NOT DEFERRABLE;

ALTER TABLE public.user_tokens
  ADD CONSTRAINT user_tokens_fk FOREIGN KEY (user_id)
    REFERENCES public.users(id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
    NOT DEFERRABLE;

ALTER TABLE public.images
  DROP CONSTRAINT "images_projectId_fkey" RESTRICT;

ALTER TABLE public.images
  ADD CONSTRAINT "images_projectId_fkey" FOREIGN KEY ("projectId")
    REFERENCES public.projects(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
    NOT DEFERRABLE;
  
