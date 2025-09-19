"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useState } from "react"

const formSchema = z.object({
  file: z.any(),
  from: z.date({ required_error: "From date is required" }),
  to: z.date({ required_error: "To date is required" }),
  status: z.enum(["live", "closed", "postponed"]),
  name: z.string().min(1, "Project name is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  division: z.string().min(1, "Division is required"),
  address: z.string().min(1, "Address is required"),
  ministry: z.string().min(1, "Ministry is required"),
  org: z.string().min(1, "Organization is required"),
  tag: z.array(z.string()).min(1, "At least one tag is required"),
  budget: z.coerce.number().positive("Budget must be a positive number"),
})

export function CreateProjectForm() {
  const [tagInput, setTagInput] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "live",
      tag: [],
    },
  })

async function onSubmit(values: z.infer<typeof formSchema>) {
  try {
    const formData = new FormData()

    // file upload
    if (values.file) {
      formData.append("file", values.file)
    }

    // dates must be ISO strings
    formData.append("from", values.from.toISOString())
    formData.append("to", values.to.toISOString())

    // simple string/number fields
    formData.append("status", values.status)
    formData.append("name", values.name)
    formData.append("category", values.category)
    formData.append("description", values.description)
    formData.append("division", values.division)
    formData.append("address", values.address)
    formData.append("ministry", values.ministry)
    formData.append("org", values.org)
    formData.append("budget", values.budget.toString())

    // array (tags)
    values.tag.forEach((t) => {
      formData.append("tag", t)
    })

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/create`, {
      method: "POST",
      body: formData,
    })

    if (!res.ok) {
      throw new Error(`Failed to create project: ${res.statusText}`)
    }

    const data = await res.json()
    console.log("✅ Project created successfully:", data)
    alert("Project created successfully!")
  } catch (err) {
    console.error("❌ Error creating project:", err)
    alert("Failed to create project")
  }
}


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Highway Expansion" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Expansion of the national highway." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>From Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>To Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Status + Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Education, Infrastructure" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Division + Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="division"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Division</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Dhaka" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 123 Main Road, Dhaka" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Ministry + Org */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="ministry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ministry</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Ministry of Transportation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="org"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Roads and Highways Department" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* File upload */}
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormDescription>Upload PDF or image</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tags */}
        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <div className="flex flex-wrap gap-2 mb-2">
                {field.value.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-200 rounded-full text-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      if (tagInput.trim()) {
                        field.onChange([...field.value, tagInput.trim()])
                        setTagInput("")
                      }
                    }
                  }}
                  placeholder="Type tag and press Add"
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (tagInput.trim()) {
                      field.onChange([...field.value, tagInput.trim()])
                      setTagInput("")
                    }
                  }}
                >
                  Add
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Budget */}
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget (in Crores)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create Project</Button>
      </form>
    </Form>
  )
}
