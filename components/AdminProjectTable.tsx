"use client"

import { useState } from "react"
import { Project } from "@/types"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ProjectTable } from "@/components/ProjectTable"
import { EditProjectForm } from "./EditProjectForm"

interface AdminProjectTableProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

export function AdminProjectTable({ projects, setProjects }: AdminProjectTableProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleEdit = (project: Project) => {
    setSelectedProject(project)
    setIsDialogOpen(true)
  }

  const handleUpdate = (updatedProject: Project) => {
    setProjects((prevProjects) =>
      prevProjects.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    )
    setIsDialogOpen(false)
  }

  return (
    <div>
      <ProjectTable
        projects={projects}
        actions={(project) => (
          <Button onClick={() => handleEdit(project)}>Edit</Button>
        )}
      />
      {selectedProject && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Project</DialogTitle>
            </DialogHeader>
            <EditProjectForm
              project={selectedProject}
              onUpdate={handleUpdate}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
