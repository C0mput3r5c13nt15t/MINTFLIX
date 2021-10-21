import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"
import "react-mde/lib/styles/css/react-mde-all.css"
import React, { useState } from "react"
import { useQuery } from "blitz"
import getProjects from "../../projects/queries/getProjects"
import { useCurrentUser } from "../../core/hooks/useCurrentUser"
import { Field } from "react-final-form"

export function ArticleForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const [value, setValue] = useState("**Hello world!!!**")
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write")
  const user = useCurrentUser()!

  const [{ projects }] = useQuery(getProjects, { where: { userId: user.id } })

  return (
    <Form<S> {...props}>
      <LabeledTextField name="title" label="Titel" placeholder="Titel" />
      <LabeledTextField name="body" label="Text" placeholder="Text" />

      <Field name="projectId" component="select">
        <option />
        {projects.map((project: any) => (
          <option value={parseInt(project.id)} key={parseInt(project.id)}>
            {project.id}
          </option>
        ))}
      </Field>
    </Form>
  )
}
