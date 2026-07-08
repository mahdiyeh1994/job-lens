'use server';
import { prisma } from '@/lib/prisma';
import type { ApplicationFormValues } from '@/lib/application';

export async function saveApplication(data: ApplicationFormValues) {
  const normalizedData = {
    ...data,
    jobUrl: data.jobUrl?.trim() || null,
    dateApplied: data.dateApplied || null,
    salary: data.salary || null,
    nextStep: data.nextStep || null,
  };

  return prisma.application.create({
    data: normalizedData,
  });
}
