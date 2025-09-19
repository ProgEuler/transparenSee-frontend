"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Project } from "@/types"

const formSchema = z.object({
  status: z.enum(["live", "closed", "postponed"]),
})

interface EditProjectFormProps {
  project: Project
  onUpdate: (updatedProject: Project) => void
  onCancel: () => void
}

export function EditProjectForm({ project, onUpdate, onCancel }: EditProjectFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: project.status,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedProject = { ...project, ...values }
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/${project.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      )

      if (!res.ok) {
        throw new Error(`Failed to update project: ${res.statusText}`)
      }

      onUpdate(updatedProject)
    } catch (error) {
      console.error("Failed to update project", error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="live">Live</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="postponed">Postponed</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  )
}
