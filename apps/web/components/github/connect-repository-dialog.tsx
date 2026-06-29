"use client";

import { FolderGit2, Github } from "lucide-react";

import { trpc } from "~/trpc/client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Skeleton } from "~/components/ui/skeleton";

import { useState } from "react";

interface ConnectRepositoryDialogProps {
  projectId: string;
  trigger?: React.ReactNode;
}

export function ConnectRepositoryDialog({ projectId, trigger }: ConnectRepositoryDialogProps) {
  const [open, setOpen] = useState(false);
  const utils = trpc.useUtils();

  const repositories = trpc.github.listRepositories.useQuery(undefined, {
    enabled: open,
  });

  const connectRepository = trpc.project.connectRepository.useMutation({
    onSuccess: async () => {
      await Promise.all([
        utils.project.getProject.invalidate({
          projectId,
        }),
        utils.project.getProjects.invalidate(),
      ]);

      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button>
            <Github className="mr-2 h-4 w-4" />
            Connect Repository
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            Connect GitHub Repository
          </DialogTitle>

          <DialogDescription>
            Select a GitHub repository to connect with this project.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[450px] pr-4">
          <div className="space-y-3">
            {repositories.isLoading &&
              Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="rounded-lg border p-4 space-y-3">
                  <Skeleton className="h-5 w-48" />

                  <Skeleton className="h-4 w-full" />

                  <Skeleton className="h-9 w-24" />
                </div>
              ))}

            {!repositories.isLoading && repositories.data?.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <FolderGit2 className="mb-4 h-10 w-10 text-muted-foreground" />

                <h3 className="text-lg font-semibold">No repositories found</h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  We couldn't find any GitHub repositories for your account.
                </p>
              </div>
            )}

            {repositories.data?.map((repo) => (
              <div
                key={repo.id}
                className="flex items-start justify-between rounded-xl border p-4 transition-colors hover:bg-muted/40"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Github className="h-4 w-4" />

                    <h3 className="font-medium">{repo.fullName}</h3>

                    <Badge variant="outline">{repo.private ? "Private" : "Public"}</Badge>
                  </div>

                  {repo.description && (
                    <p className="text-sm text-muted-foreground">{repo.description}</p>
                  )}

                  <div className="text-xs text-muted-foreground">
                    Default branch: <span className="font-medium">{repo.defaultBranch}</span>
                  </div>
                </div>

                <Button
                  disabled={connectRepository.isPending}
                  onClick={() =>
                    connectRepository.mutate({
                      projectId,

                      repositoryId: repo.id,

                      owner: repo.owner,

                      name: repo.name,

                      fullName: repo.fullName,

                      defaultBranch: repo.defaultBranch,
                    })
                  }
                >
                  {connectRepository.isPending ? "Connecting..." : "Connect"}
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
