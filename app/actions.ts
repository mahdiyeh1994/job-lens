'use server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import type { ApplicationFormValues } from '@/lib/application';

export async function saveApplication(
  data: ApplicationFormValues,
  id?: string
) {
  const normalizedData = {
    ...data,
    jobUrl: data.jobUrl?.trim() || null,
    dateApplied: data.dateApplied || null,
    salary: data.salary || null,
    nextStep: data.nextStep || null,
  };

  if (id) {
    const updatedApplication = await prisma.application.update({
      where: { id },
      data: normalizedData,
    });
    revalidatePath('/');
    return updatedApplication;
  }

  const createdApplication = await prisma.application.create({
    data: normalizedData,
  });
  revalidatePath('/');
  return createdApplication;
}
