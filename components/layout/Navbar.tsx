'use client';
import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useApplicationStore } from '@/app/store/application-store';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const AddApplicationDialog = dynamic(
  () => import('@/components/forms/addApplicationDialog'),
  { ssr: false }
);

interface SearchFormValues {
  search: string;
}

const Navbar = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const setLastSavedApplication = useApplicationStore(
    (state) => state.setLastSavedApplication
  );
  const setSearchQuery = useApplicationStore((state) => state.setSearchQuery);
  const { control, register } = useForm<SearchFormValues>({
    defaultValues: { search: '' },
  });
  const search = useWatch({ control, name: 'search' });
  useEffect(() => {
    setSearchQuery(search);
  }, [search, setSearchQuery]);

  return (
    <header className="flex items-center justify-between p-4 border-b border-border-light bg-white">
      <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="Job Lens" width={50} height={50} />
        <h1 className=" text-primary">JobLens</h1>
        <Input
          className="w-2xs"
          placeholder="Search companies or positions"
          aria-label="Search applications"
          {...register('search')}
        />
      </div>
      <div>
        <Button onClick={() => setIsAddModalVisible(true)}>
          Add Application
        </Button>
        <AddApplicationDialog
          open={isAddModalVisible}
          onOpenChange={setIsAddModalVisible}
          onApplicationSaved={setLastSavedApplication}
        />
      </div>
    </header>
  );
};

export default Navbar;
