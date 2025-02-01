"use client";

import { redirect } from 'next/navigation'

const ProjectPage = async ({ params }) => {
  const { projectId } = await params;

  redirect(`/${projectId}/dashboard`);
}

export default ProjectPage;