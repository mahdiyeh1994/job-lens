'use client';
import React, { useState } from 'react';
import AddApplicationDialog from '../forms/addApplicationDialog';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const Navbar = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  return (
    <header className="flex items-center justify-between p-4 border-b border-border-light bg-white">
      <div className="flex items-center gap-2">
        <h1 className=" text-primary">JobLens</h1>
        <Input placeholder="Search Companies or position" />
      </div>
      <div>
        <Button onClick={() => setIsAddModalVisible(true)}>
          Add Application
        </Button>
        <AddApplicationDialog
          open={isAddModalVisible}
          onOpenChange={setIsAddModalVisible}
        />
      </div>
    </header>
  );
};

export default Navbar;
