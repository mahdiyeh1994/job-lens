'use client';
import React, { useState } from 'react';
import AddApplicationDialog from '../forms/addApplicationDialog';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useApplicationStore } from '@/app/store/application-store';

const Navbar = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const setLastSavedApplication = useApplicationStore(
    (state) => state.setLastSavedApplication
  );

  return (
    <header className="flex items-center justify-between p-4 border-b border-border-light bg-white">
      <div className="flex items-center gap-2">
        <h1 className=" text-primary">JobLens</h1>
        <Input className="w-64" placeholder="Search Companies or position" />
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
